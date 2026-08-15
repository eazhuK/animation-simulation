import { ANIMATIONS_BY_ID } from '../../data/animations.js'

/**
 * Small label used across the Cards/Forms/Tables/Modals demo sections so the client can see
 * which registry animation drives a given effect and which UI components it suits.
 */
export default function AnimationLabel({ animationId, animationIds }) {
  const ids = animationIds ?? (animationId ? [animationId] : [])
  const entries = ids.map((id) => ANIMATIONS_BY_ID[id]).filter(Boolean)
  if (entries.length === 0) return null

  return (
    <div className="anim-label">
      <span className="anim-label__names">{entries.map((entry) => entry.name).join(' + ')}</span>
      <span className="anim-label__tags">
        {[...new Set(entries.flatMap((entry) => entry.suitableFor))].map((tag) => (
          <span className="chip chip--muted chip--tiny" key={tag}>
            {tag}
          </span>
        ))}
      </span>
    </div>
  )
}
