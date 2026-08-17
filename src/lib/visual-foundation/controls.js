/**
 * The 6 client-facing theme dimensions from the spec, each with a fixed set
 * of discrete options. Every theme picks a default combination; the detail
 * preview's control panel lets the client override any dimension live.
 */
export const CONTROL_DIMENSIONS = [
  {
    key: 'shadowIntensity',
    label: 'Shadow intensity',
    options: [
      { value: 'soft', label: 'Soft' },
      { value: 'medium', label: 'Medium' },
      { value: 'strong', label: 'Strong' },
    ],
  },
  {
    key: 'finish',
    label: 'Surface finish',
    options: [
      { value: 'matte', label: 'Matte' },
      { value: 'lacquer', label: 'Lacquer' },
      { value: 'glass', label: 'Glass' },
      { value: 'metallic', label: 'Metallic' },
    ],
  },
  {
    key: 'atmosphere',
    label: 'Background atmosphere',
    options: [
      { value: 'calm', label: 'Calm' },
      { value: 'colourful', label: 'Colourful' },
      { value: 'dramatic', label: 'Dramatic' },
    ],
  },
  {
    key: 'borderStyle',
    label: 'Border style',
    options: [
      { value: 'minimal', label: 'Minimal' },
      { value: 'glow', label: 'Glow' },
      { value: 'highlighted', label: 'Highlighted' },
    ],
  },
  {
    key: 'radius',
    label: 'Corner radius',
    options: [
      { value: 'soft', label: 'Soft' },
      { value: 'rounded', label: 'Rounded' },
      { value: 'bold', label: 'Bold' },
    ],
  },
  {
    key: 'colourIntensity',
    label: 'Colour intensity',
    options: [
      { value: 'subtle', label: 'Subtle' },
      { value: 'balanced', label: 'Balanced' },
      { value: 'vibrant', label: 'Vibrant' },
    ],
  },
]

export const SHADOW_INTENSITY = {
  soft: { blur: 40, spread: -10, alpha: 0.16, insetTop: 0.32, insetBottom: 0.16, glowBlur: 70, glowAlpha: 0.14 },
  medium: { blur: 60, spread: -12, alpha: 0.26, insetTop: 0.42, insetBottom: 0.26, glowBlur: 110, glowAlpha: 0.22 },
  strong: { blur: 90, spread: -14, alpha: 0.38, insetTop: 0.55, insetBottom: 0.38, glowBlur: 170, glowAlpha: 0.32 },
}

export const FINISH = {
  matte: { surfaceAlpha: 0.97, blur: 0, highlightMult: 0.55 },
  lacquer: { surfaceAlpha: 0.93, blur: 0, highlightMult: 1.15 },
  glass: { surfaceAlpha: 0.5, blur: 20, highlightMult: 1 },
  metallic: { surfaceAlpha: 0.9, blur: 0, highlightMult: 1.3 },
}

export const ATMOSPHERE = {
  calm: { satMult: 0.65, lightOffset: 4, blobAlpha: 0.16 },
  colourful: { satMult: 1, lightOffset: 0, blobAlpha: 0.26 },
  dramatic: { satMult: 1.1, lightOffset: -8, blobAlpha: 0.34 },
}

export const BORDER_STYLE = {
  minimal: { alpha: 0.12, ringAlpha: 0 },
  glow: { alpha: 0.28, ringAlpha: 0.35 },
  highlighted: { alpha: 0.5, ringAlpha: 0.6 },
}

export const RADIUS = {
  soft: { card: 14, panel: 18, button: 10 },
  rounded: { card: 22, panel: 28, button: 14 },
  bold: { card: 32, panel: 36, button: 20 },
}

export const COLOUR_INTENSITY = {
  subtle: { satMult: 0.7, accentAlpha: 0.55 },
  balanced: { satMult: 1, accentAlpha: 0.78 },
  vibrant: { satMult: 1.3, accentAlpha: 0.95 },
}
