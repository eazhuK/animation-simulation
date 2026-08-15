/**
 * Animation categories, matching "Animation Categories" in docs/requirement.md exactly.
 * `id` is the stable key used on animation entries and for routing/filtering;
 * `label` is the display name.
 */
export const CATEGORIES = [
  { id: 'fade', label: 'Fade animations' },
  { id: 'slide', label: 'Slide animations' },
  { id: 'scale-zoom', label: 'Scale / Zoom animations' },
  { id: 'rotate', label: 'Rotate animations' },
  { id: 'flip', label: 'Flip animations' },
  { id: 'bounce', label: 'Bounce animations' },
  { id: 'shake-wiggle', label: 'Shake / Wiggle animations' },
  { id: 'blur-focus', label: 'Blur / Focus animations' },
  { id: 'reveal-mask', label: 'Reveal / Mask animations' },
  { id: 'stagger', label: 'Stagger animations' },
  { id: 'loading', label: 'Loading animations' },
  { id: 'hover', label: 'Hover animations' },
  { id: 'page-transitions', label: 'Page transitions' },
  { id: 'modal-popup', label: 'Modal / Popup transitions' },
  { id: 'form-field', label: 'Form field transitions' },
  { id: 'table-list', label: 'Table / List transitions' },
  { id: 'button-feedback', label: 'Button feedback animations' },
  { id: 'notification-toast', label: 'Notification / Toast animations' },
]

export const CATEGORY_MAP = Object.fromEntries(CATEGORIES.map((c) => [c.id, c]))
