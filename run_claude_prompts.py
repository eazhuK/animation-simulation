#!/usr/bin/env python3
"""Unattended runner: executes prompts/NN_*.md one at a time, each in a fresh
non-persistent `claude` CLI process, tracking state in output/status.json.

See README_AUTOMATION.md for usage.
"""
import argparse
import hashlib
import json
import re
import subprocess
import sys
import time
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parent
CONFIG_PATH = ROOT / "automation_config.json"

STATES = ("pending", "running", "completed", "failed", "interrupted", "skipped")


def load_config():
    with open(CONFIG_PATH, "r", encoding="utf-8") as f:
        cfg = json.load(f)
    cfg["_root"] = ROOT
    cfg["_prompts_dir"] = ROOT / cfg["prompts_dir"]
    cfg["_output_dir"] = ROOT / cfg["output_dir"]
    cfg["_logs_dir"] = ROOT / cfg["logs_dir"]
    cfg["_status_file"] = ROOT / cfg["status_file"]
    cfg["_progress_log"] = ROOT / cfg["progress_log"]
    return cfg


def now_iso():
    return datetime.now(timezone.utc).astimezone().isoformat(timespec="seconds")


def sha256_text(text):
    return hashlib.sha256(text.encode("utf-8")).hexdigest()


def human_duration(seconds):
    if seconds is None:
        return None
    seconds = int(round(seconds))
    m, s = divmod(seconds, 60)
    h, m = divmod(m, 60)
    parts = []
    if h:
        parts.append(f"{h}h")
    if m:
        parts.append(f"{m}m")
    parts.append(f"{s}s")
    return " ".join(parts)


def discover_prompts(cfg):
    files = sorted(cfg["_prompts_dir"].glob("*.md"))
    steps = []
    for f in files:
        m = re.match(r"^(\d+)_", f.name)
        step_id = m.group(1) if m else f.stem
        steps.append((step_id, f))
    return steps


def atomic_write_json(path, data):
    tmp = path.with_suffix(path.suffix + ".tmp")
    with open(tmp, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)
    tmp.replace(path)


def load_or_init_status(cfg):
    prompts = discover_prompts(cfg)
    cfg["_output_dir"].mkdir(parents=True, exist_ok=True)
    cfg["_logs_dir"].mkdir(parents=True, exist_ok=True)

    existing = {}
    if cfg["_status_file"].exists():
        with open(cfg["_status_file"], "r", encoding="utf-8") as f:
            data = json.load(f)
        for s in data.get("steps", []):
            existing[s["step_id"]] = s

    steps = []
    for step_id, path in prompts:
        prompt_text = path.read_text(encoding="utf-8")
        prompt_hash = sha256_text(prompt_text)
        prev = existing.get(step_id)
        log_dir = f"{cfg['logs_dir']}/{step_id}"
        if prev is None:
            steps.append({
                "step_id": step_id,
                "prompt_file": str(path.relative_to(ROOT)).replace("\\", "/"),
                "prompt_hash": prompt_hash,
                "state": "pending",
                "started_at": None,
                "completed_at": None,
                "duration_seconds": None,
                "duration_human": None,
                "return_code": None,
                "model": cfg["model"],
                "input_log": f"{log_dir}/input.md",
                "stdout_log": f"{log_dir}/stdout.log",
                "stderr_log": f"{log_dir}/stderr.log",
            })
        else:
            if prev.get("prompt_hash") != prompt_hash:
                prev["prompt_hash"] = prompt_hash
                prev["state"] = "pending"
                prev["started_at"] = None
                prev["completed_at"] = None
                prev["duration_seconds"] = None
                prev["duration_human"] = None
                prev["return_code"] = None
            if prev.get("state") == "running":
                # a previous run crashed mid-step
                prev["state"] = "interrupted"
            steps.append(prev)

    data = {
        "project_name": cfg["project_name"],
        "project_folder": str(ROOT),
        "generated_at": now_iso(),
        "steps": steps,
    }
    atomic_write_json(cfg["_status_file"], data)
    return data


def save_status(cfg, data):
    data["generated_at"] = now_iso()
    atomic_write_json(cfg["_status_file"], data)


def append_progress(cfg, message):
    line = f"[{now_iso()}] {message}\n"
    with open(cfg["_progress_log"], "a", encoding="utf-8") as f:
        f.write(line)
    print(message)


def notify_windows(cfg, title, message, is_error=False):
    if not cfg.get("notifications", {}).get("enabled", True):
        return
    if sys.platform != "win32":
        return
    safe_title = title.replace('"', "'")
    safe_msg = message.replace('"', "'")
    icon = "Error" if is_error else "Information"
    tooltip_icon = "Error" if is_error else "Info"
    ps = f"""
$ErrorActionPreference = "SilentlyContinue"
$useToast = $false
if ((Get-Module -ListAvailable -Name BurntToast) -and {"$true" if cfg.get("notifications", {}).get("use_burnttoast_if_available", True) else "$false"}) {{
    try {{
        Import-Module BurntToast
        New-BurntToastNotification -Text "{safe_title}", "{safe_msg}"
        $useToast = $true
    }} catch {{ $useToast = $false }}
}}
if (-not $useToast) {{
    try {{
        Add-Type -AssemblyName System.Windows.Forms
        Add-Type -AssemblyName System.Drawing
        $notify = New-Object System.Windows.Forms.NotifyIcon
        $notify.Icon = [System.Drawing.SystemIcons]::{icon}
        $notify.Visible = $true
        $notify.ShowBalloonTip(5000, "{safe_title}", "{safe_msg}", [System.Windows.Forms.ToolTipIcon]::{tooltip_icon})
        Start-Sleep -Seconds 1
        $notify.Dispose()
    }} catch {{
        [console]::beep(750,300)
    }}
}}
"""
    try:
        subprocess.run(
            ["powershell", "-NoProfile", "-NonInteractive", "-Command", ps],
            capture_output=True, timeout=15,
        )
    except Exception:
        pass


def regenerate_report(cfg):
    if not cfg.get("report", {}).get("regenerate_after_each_step", True):
        return
    try:
        subprocess.run(
            [sys.executable, str(ROOT / "generate_automation_report.py")],
            cwd=ROOT, capture_output=True, timeout=120,
        )
    except Exception as e:
        append_progress(cfg, f"WARNING: report generation failed: {e}")


def run_step(cfg, step):
    step_id = step["step_id"]
    prompt_path = ROOT / step["prompt_file"]
    prompt_text = prompt_path.read_text(encoding="utf-8")

    log_dir = ROOT / cfg["logs_dir"] / step_id
    log_dir.mkdir(parents=True, exist_ok=True)
    (log_dir / "input.md").write_text(prompt_text, encoding="utf-8")

    step["state"] = "running"
    step["started_at"] = now_iso()
    step["completed_at"] = None
    step["return_code"] = None
    step["model"] = cfg["model"]
    save_status(cfg, cfg["_status_data"])
    append_progress(cfg, f"Step {step_id} ({prompt_path.name}): starting")

    cmd = [
        cfg["claude_command"], "--print",
        "--model", cfg["model"],
        "--permission-mode", cfg["permission_mode"],
        *cfg.get("extra_claude_args", []),
    ]

    t0 = time.monotonic()
    try:
        proc = subprocess.run(
            cmd, cwd=ROOT, input=prompt_text,
            capture_output=True, text=True, encoding="utf-8",
        )
        rc = proc.returncode
        stdout, stderr = proc.stdout, proc.stderr
    except FileNotFoundError as e:
        rc = 127
        stdout, stderr = "", f"claude CLI not found: {e}"
    except KeyboardInterrupt:
        elapsed = time.monotonic() - t0
        step["state"] = "interrupted"
        step["completed_at"] = now_iso()
        step["duration_seconds"] = round(elapsed, 3)
        step["duration_human"] = human_duration(elapsed)
        save_status(cfg, cfg["_status_data"])
        append_progress(cfg, f"Step {step_id}: interrupted by user")
        raise

    elapsed = time.monotonic() - t0
    (log_dir / "stdout.log").write_text(stdout or "", encoding="utf-8")
    (log_dir / "stderr.log").write_text(stderr or "", encoding="utf-8")

    step["completed_at"] = now_iso()
    step["duration_seconds"] = round(elapsed, 3)
    step["duration_human"] = human_duration(elapsed)
    step["return_code"] = rc
    step["state"] = "completed" if rc == 0 else "failed"
    save_status(cfg, cfg["_status_data"])

    ok = rc == 0
    append_progress(
        cfg,
        f"Step {step_id} ({prompt_path.name}): "
        f"{'completed' if ok else 'FAILED'} in {step['duration_human']} (rc={rc})",
    )
    notify_windows(
        cfg,
        f"Animation simulation — step {step_id}",
        f"{'Completed' if ok else 'Failed'}: {prompt_path.name} ({step['duration_human']})",
        is_error=not ok,
    )
    regenerate_report(cfg)
    return ok


def print_status(data):
    print(f"Project: {data['project_name']}  ({data['project_folder']})")
    print(f"Status as of: {data['generated_at']}\n")
    counts = {}
    for s in data["steps"]:
        counts[s["state"]] = counts.get(s["state"], 0) + 1
        dur = s["duration_human"] or "-"
        rc = s["return_code"] if s["return_code"] is not None else "-"
        print(f"  [{s['state']:<11}] {s['step_id']}  {Path(s['prompt_file']).name:<40} "
              f"dur={dur:<10} rc={rc}")
    print()
    print("Summary: " + ", ".join(f"{k}={v}" for k, v in counts.items()))


def main():
    ap = argparse.ArgumentParser(description="Run prompts/NN_*.md sequentially via the claude CLI.")
    ap.add_argument("--status", action="store_true", help="Print status and exit without running anything.")
    ap.add_argument("--resume", action="store_true", help="Resume: skip completed/unchanged steps, rerun failed/changed/pending.")
    ap.add_argument("--from-step", dest="from_step", default=None, help="Force the run to start at this step id (e.g. 03), regardless of prior completion state.")
    ap.add_argument("--continue-on-error", action="store_true", help="Do not stop the run when a step fails.")
    args = ap.parse_args()

    cfg = load_config()
    data = load_or_init_status(cfg)
    cfg["_status_data"] = data

    if args.status:
        print_status(data)
        return 0

    steps = data["steps"]
    if not steps:
        print("No prompt files found in prompts/. Nothing to do.")
        return 0

    start_index = 0
    if args.from_step:
        ids = [s["step_id"] for s in steps]
        if args.from_step not in ids:
            print(f"--from-step {args.from_step} does not match any step id: {ids}")
            return 2
        start_index = ids.index(args.from_step)

    stop_on_failure = cfg.get("stop_on_first_failure", True) and not args.continue_on_error

    append_progress(cfg, f"Run started (from_step={args.from_step or steps[start_index]['step_id']}, "
                          f"continue_on_error={not stop_on_failure})")

    exit_code = 0
    for step in steps[start_index:]:
        if step["state"] == "completed":
            append_progress(cfg, f"Step {step['step_id']}: skipping (already completed, prompt unchanged)")
            continue
        try:
            ok = run_step(cfg, step)
        except KeyboardInterrupt:
            append_progress(cfg, "Run interrupted by user (Ctrl+C).")
            return 130
        if not ok:
            exit_code = 1
            if stop_on_failure:
                append_progress(cfg, f"Stopping after failure at step {step['step_id']} "
                                      f"(use --continue-on-error to override, --resume to retry).")
                break

    append_progress(cfg, f"Run finished with exit code {exit_code}")
    return exit_code


if __name__ == "__main__":
    sys.exit(main())
