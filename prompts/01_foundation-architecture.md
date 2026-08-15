# Phase 1 — Foundation & Architecture

Model: latest Sonnet-class model (do not use Opus unless genuinely architecture-blocked).

## Scope

Bootstrap the React app shell for the "UI Animation Catalogue" showcase. No animation content
yet — that's Phase 2+. This phase only builds the skeleton the rest of the app plugs into.

Deliverables:
- Vite + React project (JS or TS, your call — pick one and note it in the handoff doc) at the
  project root, `npm run dev` works.
- Pure CSS only — confirm no animation library is added to `package.json` (no framer-motion,
  react-spring, gsap, anime.js, etc).
- Global layout: sidebar or top nav listing the animation categories (see requirement doc),
  a main content area, a light/modern/premium theme via CSS variables (colors, spacing,
  radius, shadow tokens) in one central stylesheet.
- Routing (or simple view-switching state, your call) between: Gallery, Cards, Forms,
  Tables/Lists, Modals, Pages, Loading Effects, Selected/Favourites — the sections named in the
  requirement doc. Placeholder/empty content in each is fine for this phase.
- A data model module (e.g. `src/data/animations.js` or `.ts`) with the *shape* for an animation
  entry (name, category, cssClassName, suitableFor: string[], description) — populate a handful
  of real sample entries to prove the shape works, but the full 80–100 registry is Phase 2's job.
- Category list/constants matching the categories in the requirement doc exactly.

## Files/folders to inspect first

- `docs/requirement.md`
- `docs/automation-handoff.md`
- `CLAUDE.md`
- (project root is otherwise empty — no need to scan anything else)

## Out of scope

- Do not build out real animation keyframes or the full animation registry (Phase 2).
- Do not build the Cards/Forms/Tables/Modals demo content (Phase 3).
- Do not build loading effects or page transitions (Phase 4).
- Do not build favourite/selection persistence logic (Phase 5).
- Do not create automated tests.
- Do not scan unrelated folders unless needed.

## Completion

- Update `docs/automation-handoff.md`: mark Phase 1 done, note the stack choice (JS vs TS),
  folder layout, and anything Phase 2 needs to know (e.g. exact data-model field names).
- Keep final response under 12 lines.
