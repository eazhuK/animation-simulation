# Automation Handoff

Running context for the phased build. Each fresh Claude Code session should read this file (plus
[CLAUDE.md](../CLAUDE.md)) instead of re-scanning the whole repo. Update the relevant phase's
entry — and "Current state" below — before finishing a phase.

## Current state

- Repo status as of 2026-08-15: **Phase 6 complete — all 6 phases done.** The showcase is
  feature-complete: 101 CSS-only animations across 18 categories, live on Gallery + six
  component-demo views, with shared favourite/selection state and a polish/a11y/responsive pass
  on top. No further phases are queued.
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
- Phase 5 built:
  - `src/context/SelectionContext.jsx` (new) — `SelectionProvider` + `useSelection()` hook, the
    single source of truth for client selection. Holds two pieces of state, both persisted to
    `localStorage`: `favourites` (a `Set` of animation ids, key
    `ui-animation-catalogue:favourites`) and `usage` (a `Map<id, Set<contextString>>`, key
    `ui-animation-catalogue:usage`) recording every "Section → demo block" context an animation
    has actually been rendered in. `registerUsage(id, context)` is called from a `useEffect` in
    the components below whenever they render with a `context` prop — no separate hand-maintained
    usage-mapping data file, so it can't drift from what the views actually show.
  - `src/main.jsx` wraps `<App />` in `<SelectionProvider>`.
  - `AnimationPreview.jsx` (`src/components/shared/`) no longer takes `isFavourite`/
    `onToggleFavourite` props — it reads/writes favourites via `useSelection()` directly, and
    accepts an optional `context` prop to register usage. `Gallery.jsx` lost its local
    `favourites` `useState` entirely and now passes `context={`Gallery → ${category.label}`}`.
  - `AnimationLabel.jsx` (`src/components/shared/`) reworked: renders one row per animation entry
    (name, suitability chips, and a ★/☆ favourite toggle button using `useSelection()`), and takes
    an optional `context` string prop it forwards to `registerUsage`. This is what gives
    Cards/Forms/Tables/Modals/Pages/Loaders a favourite control without touching those views'
    demo logic — only added a `context="Section → demo block title"` prop to each existing
    `<AnimationLabel>` call (one new always-visible label added in `Modals.jsx` for the toast
    animations, which previously had no label at all).
  - `src/components/views/Favourites.jsx` (new) — the "Selected Animations" summary view, now
    routed from `App.jsx` for the `favourites` section (replacing the last `PlaceholderView`
    usage). Lists every favourited animation (grouped implicitly by sort order, each showing its
    category chip and the list of "Section → demo block" contexts it's been viewed in from the
    shared `usage` map), a "Remove" button (unfavourite), and a full `AnimationPreview` per item
    so replay/duration/delay/speed keep working from this view. A "Shareable summary" block
    renders one line per `context: Animation Name` (matching the requirement doc's "Dashboard
    cards: Staggered slide-up" style) in a `<pre>`, with a "Copy summary" button
    (`navigator.clipboard`) and a "Print / save as PDF" button (`window.print()`, with a
    `@media print` rule in `component-demos.css` hiding chrome/controls so only the summary
    block prints).
  - `PlaceholderView.jsx` and its `.placeholder-panel` CSS deleted — every section now has a real
    view, so no placeholder is used anywhere.
  - Verified with `npm run build` (clean) and a temporary Playwright smoke pass (installed
    `playwright-chromium` with `--no-save`, uninstalled after): favouriting in Gallery and in a
    Cards demo label share state (same id shows as favourited in both places), the Favourites view
    lists the right count with correct per-context summary lines, state survives a full page
    reload (localStorage), and duration slider / remove button still work from within Favourites.
    Zero console errors.
- Note: an earlier interrupted scaffold attempt left a stray empty `.git` folder at project root
  (no commits). Left in place — flagged to the user, not removed (destructive-op permission
  denied by the harness). Harmless either way; safe to `rm -rf .git` or `git init` fresh later.
- Phase 6 built (polish/responsive/a11y pass, no new features):
  - `src/styles/global.css` — removed one dead class (`.chip-row`, defined but never used); added
    a global `:focus-visible` outline (all interactive elements), a `prefers-reduced-motion`
    block (collapses all animation/transition durations + iteration counts, standard pattern),
    and two responsive breakpoints (`860px`: sidebar becomes a horizontal scrollable top bar
    instead of a fixed 260px side column; `480px`: tighter header/content padding, smaller
    view-header heading).
  - `src/styles/components/component-demos.css` — `.demo-table-wrap` now scrolls horizontally
    (`overflow: auto` + `.demo-table { min-width: 480px }`) instead of clipping the Tables view on
    narrow screens.
  - `src/components/layout/Sidebar.jsx` — active nav link now gets `aria-current="page"`.
  - `src/components/views/Modals.jsx` — modal panel gets `role="dialog"`/`aria-modal`/
    `aria-labelledby`; Escape key closes the open modal (new `useEffect` keydown listener); toast
    gets `role="status"`/`aria-live="polite"`.
  - `src/components/views/Tables.jsx` — expandable rows are now keyboard-operable (`tabIndex=0`,
    `role="button"`, `aria-expanded`, Enter/Space via `onKeyDown`); removed one unused function
    parameter (`rowClassName`'s `index`) flagged by `oxlint`.
  - Verified: `npx oxlint src` clean (only the pre-existing, expected fast-refresh warning on
    `SelectionContext.jsx` remains — not a real issue), `npm run build` clean, and a temporary
    Playwright smoke pass (installed `playwright-chromium` with `--no-save`, uninstalled after)
    across mobile/tablet/desktop viewports on every section: no console errors, no horizontal
    overflow, modal a11y (dialog role + Escape-to-close) confirmed, and reduced-motion mode
    confirmed collapsing animation duration to ~0.
  - Added project-root `README.md` (what the app is, `npm install`/`npm run dev`, a tour of all 8
    views). No dead code beyond the one CSS class found — Phase 5 had already removed
    `PlaceholderView`, and every one of the 101 registry entries' `cssClassName` values resolves
    to a real CSS rule (checked programmatically), so nothing else to prune.

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

### Phase 5 — done (2026-08-15)

Built the client selection flow: a `SelectionContext` (React context + `localStorage`) holding
shared favourites and a per-animation usage map, so favouriting is consistent across Gallery and
every component demo section. `AnimationPreview`/`AnimationLabel` now read/write this shared state
instead of local component state, and each demo block passes a `context` label used to build the
"which component(s) it's for" mapping. New `Favourites.jsx` view lists selected animations with
full preview controls, per-context usage, and a copy-to-clipboard/print shareable summary. Removed
the now-unused `PlaceholderView`. Build clean, temporary Playwright smoke pass (uninstalled after)
green with zero console errors. See "Current state" above for exact file list and storage keys.

### Phase 6 — done (2026-08-15)

Final polish pass: responsive breakpoints (sidebar collapses to a horizontal top bar under 860px,
tighter padding under 480px, tables scroll horizontally instead of clipping), a global
`:focus-visible` style, a `prefers-reduced-motion` block, modal dialog semantics + Escape-to-close
+ toast live region, keyboard-operable table row expansion, and one dead CSS class removed. Added
project-root `README.md`. Build + lint clean, temporary Playwright pass (uninstalled after) green
across mobile/tablet/desktop with zero console errors and no horizontal overflow. See "Current
state" above for the exact file list. **All 6 phases are now complete.**
