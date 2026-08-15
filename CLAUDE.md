# CLAUDE.md — Animation Simulation

Project instructions for any Claude Code session (interactive or automated) working in this repo.

## What this project is

An interactive React showcase — a "UI Animation Catalogue" — that lets a client browse 80–100
CSS-only animation/transition options, preview them live on real UI components (cards, forms,
tables, modals, pages, loaders), tweak speed/duration/delay, and mark favourites to hand off to
the dev team. Full requirement text: [docs/requirement.md](docs/requirement.md).

Project type: internal/client-facing demo & prototype (not a production app) — assumed, since the
brief didn't pin this down. Revisit if that's wrong.

## Ground rules

- Stack: React + pure CSS animations/transitions only. **No JS animation library** (no
  framer-motion, react-spring, gsap, anime.js, etc).
- Responsive, light/modern/premium visual style.
- Model: prefer the latest Sonnet-class model for normal coding. Don't reach for Opus unless a
  task is genuinely architecture-heavy or debugging is truly blocked.
- Do not create automated tests unless explicitly asked.
- Do not deploy to any cloud target unless explicitly asked.
- Keep implementation practical and maintainable — no over-engineering, no unrelated
  infrastructure, no refactors outside the current task's scope.
- Keep final step/response summaries short (this repo's automation caps them at 12 lines — hold
  interactive sessions to the same bar).

## How work is organized

Development is split into sequential phases, each with its own prompt file in [prompts/](prompts/)
(`01_...md` .. `06_...md`). See [docs/automation-handoff.md](docs/automation-handoff.md) for the
phase plan, current status, and a running summary of what's already built — **read that file
before starting any phase** instead of re-scanning the whole project.

Each prompt file is meant to run in its own fresh context (no chat history carried over). Context
that must survive between phases lives in this file and in the handoff doc, not in conversation
history.

When picking up a phase:
1. Read this file and `docs/automation-handoff.md`.
2. Read only the files/folders that phase's prompt file names — don't scan unrelated folders.
3. Do the work, then update `docs/automation-handoff.md` with what changed and what's next.

## Automation harness

An unattended runner can execute the prompt files one at a time, each in a fresh non-persistent
`claude` CLI process, with logging/status/reports/notifications. See
[README_AUTOMATION.md](README_AUTOMATION.md) for exact commands. Building or editing the
automation harness itself does **not** imply permission to launch it — the dev prompts only run
when explicitly started.
