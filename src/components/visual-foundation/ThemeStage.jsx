import { computeTokens } from '../../lib/visual-foundation/computeTokens.js'

/** Applies one theme's (possibly control-overridden) token set as CSS custom properties + the composed background, so everything inside just reads var(--vfg-*). */
export default function ThemeStage({ theme, overrides, className = '', children }) {
  const tokens = computeTokens(theme, overrides)
  return (
    <div
      className={`relative isolate overflow-hidden font-sans ${className}`}
      style={{ ...tokens, backgroundImage: tokens['--vfg-bg-image'], backgroundColor: theme.dark ? '#0b0c14' : '#eef0f7' }}
    >
      {children}
    </div>
  )
}
