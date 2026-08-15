# Automation Handoff

Running context for the phased build. Each fresh Claude Code session should read this file (plus
[CLAUDE.md](../CLAUDE.md)) instead of re-scanning the whole repo. Update the relevant phase's
entry — and "Current state" below — before finishing a phase.

## Current state

- Repo status as of 2026-08-15: Phase 4 complete — Pages/Loaders demo sections wired to the
  animation registry.
- Next phase to run: **Phase 5** (`prompts/05_client-selection-flow.md`).
- Stack: Vite + React, **JavaScript** (JSX, not TS) — matches the scaffold's default template.
- Folder layout:
  - `src/main.jsx` — entry point, imports `src/styles/global.css`.
  - `src/App.jsx` — root component: sidebar + header + view-switching (plain `useState`, no
    router library added).
  - `src/components/layout/Sidebar.jsx` — primary nav, lists the 8 top-level sections.
  - `src/components/views/Gallery.jsx` — Gallery view; renders category chips + sample-entry
    count as proof the data model is wired (no live previews yet — that's Phase 2).
  - `src/components/views/PlaceholderView.jsx` — generic placeholder used by Cards/Forms/
    Tables/Modals/Pages/Loaders/Favourites until their phases build real content.
  - `src/data/categories.js` — `CATEGORIES` (18 entries, `id`/`label`), matches requirement doc
    "Animation Categories" list exactly. Also exports `CATEGORY_MAP`.
  - `src/data/sections.js` — `SECTIONS` (the 8 top-level nav sections) + `DEFAULT_SECTION_ID`.
  - `src/data/animations.js` — `ANIMATIONS` array, 10 sample entries proving the shape:
    `{ id, name, category, cssClassName, suitableFor: string[], description }`.
    `suitableFor` vocabulary used so far: `card | form | table | modal | page | button | toast | loader`.
    Also exports `SUITABLE_FOR_OPTIONS`.
  - `src/styles/theme.css` — CSS variable tokens (color, spacing, radius, shadow, type,
    motion-timing, layout). Imported by `global.css`.
  - `src/styles/global.css` — base reset + layout classes (`.app-shell`, `.sidebar`, `.view`,
    `.card`, `.placeholder-panel`, `.chip`, etc.) consumed by the components above.
- Confirmed: no JS animation library in `package.json`/`package-lock.json` (checked for
  framer/gsap/spring/anime — none present). `npm run build` and `npm run dev` both verified working.
- Phase 2 built:
  - `src/styles/animations/` — one CSS file per category (`fade.css`, `slide.css`, `scale-zoom.css`,
    `rotate.css`, `flip.css`, `bounce.css`, `shake-wiggle.css`, `blur-focus.css`, `reveal-mask.css`,
    `stagger.css`, `loading.css`, `hover.css`, `page-transitions.css`, `modal-popup.css`,
    `form-field.css`, `table-list.css`, `button-feedback.css`, `notification-toast.css`) plus
    `_base.css` (shared duration/delay/easing plumbing) and `index.css` (imports all, pulled into
    `global.css`). Every `.anim-*` class relies on `--anim-duration` (default 500ms),
    `--anim-delay` (default 0ms), `--anim-easing` (default `var(--ease-standard)`) — Phase 3/4
    should keep reusing these three custom properties rather than inventing new ones.
  - `src/data/animations.js` — full registry, **99 entries** across all 18 categories. Each entry
    adds a `previewKind` field (`'enter' | 'loop' | 'interactive' | 'stagger'`) alongside the
    Phase 1 shape (`id/name/category/cssClassName/suitableFor/description`) — this tells
    `AnimationPreview` how to trigger/replay it. Interactive classes (hover/button-feedback/some
    form-field) respond to real `:hover`/`:active` **and** a `.is-previewing` class that the
    component toggles for the Replay button.
  - `src/components/shared/AnimationPreview.jsx` + `src/styles/components/animation-preview.css`
    — reusable preview card: live preview box, Replay button, Duration/Delay/Speed range inputs
    (speed divides duration to get the effective `--anim-duration`), favourite checkbox
    (local state only, no persistence yet), suitability tag chips.
  - `Gallery.jsx` now lists all 99 entries grouped by category, each rendered via
    `AnimationPreview`.
  - Verified with `npm run build` and a headless Chromium pass (99 `.anim-card` / 18
    `.anim-category` rendered, replay/slider/favourite interactions worked, zero console errors).
- Phase 3 built (no new keyframes needed — all demos reuse the existing 99-entry registry):
  - `src/data/animations.js` gained `ANIMATIONS_BY_ID` (lookup map, additive only).
  - `src/components/shared/AnimationLabel.jsx` — small reusable label showing an animation's
    name + `suitableFor` chips; used by every demo section below to surface "which registry
    animation drives this / which UI component it suits".
  - `src/components/views/Cards.jsx` — 2/3/4-card layouts with left/right/top/bottom entry
    triggers (`slide-in-*`), staggered entry (`stagger-card-grid`), entrance-effect picker
    (`scale-settle` / `bounce-in` / `flip-card-3d`), a "four directions converge" 2×2 demo, and a
    hover grid (`hover-lift/glow/tilt/shake`) with real `:hover` plus a Preview button toggling
    `.is-previewing`.
  - `src/components/views/Forms.jsx` — sample name/email/message form: container entry
    (`fade-in-up`/`scale-in` picker), staggered field reveal (`field-reveal`), a true floating
    label (`label-float`) + `input-focus-glow` driven by real `onFocus`/`onBlur` toggling
    `.is-previewing` (registry CSS only defines `:hover`/`.is-previewing`, not `:focus`, so JS
    bridges real focus to that class), validation shake (`field-error-shake`) on empty
    name/invalid email, success checks (`field-success-check`), and a submit button that goes
    idle → loading (`submit-button-loading` spinner) → success (`button-success-morph`) → resets.
  - `src/components/views/Tables.jsx` — one sample data table: row reveal style picker
    (`row-stagger-reveal` / `row-slide-in` / `row-fade-in`), "Add row" → `row-highlight-new`,
    click-to-expand row detail (`row-expand`), "Sort by name" showing a `spinner-circle` overlay
    then replaying the stagger reveal, and a "Show skeleton" toggle using `skeleton-shimmer`
    blocks before revealing real rows.
  - `src/components/views/Modals.jsx` — trigger buttons open one of: fade backdrop
    (`modal-fade-backdrop`), scale popup (`modal-scale-in`), slide drawer (`drawer-slide-in`),
    bottom sheet (`bottom-sheet-rise`), flip modal (`modal-flip-in`), bounce/spring popup
    (`modal-bounce-in`), and an alert/confirmation dialog (`zoom-bounce-in`, Confirm/Cancel
    actions) — plus an independent "Show Toast" trigger (`toast-slide-in` in, `slide-out-right`
    out, with a `toast-progress-dismiss` countdown bar).
  - `src/styles/components/component-demos.css` (new, imported from `global.css`) — layout CSS
    for all four sections: shared `.demo-block`/`.demo-controls`/`.demo-btn`/`.anim-label`
    building blocks, plus section-specific card/form/table/modal/toast styling. All animation
    timing still flows through `--anim-duration`/`--anim-delay` from `_base.css`; no new custom
    properties introduced.
  - `src/App.jsx` now maps section id → view component (`VIEW_COMPONENTS`) instead of a single
    `Gallery` special-case; `cards`/`forms`/`tables`/`modals` render their real components,
    `pages`/`loaders`/`favourites` still fall back to `PlaceholderView` (Phase 4/5).
  - Verified with `npm run build` (clean) and a temporary local Playwright smoke pass (not
    committed — installed with `--no-save`, browser exercised, then uninstalled) covering card
    triggers, form validation/submit flow, table add/sort/skeleton/expand, and modal/toast open
    flows; zero console errors.
- Phase 4 built (two new registry entries added; everything else reused Phase 2 CSS/registry):
  - `src/data/animations.js` (`page-transitions` category) gained `hero-entrance` (`previewKind:
    'stagger'`) and `skeleton-to-content` (`previewKind: 'enter'`) — new keyframes/classes in
    `src/styles/animations/page-transitions.css` (`anim-hero-entrance-kf`,
    `anim-skeleton-to-content-kf`). Registry is now **101 entries**.
  - `src/components/views/Pages.jsx` — 5 demo blocks: page transition style picker (fade/slide/
    zoom/curtain on a mock two-page frame), content stagger load (`page-stagger-load` on 4 mock
    sections), dashboard widgets sequential load (`stagger-card-grid` on 4 stat-widget cards),
    hero section entrance (`hero-entrance`, staggered via inline `--anim-delay` on eyebrow/title/
    subtitle/CTA), and skeleton-to-content transition (`skeleton-shimmer` → `skeleton-to-content`
    swap on a timed reload).
  - `src/components/views/Loaders.jsx` — 6 demo blocks: spinners + dot loading (`spinner-circle`/
    `spinner-dual-ring`/`spinner-dots`), pulse loading (`pulse-dot`/`pulse-ring`), skeleton &
    shimmer loaders (`skeleton-shimmer` on an avatar+lines list, noted as the same technique
    serving both bullets), progress indicators (`progress-bar-indeterminate` +
    `circular-progress-spin`), button loading state (`button-loading-spin` on a standalone Save
    button), and a full-page loading screen contained inside a bordered preview frame (not a real
    overlay), reusing `spinner-dual-ring` + `progress-bar-indeterminate`.
  - `src/styles/components/component-demos.css` extended (not a new file) with Pages/Loaders
    layout classes (`.demo-page-frame`, `.demo-page-mock`, `.demo-widget-grid`, `.demo-hero`,
    `.demo-skeleton-frame`, `.demo-loader-grid`, `.demo-loader-shape`, `.demo-pulse-*`,
    `.demo-skeleton-list`, `.demo-progress-track`, `.demo-loading-screen*`) plus a new
    `.demo-block__note` helper; header comment updated to cover Phase 3+4 sections.
  - `src/App.jsx` now routes `pages`/`loaders` to the real components; only `favourites` still
    falls back to `PlaceholderView` (Phase 5).
  - Verified with `npm run build` (clean) and a temporary Playwright smoke pass (installed
    `playwright-chromium` with `--no-save`, uninstalled after) exercising both views' controls;
    zero console errors.
- For Phase 5: `favourites` is the only remaining `PlaceholderView`; reuse the existing favourite
  checkbox state pattern already in `AnimationPreview` (currently local-only) as the basis for
  persisted selection.
- Note: an earlier interrupted scaffold attempt left a stray empty `.git` folder at project root
  (no commits). Left in place — flagged to the user, not removed (destructive-op permission
  denied by the harness). Harmless either way; safe to `rm -rf .git` or `git init` fresh later.

## Phase plan

| # | Prompt file | Scope |
|---|---|---|
| 1 | `01_foundation-architecture.md` | Vite+React app shell, folder structure, theme/design tokens, navigation/layout, category data model |
| 2 | `02_animation-core-system.md` | CSS keyframe library, the 80–100 animation registry (metadata: name/category/tags), reusable `AnimationPreview` component (replay/duration/delay/speed controls) |
| 3 | `03_component-demos.md` | Cards, Forms, Tables/Lists, Modal/Popup demo sections wired to the animation registry |
| 4 | `04_page-loading-effects.md` | Page-level transitions + loading effects (spinners/skeletons/shimmer/progress) sections |
| 5 | `05_client-selection-flow.md` | Favourite/select state, persistence, "selected animations" summary/export view |
| 6 | `06_polish-docs-cleanup.md` | Responsive pass, visual polish, accessibility check, README/docs cleanup |

Each prompt file is self-contained: it names exactly which files/folders to read, states what's
out of scope, and caps the final response to 12 lines. Don't add to a phase's scope beyond what
its prompt file says — flag follow-on ideas back to the handoff doc instead of doing them inline.

## Per-phase log

Append one entry per completed phase (or attempted phase, if it failed/was skipped).

### Phase 1 — done (2026-08-15)

Vite + React (JS) app shell created at project root. Sidebar nav across 8 sections
(Gallery/Cards/Forms/Tables-Lists/Modals/Pages/Loaders/Favourites) with `useState`-based view
switching (no router lib). Central theme tokens in `src/styles/theme.css`. Data model modules
for categories, sections, and a 10-entry animation sample in `src/data/`. Build and dev server
both verified. See "Current state" above for exact field names/paths Phase 2 needs.

### Phase 2 — done (2026-08-15)

Built the CSS-only animation engine and populated the full 99-entry registry (18 categories, all
from the requirement doc). `src/styles/animations/` holds one stylesheet per category plus a
shared base for duration/delay/easing custom properties; `src/data/animations.js` carries the
registry with a new `previewKind` field driving replay behaviour. Added reusable
`AnimationPreview` (replay, duration/delay/speed sliders, favourite checkbox, suitability tags)
and wired it into `Gallery.jsx`, grouped by category. Build + headless-browser check both green,
no console errors. See "Current state" above for exact file paths and CSS variable names.

### Phase 3 — done (2026-08-15)

Built the Cards, Forms, Tables/Lists, and Modal/Popup demo sections, wiring them to the existing
Phase 2 registry — no new keyframes were needed. Added a shared `AnimationLabel` component so
every demo shows which registry animation(s) drive it and which UI components they suit. New
`component-demos.css` carries shared demo-block/button/control styling plus per-section layout.
`App.jsx` now routes `cards`/`forms`/`tables`/`modals` to real components; `pages`/`loaders`/
`favourites` remain placeholders for Phase 4/5. Build clean, Playwright smoke pass (temporary,
uninstalled after) green with zero console errors. See "Current state" above for exact file list.

### Phase 4 — done (2026-08-15)

Built the Pages (page-level transitions) and Loading Effects demo sections. Added two new
registry entries (`hero-entrance`, `skeleton-to-content`) for the two effects not already covered;
everything else reused the existing 99-entry registry and Phase 2 CSS. `App.jsx` now routes
`pages`/`loaders` to real components — only `favourites` remains a placeholder. Build clean,
temporary Playwright smoke pass (uninstalled after) green with zero console errors. See "Current
state" above for exact file list and new registry entries.

### Phase 5 — pending

_Not yet run._

### Phase 6 — pending

_Not yet run._
