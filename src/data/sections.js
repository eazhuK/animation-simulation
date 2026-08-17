/**
 * Top-level app sections used for primary navigation and view-switching.
 * Matches the sections named in docs/requirement.md / CLAUDE.md Phase 1 scope.
 */
export const SECTIONS = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'cards', label: 'Cards' },
  { id: 'forms', label: 'Forms' },
  { id: 'tables', label: 'Tables / Lists' },
  { id: 'modals', label: 'Modals' },
  { id: 'pages', label: 'Pages' },
  { id: 'loaders', label: 'Loading Effects' },
  { id: 'three-d', label: '3D Transformations' },
  { id: 'data-motion', label: 'Data Visualization Motion' },
  { id: 'navigation-motion', label: 'Navigation & Menu Motion' },
  { id: 'text-brand-motion', label: 'Text & Brand Motion' },
  { id: 'visual-foundation', label: 'Visual Foundation Gallery' },
  { id: 'saved-categories', label: 'Saved Categories' },
  { id: 'drafts', label: 'Draft Mode' },
  { id: 'favourites', label: 'Saved Animations' },
]

export const DEFAULT_SECTION_ID = SECTIONS[0].id
