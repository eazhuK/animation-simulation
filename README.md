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

- **Client Dashboard** — create any number of named client configurations and manage them in
  separate **Drafts** and **Saved** tabs. Each card shows required-step progress and selection
  totals, and can continue the workflow or open its report.
- **Guided configuration workflow** — each client visits 12 required steps, from Gallery through
  Visual Foundation. Previous/Next controls, visited indicators, Save Draft, and Complete & Save
  keep the journey explicit. Completion is blocked until every step is visited and at least one
  animation or visual theme is selected.
- **Gallery** — all 128 animations grouped by category (fade, slide, scale/zoom, rotate, flip,
  bounce, shake/wiggle, blur/focus, reveal/mask, stagger, loading, hover, page transitions,
  modal/popup, form field, table/list, button feedback, notification/toast, 3D transformations,
  data visualization motion, navigation/menu motion, and text/brand motion). Each entry has a live
  preview, a Replay button, Duration/Delay/Speed sliders, and a client-scoped Select action.
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
- **Configuration Report** — every draft or saved client configuration has a readable report
  grouped by animation category, including timing settings, visual foundations, notes, and step
  completion. Download it as Markdown or use Print / Save PDF.

Client records, Draft/Saved status, progress, selections, timing controls, visual-theme overrides,
and usage history persist across reloads in browser `localStorage`. Client data is isolated by
configuration. No backend, account, or network storage is used.

## Notes

- Respects `prefers-reduced-motion` — animations/transitions collapse to near-instant for users
  who request reduced motion.
- Responsive down to mobile widths; the sidebar collapses into a horizontal scrollable bar below
  ~860px.
- See [CLAUDE.md](CLAUDE.md) and [docs/automation-handoff.md](docs/automation-handoff.md) for the
  phased build history and architecture notes.
