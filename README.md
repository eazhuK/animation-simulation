# UI Animation Catalogue

An interactive React showcase of 128 CSS-only animation and transition effects, previewed live on
real UI components (cards, forms, tables, modals, pages, loaders, and spatial 3D scenes). Built for browsing and picking
animations to hand off to a dev team — no JS animation library involved, every effect is plain
CSS keyframes/transitions.

Full requirement brief: [docs/requirement.md](docs/requirement.md).

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (typically http://localhost:5173).

Other scripts:

```bash
npm run build    # production build to dist/
npm run preview  # preview the production build locally
npm run lint     # oxlint
```

## Tour of the views

- **Gallery** — all 128 animations grouped by category (fade, slide, scale/zoom, rotate, flip,
  bounce, shake/wiggle, blur/focus, reveal/mask, stagger, loading, hover, page transitions,
  modal/popup, form field, table/list, button feedback, notification/toast, 3D transformations,
  data visualization motion, navigation/menu motion, and text/brand motion). Each entry has a live
  preview, a Replay button, and Duration/Delay/Speed sliders.
- **Cards** — entry directions, staggered grids, entrance effects, and hover interactions applied
  to real card layouts.
- **Forms** — container entry, staggered field reveal, floating labels, focus glow, validation
  shake, success checks, and a submit button's loading → success flow.
- **Tables / Lists** — row reveal styles, new-row highlight, expandable rows, sort-loading
  overlay, and a skeleton-loading state.
- **Modals** — fade/scale/drawer/bottom-sheet/flip/bounce/alert dialog variants, plus a toast
  notification with an auto-dismiss progress bar.
- **Pages** — page transition styles, staggered content load, dashboard widget load-in, a hero
  entrance, and a skeleton-to-content swap.
- **Loading Effects** — spinners, dot/pulse loaders, skeleton & shimmer placeholders, progress
  indicators, and button/full-page loading states.
- **3D Transformations** — pointer-responsive perspective tilt, a two-sided flip reveal, cube
  navigation, layered Z-axis depth, and a spatial card carousel in a compact tabbed prototype.
- **Data Visualization Motion** — rolling KPI values, sequential bars, trend-line drawing, donut
  progress, live updates, and dashboard filtering in a compact tabbed prototype.
- **Navigation & Menu Motion** — sidebar expansion, mega and mobile menus, travelling tab states,
  breadcrumb hierarchy, and a floating dock in a compact tabbed prototype.
- **Text & Brand Motion** — 10 headline, word, character, message, logo, ticker, quote, numeric,
  and call-to-action motion examples for presentation-focused screens.
- **Visual Foundation Gallery** — visual-theme simulations with live presentation controls and
  side-by-side comparison.
- **Selected / Favourites** — every animation marked as a favourite (from any view), grouped with
  where it was used, plus a copyable/printable summary to share with the dev team. State persists
  across reloads via `localStorage`.

## Notes

- Respects `prefers-reduced-motion` — animations/transitions collapse to near-instant for users
  who request reduced motion.
- Responsive down to mobile widths; the sidebar collapses into a horizontal scrollable bar below
  ~860px.
- See [CLAUDE.md](CLAUDE.md) and [docs/automation-handoff.md](docs/automation-handoff.md) for the
  phased build history and architecture notes.
