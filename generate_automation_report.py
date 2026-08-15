#!/usr/bin/env python3
"""Generates output/automation_report.{md,html,pdf} from output/status.json.

Safe to run any time — read-only with respect to status.json. Invoked automatically by
run_claude_prompts.py after each step, or manually / via watch_report.ps1.
"""
import json
import subprocess
import sys
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parent
REPORT_CONFIG_PATH = ROOT / "report_config.json"


def load_report_config():
    with open(REPORT_CONFIG_PATH, "r", encoding="utf-8") as f:
        return json.load(f)


def load_status(cfg):
    status_file = ROOT / cfg["status_file"]
    if not status_file.exists():
        return None
    with open(status_file, "r", encoding="utf-8") as f:
        return json.load(f)


def now_iso():
    return datetime.now(timezone.utc).astimezone().isoformat(timespec="seconds")


def build_markdown(cfg, data):
    steps = data["steps"] if data else []
    counts = {}
    for s in steps:
        counts[s["state"]] = counts.get(s["state"], 0) + 1

    lines = []
    lines.append(f"# Automation Report — {cfg['project_name']}")
    lines.append("")
    lines.append(f"- Author: {cfg.get('author', '-')}")
    lines.append(f"- Project folder: `{ROOT}`")
    lines.append(f"- Generated: {now_iso()}")
    lines.append(f"- Total steps: {len(steps)}")
    lines.append(
        "- Completed: {completed} · Running: {running} · Failed: {failed} · "
        "Pending: {pending} · Interrupted: {interrupted} · Skipped: {skipped}".format(
            completed=counts.get("completed", 0),
            running=counts.get("running", 0),
            failed=counts.get("failed", 0),
            pending=counts.get("pending", 0),
            interrupted=counts.get("interrupted", 0),
            skipped=counts.get("skipped", 0),
        )
    )
    lines.append("")
    lines.append("| Step | Prompt | State | Started | Completed | Duration | RC | Logs |")
    lines.append("|---|---|---|---|---|---|---|---|")
    for s in steps:
        prompt_name = Path(s["prompt_file"]).name
        logs = f"[in]({s['input_log']}) [out]({s['stdout_log']}) [err]({s['stderr_log']})"
        lines.append(
            f"| {s['step_id']} | {prompt_name} | {s['state']} | "
            f"{s['started_at'] or '-'} | {s['completed_at'] or '-'} | "
            f"{s['duration_human'] or '-'} | {s['return_code'] if s['return_code'] is not None else '-'} | "
            f"{logs} |"
        )
    lines.append("")

    completed = [s for s in steps if s["state"] == "completed"]
    failed = [s for s in steps if s["state"] in ("failed", "interrupted")]
    pending = [s for s in steps if s["state"] == "pending"]

    lines.append("## Summary of completed work")
    if completed:
        for s in completed:
            lines.append(f"- {s['step_id']} — {Path(s['prompt_file']).name} ({s['duration_human']})")
    else:
        lines.append("- (none yet)")
    lines.append("")

    lines.append("## Known failures / pending work")
    if failed:
        lines.append("Failures:")
        for s in failed:
            lines.append(f"- {s['step_id']} — {Path(s['prompt_file']).name}: rc={s['return_code']}, see `{s['stderr_log']}`")
    if pending:
        lines.append("Pending:")
        for s in pending:
            lines.append(f"- {s['step_id']} — {Path(s['prompt_file']).name}")
    if not failed and not pending:
        lines.append("- None — all steps completed.")
    lines.append("")

    return "\n".join(lines)


def build_html(cfg, data, markdown_text):
    steps = data["steps"] if data else []
    counts = {}
    for s in steps:
        counts[s["state"]] = counts.get(s["state"], 0) + 1

    state_colors = {
        "completed": "#1f8a4c", "running": "#b8860b", "failed": "#c0392b",
        "pending": "#666666", "interrupted": "#c0392b", "skipped": "#999999",
    }

    rows = []
    for s in steps:
        color = state_colors.get(s["state"], "#333")
        prompt_name = Path(s["prompt_file"]).name
        rc = s["return_code"] if s["return_code"] is not None else "-"
        rows.append(f"""<tr>
<td>{s['step_id']}</td><td>{prompt_name}</td>
<td style="color:{color};font-weight:600">{s['state']}</td>
<td>{s['started_at'] or '-'}</td><td>{s['completed_at'] or '-'}</td>
<td>{s['duration_human'] or '-'}</td><td>{rc}</td>
<td><a href="{s['input_log']}">in</a> · <a href="{s['stdout_log']}">out</a> · <a href="{s['stderr_log']}">err</a></td>
</tr>""")

    html = f"""<!doctype html>
<html><head><meta charset="utf-8"><title>Automation Report — {cfg['project_name']}</title>
<style>
body {{ font-family: -apple-system, Segoe UI, Arial, sans-serif; margin: 2rem; color: #1a1a1a; }}
h1 {{ margin-bottom: 0.25rem; }}
table {{ border-collapse: collapse; width: 100%; margin-top: 1rem; }}
th, td {{ border: 1px solid #ddd; padding: 6px 10px; text-align: left; font-size: 14px; }}
th {{ background: #f4f4f4; }}
.meta {{ color: #555; font-size: 14px; }}
.summary {{ margin-top: 0.5rem; font-size: 14px; }}
</style></head>
<body>
<h1>Automation Report — {cfg['project_name']}</h1>
<div class="meta">
Author: {cfg.get('author', '-')}<br>
Project folder: {ROOT}<br>
Generated: {now_iso()}
</div>
<div class="summary">
Total steps: {len(steps)} &middot;
Completed: {counts.get('completed', 0)} &middot;
Running: {counts.get('running', 0)} &middot;
Failed: {counts.get('failed', 0)} &middot;
Pending: {counts.get('pending', 0)} &middot;
Interrupted: {counts.get('interrupted', 0)} &middot;
Skipped: {counts.get('skipped', 0)}
</div>
<table>
<tr><th>Step</th><th>Prompt</th><th>State</th><th>Started</th><th>Completed</th><th>Duration</th><th>RC</th><th>Logs</th></tr>
{''.join(rows)}
</table>
</body></html>
"""
    return html


def try_generate_pdf(cfg, html_path, pdf_path):
    if not cfg.get("generate_pdf", True):
        return False
    for candidate in cfg.get("pdf_browser_candidates", []):
        browser = Path(candidate)
        if browser.exists():
            try:
                subprocess.run(
                    [
                        str(browser), "--headless", "--disable-gpu",
                        f"--print-to-pdf={pdf_path}",
                        html_path.resolve().as_uri(),
                    ],
                    capture_output=True, timeout=60,
                )
                return pdf_path.exists()
            except Exception:
                continue
    return False


def main():
    cfg = load_report_config()
    data = load_status(cfg)

    md_text = build_markdown(cfg, data)
    md_path = ROOT / cfg["output_md"]
    md_path.parent.mkdir(parents=True, exist_ok=True)
    md_path.write_text(md_text, encoding="utf-8")

    html_text = build_html(cfg, data, md_text)
    html_path = ROOT / cfg["output_html"]
    html_path.write_text(html_text, encoding="utf-8")

    pdf_path = ROOT / cfg["output_pdf"]
    got_pdf = try_generate_pdf(cfg, html_path, pdf_path)
    if not got_pdf and pdf_path.exists():
        pdf_path.unlink(missing_ok=True)

    note = "pdf generated" if got_pdf else "pdf skipped (no Edge/Chrome found or disabled)"
    print(f"Report written: {md_path.name}, {html_path.name} ({note})")
    return 0


if __name__ == "__main__":
    sys.exit(main())
