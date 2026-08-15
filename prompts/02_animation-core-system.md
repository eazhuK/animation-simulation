# Phase 2 — Animation Core System

Model: latest Sonnet-class model.

## Scope

Build the CSS-only animation engine and the full animation registry (80–100 entries).

Deliverables:
- A CSS keyframe library (one or more stylesheets under `src/styles/animations/` or similar)
  covering every category from the requirement doc: Fade, Slide, Scale/Zoom, Rotate, Flip,
  Bounce, Shake/Wiggle, Blur/Focus, Reveal/Mask, Stagger, Loading, Hover, Page transitions,
  Modal/Popup transitions, Form field transitions, Table/List transitions, Button feedback,
  Notification/Toast. Multiple named variants per category (e.g. slide-in-left/right/top/bottom)
  so the total reaches 80–100 distinct entries.
- Populate the animation registry (the data model from Phase 1) with all 80–100 entries: name,
  category, CSS class name, `suitableFor` tags (Card/Form/Table/Popup/Page), short description.
- A reusable `AnimationPreview` component: shows a small live preview box running the animation,
  a Replay button (re-triggers via key remount or class toggle), and controls for duration,
  delay, and playback speed (apply via inline CSS custom properties, e.g.
  `--anim-duration`/`--anim-delay`, not JS animation logic).
- Wire the Gallery view (from Phase 1's nav) to list all registry entries grouped by category,
  each rendered with `AnimationPreview` plus its suitability tags and a checkbox/favourite
  toggle (the toggle can just update local state for now — persistence is Phase 5).

## Files/folders to inspect first

- `docs/automation-handoff.md` (read Phase 1's notes on stack choice and data-model field names
  before writing code)
- `docs/requirement.md`
- `src/` (whatever Phase 1 created — read only the app shell, data model, and Gallery
  view/route, not the whole tree blindly)

## Out of scope

- Do not build Cards/Forms/Tables/Modals demo sections (Phase 3).
- Do not build page-level transitions or loading-effect showcases beyond what's needed to define
  their CSS keyframes (Phase 4 wires them into dedicated views).
- Do not build favourite persistence or the selection summary/export view (Phase 5).
- Do not create automated tests.
- Do not scan unrelated folders unless needed.

## Completion

- Update `docs/automation-handoff.md`: mark Phase 2 done, note where the registry lives, the
  final animation count, and the CSS custom-property names Phase 3/4 should reuse for
  duration/delay/speed.
- Keep final response under 12 lines.
