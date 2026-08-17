import { useMemo } from 'react'
import { ANIMATIONS_BY_ID } from '../../data/animations.js'
import { CATEGORIES } from '../../data/categories.js'
import { useSelection } from '../../context/SelectionContext.jsx'

export default function SavedCategories({ onNavigate }) {
  const { favourites, getSelection, saveDraft, removeAnimation } = useSelection()

  const groups = useMemo(
    () =>
      CATEGORIES.map((category) => ({
        ...category,
        animations: Array.from(favourites)
          .map((id) => ANIMATIONS_BY_ID[id])
          .filter((animation) => animation?.category === category.id)
          .sort((a, b) => a.name.localeCompare(b.name)),
      })).filter((category) => category.animations.length > 0),
    [favourites]
  )

  return (
    <section className="view workspace-view">
      <header className="view__header workspace-hero">
        <div>
          <span className="workspace-eyebrow">Saved library</span>
          <h2>Saved categories</h2>
          <p>
            Final selections are grouped automatically by animation category and stored in this
            browser.
          </p>
        </div>
        <button type="button" className="demo-btn" onClick={() => onNavigate('gallery')}>
          Add from gallery
        </button>
      </header>

      {groups.length === 0 ? (
        <div className="card workspace-empty">
          <strong>No saved categories yet</strong>
          <span>Save any animation from the catalogue to build this library.</span>
          <button
            type="button"
            className="demo-btn demo-btn--primary"
            onClick={() => onNavigate('gallery')}
          >
            Browse animations
          </button>
        </div>
      ) : (
        <div className="workspace-category-grid">
          {groups.map((group) => (
            <section className="card workspace-category-card" key={group.id}>
              <header>
                <div>
                  <span className="workspace-category-card__count">
                    {group.animations.length} saved
                  </span>
                  <h3>{group.label}</h3>
                </div>
              </header>
              <ul>
                {group.animations.map((animation) => {
                  const selection = getSelection(animation.id)
                  return (
                    <li key={animation.id}>
                      <span className="workspace-category-card__item-copy">
                        <strong>{animation.name}</strong>
                        <small>
                          {selection?.settings?.durationMs ?? 500}ms · {selection?.settings?.speed ?? 1}×
                        </small>
                      </span>
                      <span className="workspace-row-actions">
                        <button
                          type="button"
                          onClick={() => saveDraft(animation.id, selection?.settings)}
                        >
                          Move to draft
                        </button>
                        <button type="button" onClick={() => removeAnimation(animation.id)}>
                          Remove
                        </button>
                      </span>
                    </li>
                  )
                })}
              </ul>
            </section>
          ))}
        </div>
      )}
    </section>
  )
}
