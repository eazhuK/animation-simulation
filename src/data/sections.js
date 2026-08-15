/**
 * Top-level app sections used for primary navigation and view-switching.
 * Matches the sections named in docs/requirement.md / CLAUDE.md Phase 1 scope.
 */
export const SECTIONS = [
  { id: 'gallery', label: 'Gallery' },
  { id: 'cards', label: 'Cards' },
  { id: 'forms', label: 'Forms' },
  { id: 'tables', label: 'Tables / Lists' },
  { id: 'modals', label: 'Modals' },
  { id: 'pages', label: 'Pages' },
  { id: 'loaders', label: 'Loading Effects' },
  { id: 'favourites', label: 'Selected / Favourites' },
]

export const DEFAULT_SECTION_ID = SECTIONS[0].id
