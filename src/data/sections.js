import { CONFIGURATION_STEPS } from './configurationSteps.js'

export const SECTIONS = [
  { id: 'dashboard', label: 'Client Dashboard' },
  ...CONFIGURATION_STEPS.map((step) => ({ id: step.id, label: step.label })),
]

export const DEFAULT_SECTION_ID = 'dashboard'
