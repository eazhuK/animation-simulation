# Phase 4 — Page Transitions & Loading Effects

Model: latest Sonnet-class model.

## Scope

Build the two remaining demo sections from the requirement doc: Page-Level Animations and
Loading Effects.

Deliverables:
- **Page-Level Animations** view: demos for page fade transition, slide page transition, zoom
  page transition, curtain/reveal transition, content stagger load, dashboard-widgets sequential
  load, hero section animated entrance, and skeleton-to-content loading transition. A simple
  "switch between two mock pages" control is enough to demonstrate each transition — no real
  router-level page transition wiring is required.
- **Loading Effects** view: spinner variations, dot loading, pulse loading, skeleton loaders,
  shimmer loaders, progress bar, circular progress, button loading state, and a full-page
  loading screen demo (contained to a preview frame, not an actual full-page overlay covering
  the whole app).
- Both views should use the Phase 2 `AnimationPreview` component and registry where the
  animation is a good fit; add registry entries for any loading/page-transition animation that
  isn't already covered (note additions in the handoff doc).

## Files/folders to inspect first

- `docs/automation-handoff.md` (Phase 2/3 notes on registry + component locations)
- `src/` — `AnimationPreview`, the animation registry/CSS, and how Phase 3's demo sections are
  structured (for consistency), not the whole tree

## Out of scope

- Do not touch Cards/Forms/Tables/Modals demo sections beyond reusing shared components.
- Do not build favourite persistence or the selection summary/export view (Phase 5).
- Do not create automated tests.
- Do not scan unrelated folders unless needed.

## Completion

- Update `docs/automation-handoff.md`: mark Phase 4 done, note any new registry entries and
  where the two new views live.
- Keep final response under 12 lines.
