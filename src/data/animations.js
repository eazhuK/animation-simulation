/**
 * Shape for a single animation catalogue entry.
 *
 * {
 *   id: string,               // stable unique key, kebab-case
 *   name: string,              // display name shown to the client
 *   category: string,          // one of CATEGORIES[].id from ./categories.js
 *   cssClassName: string,      // CSS class (see src/styles/animations/) that applies the effect
 *   previewKind: string,       // how AnimationPreview drives it: 'enter' | 'loop' | 'interactive' | 'stagger'
 *   suitableFor: string[],     // which demo sections this suits, from SUITABLE_FOR_OPTIONS
 *   description: string,       // short client-facing explanation of the effect
 * }
 *
 * previewKind meanings:
 *   'enter'       - plays once on mount/replay (animation-fill-mode: both). Replay = remount.
 *   'loop'        - infinite CSS animation (spinners, shimmer, pulse). Replay = remount to resync.
 *   'interactive' - normally triggered by :hover/:active; Replay toggles a `.is-previewing`
 *                   class for the same effect without a real mouse.
 *   'stagger'     - applies to a small group of preview boxes with incrementing delay.
 */

export const SUITABLE_FOR_OPTIONS = [
  'card',
  'form',
  'table',
  'modal',
  'page',
  'button',
  'toast',
  'loader',
]

export const ANIMATIONS = [
  // ---- Fade ----------------------------------------------------------------
  { id: 'fade-in', name: 'Fade In', category: 'fade', cssClassName: 'anim-fade-in', previewKind: 'enter', suitableFor: ['card', 'form', 'page', 'modal'], description: 'Element gradually appears from fully transparent to fully opaque.' },
  { id: 'fade-out', name: 'Fade Out', category: 'fade', cssClassName: 'anim-fade-out', previewKind: 'enter', suitableFor: ['card', 'modal', 'toast'], description: 'Element gradually disappears to fully transparent.' },
  { id: 'fade-in-up', name: 'Fade In Up', category: 'fade', cssClassName: 'anim-fade-in-up', previewKind: 'enter', suitableFor: ['card', 'form', 'page'], description: 'Fades in while drifting upward into place.' },
  { id: 'fade-in-down', name: 'Fade In Down', category: 'fade', cssClassName: 'anim-fade-in-down', previewKind: 'enter', suitableFor: ['card', 'toast', 'page'], description: 'Fades in while drifting downward into place.' },
  { id: 'fade-in-left', name: 'Fade In Left', category: 'fade', cssClassName: 'anim-fade-in-left', previewKind: 'enter', suitableFor: ['card', 'form', 'page'], description: 'Fades in while entering from the left.' },
  { id: 'fade-in-right', name: 'Fade In Right', category: 'fade', cssClassName: 'anim-fade-in-right', previewKind: 'enter', suitableFor: ['card', 'form', 'page'], description: 'Fades in while entering from the right.' },

  // ---- Slide ----------------------------------------------------------------
  { id: 'slide-in-left', name: 'Slide In Left', category: 'slide', cssClassName: 'anim-slide-in-left', previewKind: 'enter', suitableFor: ['card', 'modal', 'page'], description: 'Element slides in fully from the left edge.' },
  { id: 'slide-in-right', name: 'Slide In Right', category: 'slide', cssClassName: 'anim-slide-in-right', previewKind: 'enter', suitableFor: ['card', 'modal', 'page'], description: 'Element slides in fully from the right edge.' },
  { id: 'slide-in-up', name: 'Slide In Up', category: 'slide', cssClassName: 'anim-slide-in-up', previewKind: 'enter', suitableFor: ['card', 'table', 'toast'], description: 'Element enters by sliding upward into its resting position.' },
  { id: 'slide-in-down', name: 'Slide In Down', category: 'slide', cssClassName: 'anim-slide-in-down', previewKind: 'enter', suitableFor: ['toast', 'card', 'page'], description: 'Element enters by sliding downward into its resting position.' },
  { id: 'slide-out-left', name: 'Slide Out Left', category: 'slide', cssClassName: 'anim-slide-out-left', previewKind: 'enter', suitableFor: ['modal', 'toast'], description: 'Element exits by sliding out to the left.' },
  { id: 'slide-out-right', name: 'Slide Out Right', category: 'slide', cssClassName: 'anim-slide-out-right', previewKind: 'enter', suitableFor: ['modal', 'toast'], description: 'Element exits by sliding out to the right.' },
  { id: 'slide-out-up', name: 'Slide Out Up', category: 'slide', cssClassName: 'anim-slide-out-up', previewKind: 'enter', suitableFor: ['toast', 'card'], description: 'Element exits by sliding up and away.' },
  { id: 'slide-out-down', name: 'Slide Out Down', category: 'slide', cssClassName: 'anim-slide-out-down', previewKind: 'enter', suitableFor: ['toast', 'modal'], description: 'Element exits by sliding down and away.' },

  // ---- Scale / Zoom ----------------------------------------------------------------
  { id: 'scale-in', name: 'Scale In', category: 'scale-zoom', cssClassName: 'anim-scale-in', previewKind: 'enter', suitableFor: ['card', 'modal', 'button'], description: 'Element grows in from slightly smaller to full size.' },
  { id: 'scale-out', name: 'Scale Out', category: 'scale-zoom', cssClassName: 'anim-scale-out', previewKind: 'enter', suitableFor: ['modal', 'card'], description: 'Element shrinks away as it exits.' },
  { id: 'zoom-in', name: 'Zoom In', category: 'scale-zoom', cssClassName: 'anim-zoom-in', previewKind: 'enter', suitableFor: ['page', 'modal', 'card'], description: 'Element zooms in dramatically from a much smaller size.' },
  { id: 'zoom-out', name: 'Zoom Out', category: 'scale-zoom', cssClassName: 'anim-zoom-out', previewKind: 'enter', suitableFor: ['page', 'modal'], description: 'Element zooms out and fades away as it exits.' },
  { id: 'scale-settle', name: 'Scale & Settle', category: 'scale-zoom', cssClassName: 'anim-scale-settle', previewKind: 'enter', suitableFor: ['card', 'modal'], description: 'Element grows in, slightly overshoots, then settles at full size.' },
  { id: 'zoom-bounce-in', name: 'Zoom Bounce In', category: 'scale-zoom', cssClassName: 'anim-zoom-bounce-in', previewKind: 'enter', suitableFor: ['modal', 'card', 'button'], description: 'Element zooms in with a springy overshoot before settling.' },

  // ---- Rotate ----------------------------------------------------------------
  { id: 'rotate-in', name: 'Rotate In', category: 'rotate', cssClassName: 'anim-rotate-in', previewKind: 'enter', suitableFor: ['card', 'modal'], description: 'Element rotates and scales in from a tilted starting angle.' },
  { id: 'rotate-in-cw', name: 'Rotate In (Clockwise)', category: 'rotate', cssClassName: 'anim-rotate-in-cw', previewKind: 'enter', suitableFor: ['card', 'button'], description: 'Element spins in clockwise from a quarter turn.' },
  { id: 'rotate-in-ccw', name: 'Rotate In (Counter-clockwise)', category: 'rotate', cssClassName: 'anim-rotate-in-ccw', previewKind: 'enter', suitableFor: ['card', 'button'], description: 'Element spins in counter-clockwise from a quarter turn.' },
  { id: 'rotate-out', name: 'Rotate Out', category: 'rotate', cssClassName: 'anim-rotate-out', previewKind: 'enter', suitableFor: ['card', 'modal'], description: 'Element rotates and shrinks away as it exits.' },
  { id: 'spin-loop', name: 'Spin Loop', category: 'rotate', cssClassName: 'anim-spin-loop', previewKind: 'loop', suitableFor: ['loader', 'button'], description: 'Continuous 360-degree rotation, useful as a loading indicator.' },

  // ---- Flip ----------------------------------------------------------------
  { id: 'flip-in-horizontal', name: 'Flip In (Horizontal)', category: 'flip', cssClassName: 'anim-flip-in-horizontal', previewKind: 'enter', suitableFor: ['card', 'modal'], description: 'Element rotates into view around a horizontal axis, like a card flipping face-up.' },
  { id: 'flip-in-vertical', name: 'Flip In (Vertical)', category: 'flip', cssClassName: 'anim-flip-in-vertical', previewKind: 'enter', suitableFor: ['card', 'modal'], description: 'Element rotates into view around a vertical axis.' },
  { id: 'flip-out-horizontal', name: 'Flip Out (Horizontal)', category: 'flip', cssClassName: 'anim-flip-out-horizontal', previewKind: 'enter', suitableFor: ['card', 'modal'], description: 'Element flips away around a horizontal axis as it exits.' },
  { id: 'flip-out-vertical', name: 'Flip Out (Vertical)', category: 'flip', cssClassName: 'anim-flip-out-vertical', previewKind: 'enter', suitableFor: ['card', 'modal'], description: 'Element flips away around a vertical axis as it exits.' },
  { id: 'flip-card-3d', name: 'Flip Card 3D', category: 'flip', cssClassName: 'anim-flip-card-3d', previewKind: 'enter', suitableFor: ['card', 'modal'], description: 'A full half-turn 3D flip reveal, like turning over a playing card.' },

  // ---- Bounce ----------------------------------------------------------------
  { id: 'bounce-in', name: 'Bounce In', category: 'bounce', cssClassName: 'anim-bounce-in', previewKind: 'enter', suitableFor: ['card', 'modal', 'button'], description: 'Element overshoots slightly then settles, giving a springy entrance.' },
  { id: 'bounce-in-up', name: 'Bounce In Up', category: 'bounce', cssClassName: 'anim-bounce-in-up', previewKind: 'enter', suitableFor: ['card', 'toast'], description: 'Element bounces upward into place with a settling wobble.' },
  { id: 'bounce-in-down', name: 'Bounce In Down', category: 'bounce', cssClassName: 'anim-bounce-in-down', previewKind: 'enter', suitableFor: ['toast', 'card'], description: 'Element bounces downward into place with a settling wobble.' },
  { id: 'bounce-out', name: 'Bounce Out', category: 'bounce', cssClassName: 'anim-bounce-out', previewKind: 'enter', suitableFor: ['card', 'modal'], description: 'Element gives a small bounce before shrinking away.' },
  { id: 'bounce-loop', name: 'Bounce Loop', category: 'bounce', cssClassName: 'anim-bounce-loop', previewKind: 'loop', suitableFor: ['button', 'loader'], description: 'Gentle continuous up-and-down bounce, useful to draw attention.' },

  // ---- Shake / Wiggle ----------------------------------------------------------------
  { id: 'shake-error', name: 'Shake (Error)', category: 'shake-wiggle', cssClassName: 'anim-shake-error', previewKind: 'enter', suitableFor: ['form', 'button'], description: 'Short sharp horizontal shake used to flag a validation error.' },
  { id: 'shake-horizontal', name: 'Shake Horizontal', category: 'shake-wiggle', cssClassName: 'anim-shake-horizontal', previewKind: 'enter', suitableFor: ['form', 'card'], description: 'Broad side-to-side shake for stronger emphasis.' },
  { id: 'shake-vertical', name: 'Shake Vertical', category: 'shake-wiggle', cssClassName: 'anim-shake-vertical', previewKind: 'enter', suitableFor: ['card', 'button'], description: 'Up-and-down shake for a distinct attention cue.' },
  { id: 'wiggle', name: 'Wiggle', category: 'shake-wiggle', cssClassName: 'anim-wiggle', previewKind: 'enter', suitableFor: ['button', 'card'], description: 'Playful side-to-side rotation wiggle.' },
  { id: 'jelly', name: 'Jelly', category: 'shake-wiggle', cssClassName: 'anim-jelly', previewKind: 'enter', suitableFor: ['button', 'card'], description: 'Squash-and-stretch wobble like a piece of jelly.' },

  // ---- Blur / Focus ----------------------------------------------------------------
  { id: 'blur-in', name: 'Blur In', category: 'blur-focus', cssClassName: 'anim-blur-in', previewKind: 'enter', suitableFor: ['card', 'page', 'modal'], description: 'Element sharpens into focus from a blurred start.' },
  { id: 'blur-out', name: 'Blur Out', category: 'blur-focus', cssClassName: 'anim-blur-out', previewKind: 'enter', suitableFor: ['card', 'modal'], description: 'Element softens out of focus as it fades away.' },
  { id: 'focus-in', name: 'Focus In', category: 'blur-focus', cssClassName: 'anim-focus-in', previewKind: 'enter', suitableFor: ['page', 'card'], description: 'Element scales down slightly while sharpening into focus, like a camera pull-focus.' },
  { id: 'unblur-reveal', name: 'Unblur Reveal', category: 'blur-focus', cssClassName: 'anim-unblur-reveal', previewKind: 'enter', suitableFor: ['page', 'card', 'table'], description: 'Content reveals itself by clearing from a heavy blur.' },
  { id: 'blur-pulse', name: 'Blur Pulse', category: 'blur-focus', cssClassName: 'anim-blur-pulse', previewKind: 'loop', suitableFor: ['loader', 'card'], description: 'Subtle continuous blur pulsing used as a loading cue.' },

  // ---- Reveal / Mask ----------------------------------------------------------------
  { id: 'reveal-left-to-right', name: 'Reveal Left to Right', category: 'reveal-mask', cssClassName: 'anim-reveal-left-to-right', previewKind: 'enter', suitableFor: ['page', 'card'], description: 'Content is uncovered progressively from the left edge.' },
  { id: 'reveal-top-to-bottom', name: 'Reveal Top to Bottom', category: 'reveal-mask', cssClassName: 'anim-reveal-top-to-bottom', previewKind: 'enter', suitableFor: ['page', 'card'], description: 'Content is uncovered progressively from the top edge.' },
  { id: 'mask-circle-reveal', name: 'Mask Circle Reveal', category: 'reveal-mask', cssClassName: 'anim-mask-circle-reveal', previewKind: 'enter', suitableFor: ['page', 'modal'], description: 'Content appears through an expanding circular mask.' },
  { id: 'clip-reveal-diagonal', name: 'Clip Reveal Diagonal', category: 'reveal-mask', cssClassName: 'anim-clip-reveal-diagonal', previewKind: 'enter', suitableFor: ['page', 'card'], description: 'Content is revealed along a diagonal wipe.' },
  { id: 'curtain-reveal', name: 'Curtain Reveal', category: 'reveal-mask', cssClassName: 'anim-curtain-reveal', previewKind: 'enter', suitableFor: ['page', 'modal'], description: 'A curtain-like wipe opens across the element to reveal it.' },

  // ---- Stagger ----------------------------------------------------------------
  { id: 'stagger-fade-up', name: 'Stagger Fade Up', category: 'stagger', cssClassName: 'anim-stagger-fade-up', previewKind: 'stagger', suitableFor: ['table', 'card', 'page'], description: 'A group of items fade and rise into place one after another.' },
  { id: 'stagger-slide-in', name: 'Stagger Slide In', category: 'stagger', cssClassName: 'anim-stagger-slide-in', previewKind: 'stagger', suitableFor: ['table', 'card'], description: 'A group of items slide in from the left in sequence.' },
  { id: 'stagger-scale-in', name: 'Stagger Scale In', category: 'stagger', cssClassName: 'anim-stagger-scale-in', previewKind: 'stagger', suitableFor: ['card', 'page'], description: 'A group of items scale up into place one after another.' },
  { id: 'stagger-card-grid', name: 'Stagger Card Grid', category: 'stagger', cssClassName: 'anim-stagger-card-grid', previewKind: 'stagger', suitableFor: ['card', 'page'], description: 'A grid of cards settles into place in a staggered sequence.' },

  // ---- Loading ----------------------------------------------------------------
  { id: 'spinner-circle', name: 'Spinner Circle', category: 'loading', cssClassName: 'anim-spinner-circle', previewKind: 'loop', suitableFor: ['loader', 'button'], description: 'Classic rotating ring spinner.' },
  { id: 'spinner-dual-ring', name: 'Spinner Dual Ring', category: 'loading', cssClassName: 'anim-spinner-dual-ring', previewKind: 'loop', suitableFor: ['loader'], description: 'Two-tone rotating ring spinner.' },
  { id: 'spinner-dots', name: 'Spinner Dots', category: 'loading', cssClassName: 'anim-spinner-dots', previewKind: 'loop', suitableFor: ['loader', 'button'], description: 'Three dots pulsing in sequence to suggest activity.' },
  { id: 'pulse-dot', name: 'Pulse Dot', category: 'loading', cssClassName: 'anim-pulse-dot', previewKind: 'loop', suitableFor: ['loader', 'toast'], description: 'A single dot gently pulsing in size and opacity.' },
  { id: 'pulse-ring', name: 'Pulse Ring', category: 'loading', cssClassName: 'anim-pulse-ring', previewKind: 'loop', suitableFor: ['loader', 'button'], description: 'An expanding, fading ring pulse, like a radar ping.' },
  { id: 'skeleton-shimmer', name: 'Skeleton Shimmer', category: 'loading', cssClassName: 'anim-skeleton-shimmer', previewKind: 'loop', suitableFor: ['loader', 'page', 'table', 'card'], description: 'A soft light sweep across placeholder blocks while real content loads.' },
  { id: 'progress-bar-indeterminate', name: 'Progress Bar (Indeterminate)', category: 'loading', cssClassName: 'anim-progress-bar-indeterminate', previewKind: 'loop', suitableFor: ['loader', 'page'], description: 'A bar that sweeps back and forth when progress can’t be measured.' },
  { id: 'circular-progress-spin', name: 'Circular Progress Spin', category: 'loading', cssClassName: 'anim-circular-progress-spin', previewKind: 'loop', suitableFor: ['loader'], description: 'A rotating partial ring suggesting progress in motion.' },

  // ---- Hover ----------------------------------------------------------------
  { id: 'hover-lift', name: 'Hover Lift', category: 'hover', cssClassName: 'anim-hover-lift', previewKind: 'interactive', suitableFor: ['card', 'button'], description: 'Element lifts slightly with a soft shadow increase on hover.' },
  { id: 'hover-glow', name: 'Hover Glow', category: 'hover', cssClassName: 'anim-hover-glow', previewKind: 'interactive', suitableFor: ['card', 'button'], description: 'A soft coloured glow appears around the element on hover.' },
  { id: 'hover-tilt', name: 'Hover Tilt', category: 'hover', cssClassName: 'anim-hover-tilt', previewKind: 'interactive', suitableFor: ['card'], description: 'Element tilts in 3D space on hover, following a card-tilt style.' },
  { id: 'hover-grow', name: 'Hover Grow', category: 'hover', cssClassName: 'anim-hover-grow', previewKind: 'interactive', suitableFor: ['card', 'button'], description: 'Element scales up slightly on hover.' },
  { id: 'hover-shake', name: 'Hover Shake', category: 'hover', cssClassName: 'anim-hover-shake', previewKind: 'interactive', suitableFor: ['button', 'card'], description: 'Element gives a quick shake on hover to draw attention.' },
  { id: 'hover-underline', name: 'Hover Underline', category: 'hover', cssClassName: 'anim-hover-underline', previewKind: 'interactive', suitableFor: ['button'], description: 'An underline animates in beneath text on hover.' },

  // ---- Page transitions ----------------------------------------------------------------
  { id: 'page-fade', name: 'Page Fade', category: 'page-transitions', cssClassName: 'anim-page-fade', previewKind: 'enter', suitableFor: ['page'], description: 'The whole page content fades in on navigation.' },
  { id: 'page-slide', name: 'Page Slide', category: 'page-transitions', cssClassName: 'anim-page-slide', previewKind: 'enter', suitableFor: ['page'], description: 'The page content slides in from the side on navigation.' },
  { id: 'page-zoom', name: 'Page Zoom', category: 'page-transitions', cssClassName: 'anim-page-zoom', previewKind: 'enter', suitableFor: ['page'], description: 'The page content zooms in gently on navigation.' },
  { id: 'page-curtain', name: 'Page Curtain', category: 'page-transitions', cssClassName: 'anim-page-curtain', previewKind: 'enter', suitableFor: ['page'], description: 'A curtain-style wipe reveals the new page content.' },
  { id: 'page-stagger-load', name: 'Page Stagger Load', category: 'page-transitions', cssClassName: 'anim-page-stagger-load', previewKind: 'stagger', suitableFor: ['page'], description: 'Page sections or dashboard widgets load in one after another.' },
  { id: 'hero-entrance', name: 'Hero Entrance', category: 'page-transitions', cssClassName: 'anim-hero-entrance', previewKind: 'stagger', suitableFor: ['page'], description: 'A hero section’s eyebrow, headline, subtext, and call-to-action rise into place in sequence.' },
  { id: 'skeleton-to-content', name: 'Skeleton to Content', category: 'page-transitions', cssClassName: 'anim-skeleton-to-content', previewKind: 'enter', suitableFor: ['page', 'loader'], description: 'Placeholder skeleton blocks resolve into real content with a soft focus-in transition.' },

  // ---- Modal / Popup ----------------------------------------------------------------
  { id: 'modal-fade-backdrop', name: 'Modal Fade Backdrop', category: 'modal-popup', cssClassName: 'anim-modal-fade-backdrop', previewKind: 'enter', suitableFor: ['modal'], description: 'The dimmed backdrop behind a modal fades in.' },
  { id: 'modal-scale-in', name: 'Modal Scale In', category: 'modal-popup', cssClassName: 'anim-modal-scale-in', previewKind: 'enter', suitableFor: ['modal'], description: 'The modal panel scales up into view.' },
  { id: 'drawer-slide-in', name: 'Drawer Slide In', category: 'modal-popup', cssClassName: 'anim-drawer-slide-in', previewKind: 'enter', suitableFor: ['modal'], description: 'A side drawer panel slides in from off-screen.' },
  { id: 'bottom-sheet-rise', name: 'Bottom Sheet Rise', category: 'modal-popup', cssClassName: 'anim-bottom-sheet-rise', previewKind: 'enter', suitableFor: ['modal'], description: 'A bottom sheet panel rises up from the bottom edge.' },
  { id: 'modal-flip-in', name: 'Modal Flip In', category: 'modal-popup', cssClassName: 'anim-modal-flip-in', previewKind: 'enter', suitableFor: ['modal'], description: 'The modal panel flips into view around a horizontal axis.' },
  { id: 'modal-bounce-in', name: 'Modal Bounce In', category: 'modal-popup', cssClassName: 'anim-modal-bounce-in', previewKind: 'enter', suitableFor: ['modal'], description: 'The modal panel bounces in with a springy overshoot.' },

  // ---- Form field ----------------------------------------------------------------
  { id: 'field-reveal', name: 'Field Reveal', category: 'form-field', cssClassName: 'anim-field-reveal', previewKind: 'stagger', suitableFor: ['form'], description: 'Form fields reveal one by one as the form loads.' },
  { id: 'label-float', name: 'Label Float', category: 'form-field', cssClassName: 'anim-label-float', previewKind: 'interactive', suitableFor: ['form'], description: 'The field label floats above the input on focus.' },
  { id: 'input-focus-glow', name: 'Input Focus Glow', category: 'form-field', cssClassName: 'anim-input-focus-glow', previewKind: 'interactive', suitableFor: ['form'], description: 'The input border and a soft glow highlight the field on focus.' },
  { id: 'field-error-shake', name: 'Field Error Shake', category: 'form-field', cssClassName: 'anim-field-error-shake', previewKind: 'enter', suitableFor: ['form'], description: 'A field shakes briefly to flag a validation error.' },
  { id: 'field-success-check', name: 'Field Success Check', category: 'form-field', cssClassName: 'anim-field-success-check', previewKind: 'enter', suitableFor: ['form'], description: 'A checkmark pops in to confirm a valid field or successful action.' },
  { id: 'submit-button-loading', name: 'Submit Button Loading', category: 'form-field', cssClassName: 'anim-submit-button-loading', previewKind: 'loop', suitableFor: ['form', 'button'], description: 'The submit button shows a spinner while the form is submitting.' },

  // ---- Table / List ----------------------------------------------------------------
  { id: 'row-stagger-reveal', name: 'Row Stagger Reveal', category: 'table-list', cssClassName: 'anim-row-stagger-reveal', previewKind: 'stagger', suitableFor: ['table'], description: 'Table or list rows fade/slide in one after another in sequence.' },
  { id: 'row-slide-in', name: 'Row Slide In', category: 'table-list', cssClassName: 'anim-row-slide-in', previewKind: 'enter', suitableFor: ['table'], description: 'A row slides in from the left when it appears.' },
  { id: 'row-fade-in', name: 'Row Fade In', category: 'table-list', cssClassName: 'anim-row-fade-in', previewKind: 'enter', suitableFor: ['table'], description: 'A row simply fades in when it appears.' },
  { id: 'row-highlight-new', name: 'Row Highlight (New)', category: 'table-list', cssClassName: 'anim-row-highlight-new', previewKind: 'enter', suitableFor: ['table'], description: 'A newly added row briefly highlights before returning to normal.' },
  { id: 'row-expand', name: 'Row Expand', category: 'table-list', cssClassName: 'anim-row-expand', previewKind: 'enter', suitableFor: ['table'], description: 'A row expands open vertically to reveal more detail.' },

  // ---- Button feedback ----------------------------------------------------------------
  { id: 'button-press', name: 'Button Press', category: 'button-feedback', cssClassName: 'anim-button-press', previewKind: 'interactive', suitableFor: ['button'], description: 'The button compresses slightly on press for tactile feedback.' },
  { id: 'button-ripple', name: 'Button Ripple', category: 'button-feedback', cssClassName: 'anim-button-ripple', previewKind: 'interactive', suitableFor: ['button'], description: 'A ripple expands from the center of the button on press.' },
  { id: 'button-success-morph', name: 'Button Success Morph', category: 'button-feedback', cssClassName: 'anim-button-success-morph', previewKind: 'enter', suitableFor: ['button'], description: 'The button content morphs into a success confirmation.' },
  { id: 'button-loading-spin', name: 'Button Loading Spin', category: 'button-feedback', cssClassName: 'anim-button-loading-spin', previewKind: 'loop', suitableFor: ['button'], description: 'The button shows an inline spinner while an action is in progress.' },
  { id: 'button-pulse', name: 'Button Pulse', category: 'button-feedback', cssClassName: 'anim-button-pulse', previewKind: 'loop', suitableFor: ['button'], description: 'A soft pulsing halo draws attention to a primary button.' },

  // ---- Notification / Toast ----------------------------------------------------------------
  { id: 'toast-slide-in', name: 'Toast Slide In', category: 'notification-toast', cssClassName: 'anim-toast-slide-in', previewKind: 'enter', suitableFor: ['toast'], description: 'Notification enters by sliding in from the edge of the screen.' },
  { id: 'toast-fade-in', name: 'Toast Fade In', category: 'notification-toast', cssClassName: 'anim-toast-fade-in', previewKind: 'enter', suitableFor: ['toast'], description: 'Notification fades in and settles at the top of the stack.' },
  { id: 'toast-bounce-in', name: 'Toast Bounce In', category: 'notification-toast', cssClassName: 'anim-toast-bounce-in', previewKind: 'enter', suitableFor: ['toast'], description: 'Notification bounces in with a playful overshoot.' },
  { id: 'toast-progress-dismiss', name: 'Toast Progress Dismiss', category: 'notification-toast', cssClassName: 'anim-toast-progress-dismiss', previewKind: 'loop', suitableFor: ['toast'], description: 'A shrinking progress bar shows the countdown until the toast dismisses itself.' },
]

/** Lookup by id, for component-demo sections that reference specific registry entries. */
export const ANIMATIONS_BY_ID = Object.fromEntries(ANIMATIONS.map((animation) => [animation.id, animation]))
