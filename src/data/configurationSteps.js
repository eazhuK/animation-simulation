export const CONFIGURATION_STEPS = [
  { id: 'gallery', label: 'Animation Gallery', shortLabel: 'Gallery' },
  { id: 'cards', label: 'Card Animations', shortLabel: 'Cards' },
  { id: 'forms', label: 'Form Animations', shortLabel: 'Forms' },
  { id: 'tables', label: 'Tables & Lists', shortLabel: 'Tables' },
  { id: 'modals', label: 'Modals & Popups', shortLabel: 'Modals' },
  { id: 'pages', label: 'Page Transitions', shortLabel: 'Pages' },
  { id: 'loaders', label: 'Loading Effects', shortLabel: 'Loaders' },
  { id: 'three-d', label: '3D Transformations', shortLabel: '3D' },
  { id: 'data-motion', label: 'Data Visualization', shortLabel: 'Data' },
  { id: 'navigation-motion', label: 'Navigation Motion', shortLabel: 'Navigation' },
  { id: 'text-brand-motion', label: 'Text & Brand Motion', shortLabel: 'Text' },
  { id: 'visual-foundation', label: 'Visual Foundation', shortLabel: 'Visual' },
]

export const CONFIGURATION_STEP_IDS = CONFIGURATION_STEPS.map((step) => step.id)
export const CONFIGURATION_STEP_MAP = Object.fromEntries(
  CONFIGURATION_STEPS.map((step) => [step.id, step])
)
