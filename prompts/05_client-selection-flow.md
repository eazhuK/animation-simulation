# Phase 5 — Client Selection Flow

Model: latest Sonnet-class model.

## Scope

Implement the client-facing selection/favouriting flow described in the requirement doc's
"Client Selection Flow" and "Expected Outcome" sections.

Deliverables:
- Persist favourite/selected animations across reloads (localStorage is sufficient — no backend).
- Every place an animation is shown (Gallery, Cards, Forms, Tables, Modals, Page/Loading views)
  reflects the same shared selection state — favouriting in one view shows up everywhere.
- A "Selected Animations" summary view: lists every favourited animation together with which
  component(s) the client viewed/selected it for (e.g. "Dashboard cards → Staggered slide-up"),
  matching the example mappings in the requirement doc's Expected Outcome section.
- A way to produce a shareable summary from that view — e.g. a formatted copy-to-clipboard
  block or a printable view is enough; no email/export-service integration.
- Replay, duration/delay/speed controls from Phase 2 must keep working from within this flow.

## Files/folders to inspect first

- `docs/automation-handoff.md` (Phase 1–4 notes: data model, registry, component locations)
- `src/` — the animation registry, `AnimationPreview`, and each demo view's favourite-toggle
  code from earlier phases, not the whole tree

## Out of scope

- Do not add a real backend, auth, or cloud persistence — localStorage only.
- Do not redesign earlier phases' demo sections beyond adding the shared selection state.
- Do not create automated tests.
- Do not scan unrelated folders unless needed.

## Completion

- Update `docs/automation-handoff.md`: mark Phase 5 done, note the persistence mechanism and
  where the Selected Animations view lives.
- Keep final response under 12 lines.
