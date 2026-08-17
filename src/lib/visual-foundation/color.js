/**
 * Small HSL helpers so theme palettes can be authored as plain numbers
 * (hue/saturation/lightness) and re-mixed by the Colour Intensity control
 * without hand-authoring every alpha/shade combination per theme.
 */

export function hsl(h, s, l, a = 1) {
  const clampedA = Math.max(0, Math.min(1, a))
  return `hsl(${h} ${clamp(s)}% ${clamp(l)}% / ${clampedA})`
}

export function clamp(value, min = 0, max = 100) {
  return Math.max(min, Math.min(max, value))
}

/** Nudges saturation/lightness of a base swatch by a multiplier + offset pair. */
export function mix(swatch, { satMult = 1, lightOffset = 0 } = {}) {
  return {
    h: swatch.h,
    s: clamp(swatch.s * satMult),
    l: clamp(swatch.l + lightOffset),
  }
}
