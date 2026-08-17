import { useMemo } from 'react'
import { ANIMATIONS, ANIMATIONS_BY_ID } from '../../data/animations.js'
import { CATEGORIES, CATEGORY_MAP } from '../../data/categories.js'
import { useSelection } from '../../context/SelectionContext.jsx'

function formatUpdatedAt(value) {
  if (!value) return 'Imported selection'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return 'Recently updated'
  return new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(date)
}

export default function Dashboard({ onNavigate }) {
  const { workspace, favourites, drafts } = useSelection()

  const categoryCounts = useMemo(
    () =>
      CATEGORIES.map((category) => ({
        ...category,
        count: Array.from(favourites).filter(
          (id) => ANIMATIONS_BY_ID[id]?.category === category.id
        ).length,
      })).filter((category) => category.count > 0),
    [favourites]
  )

  const recentItems = useMemo(
    () =>
      Object.entries(workspace)
        .map(([id, item]) => ({ animation: ANIMATIONS_BY_ID[id], ...item }))
        .filter((item) => item.animation)
        .sort((a, b) => (b.updatedAt ?? '').localeCompare(a.updatedAt ?? ''))
        .slice(0, 6),
    [workspace]
  )

  return (
    <section className="view workspace-view">
      <header className="view__header workspace-hero">
        <div>
          <span className="workspace-eyebrow">Frontend workspace</span>
          <h2>Selection dashboard</h2>
          <p>
            Save final choices, keep unfinished ideas as drafts, and return to them after a
            refresh. Everything stays in this browser.
          </p>
        </div>
        <button
          type="button"
          className="demo-btn demo-btn--primary"
          onClick={() => onNavigate('gallery')}
        >
          Browse catalogue
        </button>
      </header>

      <div className="workspace-stats" aria-label="Workspace summary">
        <button type="button" className="workspace-stat" onClick={() => onNavigate('favourites')}>
          <span className="workspace-stat__value">{favourites.size}</span>
          <span className="workspace-stat__label">Saved animations</span>
          <span className="workspace-stat__hint">Ready for handoff</span>
        </button>
        <button type="button" className="workspace-stat" onClick={() => onNavigate('drafts')}>
          <span className="workspace-stat__value">{drafts.size}</span>
          <span className="workspace-stat__label">Drafts</span>
          <span className="workspace-stat__hint">Still being tuned</span>
        </button>
        <button
          type="button"
          className="workspace-stat"
          onClick={() => onNavigate('saved-categories')}
        >
          <span className="workspace-stat__value">{categoryCounts.length}</span>
          <span className="workspace-stat__label">Saved categories</span>
          <span className="workspace-stat__hint">Grouped automatically</span>
        </button>
        <div className="workspace-stat workspace-stat--static">
          <span className="workspace-stat__value">{ANIMATIONS.length}</span>
          <span className="workspace-stat__label">Catalogue options</span>
          <span className="workspace-stat__hint">Available to explore</span>
        </div>
      </div>

      <div className="workspace-dashboard-grid">
        <section className="card workspace-panel">
          <div className="workspace-panel__head">
            <div>
              <h3>Saved by category</h3>
              <p>Your final choices are grouped as you save them.</p>
            </div>
            {categoryCounts.length > 0 && (
              <button
                type="button"
                className="workspace-link"
                onClick={() => onNavigate('saved-categories')}
              >
                View all
              </button>
            )}
          </div>
          {categoryCounts.length === 0 ? (
            <div className="workspace-empty workspace-empty--compact">
              Save an animation to create your first category.
            </div>
          ) : (
            <div className="workspace-category-bars">
              {categoryCounts.slice(0, 7).map((category) => (
                <div className="workspace-category-bar" key={category.id}>
                  <span>{category.label}</span>
                  <span className="workspace-category-bar__track" aria-hidden="true">
                    <span
                      style={{
                        width: `${Math.max(12, (category.count / favourites.size) * 100)}%`,
                      }}
                    />
                  </span>
                  <strong>{category.count}</strong>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="card workspace-panel">
          <div className="workspace-panel__head">
            <div>
              <h3>Recent activity</h3>
              <p>Your latest saves and drafts on this device.</p>
            </div>
          </div>
          {recentItems.length === 0 ? (
            <div className="workspace-empty workspace-empty--compact">
              No activity yet. Start in the catalogue and save an option or draft.
            </div>
          ) : (
            <ul className="workspace-activity">
              {recentItems.map((item) => (
                <li key={item.animation.id}>
                  <span className={`workspace-status workspace-status--${item.status}`}>
                    {item.status}
                  </span>
                  <span className="workspace-activity__copy">
                    <strong>{item.animation.name}</strong>
                    <small>{CATEGORY_MAP[item.animation.category]?.label}</small>
                  </span>
                  <time>{formatUpdatedAt(item.updatedAt)}</time>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </section>
  )
}
