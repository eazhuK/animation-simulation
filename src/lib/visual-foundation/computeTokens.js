import { hsl, mix } from './color.js'
import {
  SHADOW_INTENSITY,
  FINISH,
  ATMOSPHERE,
  BORDER_STYLE,
  RADIUS,
  COLOUR_INTENSITY,
} from './controls.js'

const white = (a) => hsl(0, 0, 100, a)
const black = (a) => hsl(0, 0, 0, a)
const swatch = (s, a = 1) => hsl(s.h, s.s, s.l, a)

/**
 * Merges a theme's base palette with the (possibly overridden) 6 control
 * dimensions into one flat map of CSS custom-property values. The result is
 * spread onto a wrapper element's inline `style`, so every descendant
 * primitive just reads `var(--vfg-*)` — swapping theme or nudging a control
 * never touches component markup, only this token map.
 */
export function computeTokens(theme, overrides = {}) {
  const controls = { ...theme.defaultControls, ...overrides }
  const p = theme.palette

  const shadow = SHADOW_INTENSITY[controls.shadowIntensity]
  const finish = FINISH[controls.finish]
  const atmo = ATMOSPHERE[controls.atmosphere]
  const border = BORDER_STYLE[controls.borderStyle]
  const radius = RADIUS[controls.radius]
  const colour = COLOUR_INTENSITY[controls.colourIntensity]

  const primary = mix(p.primary, { satMult: colour.satMult })
  const accent = mix(p.accent, { satMult: colour.satMult })
  const glowA = mix(p.glow, { satMult: atmo.satMult, lightOffset: atmo.lightOffset })
  const glowB = mix(p.accent, { satMult: atmo.satMult * 0.9, lightOffset: atmo.lightOffset + 6 })
  const bgFrom = mix(p.bgFrom, { satMult: atmo.satMult, lightOffset: atmo.lightOffset })
  const bgTo = mix(p.bgTo, { satMult: atmo.satMult, lightOffset: atmo.lightOffset })

  const insetTopAlpha = Math.min(0.92, shadow.insetTop * finish.highlightMult)
  const insetBottomAlpha = Math.min(0.85, shadow.insetBottom)
  // Emphasis surfaces (headers) push toward mid-gray; sunken surfaces (inputs, stripes)
  // always recede toward darker, regardless of light/dark theme.
  const strongOffset = theme.dark ? 4 : -3
  const sunkenOffset = theme.dark ? -4 : -2

  const cardShadowLayers = [
    `0 ${Math.round(shadow.blur * 0.4)}px ${shadow.blur}px ${shadow.spread}px ${swatch(p.shadow, shadow.alpha)}`,
    `inset 0 1px 0 ${white(insetTopAlpha)}`,
    `inset 0 -${Math.round(shadow.blur * 0.12)}px ${Math.round(shadow.blur * 0.3)}px ${black(insetBottomAlpha)}`,
  ]
  if (border.ringAlpha > 0) {
    cardShadowLayers.push(`0 0 0 1px ${swatch(primary, border.ringAlpha)}`)
    cardShadowLayers.push(`0 0 ${Math.round(shadow.glowBlur * 0.45)}px ${swatch(primary, border.ringAlpha * 0.5)}`)
  }

  const buttonShadowLayers = [
    `0 ${Math.round(shadow.blur * 0.2)}px ${Math.round(shadow.blur * 0.5)}px ${Math.round(shadow.spread * 0.6)}px ${swatch(primary, shadow.alpha + 0.12)}`,
    `inset 0 1px 0 ${white(insetTopAlpha * 0.8)}`,
    `inset 0 -2px 4px ${black(insetBottomAlpha * 0.6)}`,
  ]

  return {
    '--vfg-bg-image': [
      `radial-gradient(60% 50% at 12% 8%, ${swatch(glowA, atmo.blobAlpha)}, transparent 65%)`,
      `radial-gradient(55% 45% at 90% 15%, ${swatch(glowB, atmo.blobAlpha * 0.85)}, transparent 60%)`,
      `radial-gradient(70% 60% at 50% 100%, ${swatch(p.shadow, atmo.blobAlpha * 0.7)}, transparent 70%)`,
      `linear-gradient(160deg, ${swatch(bgFrom)}, ${swatch(bgTo)})`,
    ].join(', '),
    '--vfg-surface': swatch(p.surface, finish.surfaceAlpha),
    '--vfg-surface-strong': swatch({ ...p.surface, l: p.surface.l + strongOffset }, Math.min(1, finish.surfaceAlpha + 0.05)),
    '--vfg-surface-sunken': swatch({ ...p.surface, l: p.surface.l + sunkenOffset }, Math.min(1, finish.surfaceAlpha + 0.02)),
    '--vfg-border': swatch(p.border, border.alpha),
    '--vfg-text': swatch(p.text),
    '--vfg-text-muted': swatch(p.textMuted),
    '--vfg-primary': swatch(primary, colour.accentAlpha + 0.05 > 1 ? 1 : colour.accentAlpha + 0.05),
    '--vfg-primary-solid': swatch(primary),
    '--vfg-primary-strong': hsl(primary.h, primary.s, Math.max(18, primary.l - 14)),
    '--vfg-accent': swatch(accent, colour.accentAlpha),
    '--vfg-accent-solid': swatch(accent),
    '--vfg-shadow-card': cardShadowLayers.join(', '),
    '--vfg-shadow-button': buttonShadowLayers.join(', '),
    '--vfg-radius-card': `${radius.card}px`,
    '--vfg-radius-panel': `${radius.panel}px`,
    '--vfg-radius-button': `${radius.button}px`,
    '--vfg-radius-pill': '999px',
    '--vfg-blur': `${finish.blur}px`,
  }
}
