import { useEffect } from 'react'
import { ANIMATIONS_BY_ID } from '../../data/animations.js'
import { useSelection } from '../../context/SelectionContext.jsx'

/**
 * Label used across the Cards/Forms/Tables/Modals/Pages/Loaders demo sections so the client can
 * see which registry animation(s) drive a given effect, which UI components it suits, and mark
 * it as a favourite/selected animation — feeding the same shared selection state as the Gallery.
 */
export default function AnimationLabel({ animationId, animationIds, context }) {
  const ids = animationIds ?? (animationId ? [animationId] : [])
  const entries = ids.map((id) => ANIMATIONS_BY_ID[id]).filter(Boolean)
  const { isFavourite, toggleFavourite, registerUsage } = useSelection()
  const idsKey = entries.map((entry) => entry.id).join(',')

  useEffect(() => {
    if (!context) return
    entries.forEach((entry) => registerUsage(entry.id, context))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idsKey, context])

  if (entries.length === 0) return null

  return (
    <div className="anim-label">
      {entries.map((entry) => (
        <div className="anim-label__entry" key={entry.id}>
          <span className="anim-label__name">{entry.name}</span>
          <span className="anim-label__tags">
            {entry.suitableFor.map((tag) => (
              <span className="chip chip--muted chip--tiny" key={tag}>
                {tag}
              </span>
            ))}
          </span>
          <button
            type="button"
            className={`anim-label__fav ${isFavourite(entry.id) ? 'is-active' : ''}`}
            onClick={() => toggleFavourite(entry.id)}
            aria-pressed={isFavourite(entry.id)}
            title={isFavourite(entry.id) ? 'Remove from selected animations' : 'Mark as selected'}
          >
            {isFavourite(entry.id) ? '★' : '☆'}
          </button>
        </div>
      ))}
    </div>
  )
}
