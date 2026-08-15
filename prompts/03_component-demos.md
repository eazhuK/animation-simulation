# Phase 3 — Component Demo Sections

Model: latest Sonnet-class model.

## Scope

Wire the animation registry from Phase 2 into real, client-facing demo sections for Cards,
Forms, and Tables/Lists, plus Modal/Popup.

Deliverables:
- **Cards**: layouts with 2, 3, and 4 cards; controls to trigger entry from left/right/top/bottom;
  staggered entry; scale-and-settle; bounce-in; flip-in; a "four directions converge" demo;
  hover lift/glow/tilt/shake on card hover. Each demo picks animations from the Phase 2 registry
  (don't hand-roll new keyframes here unless a gap is genuinely missing from the registry — if
  so, add it to the registry and note it in the handoff doc).
- **Forms**: a sample form (a few fields + submit) demonstrating: container entry animation,
  fields revealing one-by-one, label float/focus animation, validation-error shake, a success
  state animation, and a submit button loading→success transition.
- **Tables/Lists**: a sample data table demonstrating: staggered row reveal, slide-in/fade-in
  rows, new-row highlight, row expansion, a sort/filter loading animation, and a skeleton
  loading state.
- **Modal/Popup**: trigger buttons that open demo modals showing fade backdrop, scale popup,
  slide drawer, bottom-sheet rise, flip modal, bounce/spring popup, an alert/confirmation
  dialog, and a toast notification entry/exit.
- Each demo section should let the client see, for each animation shown, which UI component it
  applies to (reuse the `suitableFor` tags from the registry).

## Files/folders to inspect first

- `docs/automation-handoff.md` (Phase 2's notes: registry location, CSS custom-property names)
- `src/` — the Gallery view, `AnimationPreview` component, and animation registry/CSS from
  Phase 2 (read those specifically, not the whole `src/` tree)

## Out of scope

- Do not build page-level transitions or the standalone loading-effects showcase (Phase 4).
- Do not build favourite persistence or the selection summary/export view (Phase 5).
- Do not create automated tests.
- Do not scan unrelated folders unless needed.

## Completion

- Update `docs/automation-handoff.md`: mark Phase 3 done, note any new animations added to the
  registry (if the existing 80–100 didn't cover something) and where each demo section lives.
- Keep final response under 12 lines.
