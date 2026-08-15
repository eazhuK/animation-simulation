import { useMemo, useState } from 'react'
import { ANIMATIONS_BY_ID } from '../../data/animations.js'
import { CATEGORY_MAP } from '../../data/categories.js'
import { useSelection } from '../../context/SelectionContext.jsx'
import AnimationPreview from '../shared/AnimationPreview.jsx'

export default function Favourites() {
  const { favourites, getUsage, toggleFavourite } = useSelection()
  const [copyState, setCopyState] = useState('idle')

  const selected = useMemo(
    () =>
      Array.from(favourites)
        .map((id) => ANIMATIONS_BY_ID[id])
        .filter(Boolean)
        .sort((a, b) => a.name.localeCompare(b.name)),
    [favourites]
  )

  const summaryText = useMemo(() => {
    const lines = []
    selected.forEach((animation) => {
      const contexts = getUsage(animation.id)
      if (contexts.length === 0) {
        lines.push(`${animation.name} — ${CATEGORY_MAP[animation.category]?.label ?? animation.category}`)
      } else {
        contexts.forEach((context) => lines.push(`${context}: ${animation.name}`))
      }
    })
    return lines.join('\n')
  }, [selected, getUsage])

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(summaryText)
      setCopyState('copied')
    } catch {
      setCopyState('failed')
    } finally {
      setTimeout(() => setCopyState('idle'), 1800)
    }
  }

  return (
    <section className="view">
      <header className="view__header">
        <h2>Selected Animations</h2>
        <p>
          {selected.length === 0
            ? 'Nothing marked yet — favourite any animation across the catalogue (Gallery or any component demo) and it will show up here, ready to hand off to the dev team.'
            : `${selected.length} animation${selected.length === 1 ? '' : 's'} selected — replay, tweak, and share the summary below with the dev team.`}
        </p>
      </header>

      {selected.length > 0 && (
        <section className="demo-block">
          <div className="demo-block__head">
            <h3>Shareable summary</h3>
          </div>
          <div className="demo-controls">
            <button type="button" className="demo-btn demo-btn--primary" onClick={handleCopy}>
              {copyState === 'copied' ? '✓ Copied' : copyState === 'failed' ? 'Copy failed' : 'Copy summary'}
            </button>
            <button type="button" className="demo-btn" onClick={() => window.print()}>
              Print / save as PDF
            </button>
          </div>
          <pre className="favourites-summary">{summaryText}</pre>
        </section>
      )}

      <div className="favourites-grid">
        {selected.map((animation) => (
          <article className="favourites-item" key={animation.id}>
            <div className="favourites-item__meta">
              <span className="chip chip--muted">
                {CATEGORY_MAP[animation.category]?.label ?? animation.category}
              </span>
              <ul className="favourites-item__usage">
                {getUsage(animation.id).length > 0 ? (
                  getUsage(animation.id).map((context) => <li key={context}>{context}</li>)
                ) : (
                  <li>Viewed in Gallery</li>
                )}
              </ul>
              <button
                type="button"
                className="demo-btn demo-btn--sm"
                onClick={() => toggleFavourite(animation.id)}
              >
                Remove
              </button>
            </div>
            <AnimationPreview animation={animation} />
          </article>
        ))}
      </div>
    </section>
  )
}
