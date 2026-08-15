# Automation Harness — Animation Simulation

Runs the phased development plan in [prompts/](prompts/) unattended: each phase executes in its
own fresh, non-persistent `claude` CLI process, with status tracking, logging, live-updating
reports, and Windows notifications.

Building/editing this harness does **not** launch it — the dev prompts only run when you
explicitly start it, per the commands below.

## Prerequisites

- Python 3.9+ on PATH.
- The `claude` CLI on PATH, logged in and able to run non-interactively.
- Windows PowerShell (for the watchers/notifications). Optional: install the
  [BurntToast](https://github.com/Windos/BurntToast) PowerShell module
  (`Install-Module -Name BurntToast -Scope CurrentUser`) for nicer toast notifications —
  falls back to a balloon tip / beep if it's not installed.
- Optional, for PDF reports: Microsoft Edge or Google Chrome installed at a standard path (see
  `report_config.json` → `pdf_browser_candidates`). If neither is found, PDF generation is
  skipped and the `.md`/`.html` reports are still produced.

## Exact commands

Check status (never executes anything, never modifies `status.json` if it already exists):

```powershell
python .\run_claude_prompts.py --status
```

Start/continue the automation (skips completed unchanged steps, runs everything else in order,
stops on first failure):

```powershell
python .\run_claude_prompts.py
```

Resume after a stop/failure (retries failed/changed steps, continues forward):

```powershell
python .\run_claude_prompts.py --resume
```

Continue past failures instead of stopping:

```powershell
python .\run_claude_prompts.py --continue-on-error
```

Force execution to start at a specific step (e.g. re-run phase 3 onward):

```powershell
python .\run_claude_prompts.py --from-step 03
```

Watch live progress (status table, recent `progress.log` lines, recently changed files),
refreshing every N seconds:

```powershell
powershell -ExecutionPolicy Bypass -File .\watch_automation.ps1
powershell -ExecutionPolicy Bypass -File .\watch_automation.ps1 -RefreshSeconds 10
```

Regenerate the report by hand (also happens automatically after every step):

```powershell
python .\generate_automation_report.py
```

Watch the report, regenerating it on an interval and optionally opening it once in your browser:

```powershell
powershell -ExecutionPolicy Bypass -File .\watch_report.ps1
powershell -ExecutionPolicy Bypass -File .\watch_report.ps1 -OpenInBrowser
```

## Where outputs are stored

- `output/status.json` — machine-readable state for every step (id, prompt file, state,
  timestamps, duration, return code, model, log paths).
- `output/progress.log` — human-readable running log.
- `output/logs/<step_id>/input.md` — exact prompt text used for that step.
- `output/logs/<step_id>/stdout.log`, `stderr.log` — captured CLI output.
- `output/automation_report.md`, `output/automation_report.html`,
  `output/automation_report.pdf` (if a browser was found) — refreshed after every step.

## How fresh context is guaranteed

Each step spawns a brand-new `claude --print --model <model> --permission-mode auto
--no-session-persistence` process with the prompt piped via stdin — no `--continue`/`--resume`
flags are ever used, so no chat history carries over between steps. Context that must survive
between phases lives in [CLAUDE.md](CLAUDE.md) and [docs/automation-handoff.md](docs/automation-handoff.md),
which each prompt file is told to read first.

## How token/time is controlled

The plan is grouped into 6 coherent phases (not 20+ tiny ones) — see
`docs/automation-handoff.md`. Every prompt file explicitly names which files/folders to read,
says what's out of scope, and caps the final response to 12 lines, so each fresh session does
bounded, targeted work instead of re-scanning the whole project.

## Changing author / model / config

Edit [automation_config.json](automation_config.json):
- `author` — shown in reports.
- `model` — passed as `--model` to the `claude` CLI for every step (default: `sonnet`).
- `permission_mode` — passed as `--permission-mode`.
- `stop_on_first_failure` — default behavior when neither `--continue-on-error` nor `--resume`
  overrides it.
- `notifications.enabled` — turn Windows notifications off entirely.

Report-specific settings (refresh interval, PDF browser paths, output file names) live in
[report_config.json](report_config.json).
