import { useMemo } from 'react'
import { ANIMATIONS_BY_ID } from '../../data/animations.js'
import { useSelection } from '../../context/SelectionContext.jsx'
import AnimationPreview from '../shared/AnimationPreview.jsx'

export default function Drafts({ onNavigate }) {
  const { drafts } = useSelection()

  const draftAnimations = useMemo(
    () =>
      Array.from(drafts)
        .map((id) => ANIMATIONS_BY_ID[id])
        .filter(Boolean)
        .sort((a, b) => a.name.localeCompare(b.name)),
    [drafts]
  )

  return (
    <section className="view workspace-view">
      <header className="view__header workspace-hero">
        <div>
          <span className="workspace-eyebrow">Draft mode</span>
          <h2>Draft animations</h2>
          <p>
            Tune timing here without adding an option to the final saved list. Choose Save when
            a draft is ready for handoff.
          </p>
        </div>
        <button type="button" className="demo-btn" onClick={() => onNavigate('gallery')}>
          Browse catalogue
        </button>
      </header>

      {draftAnimations.length === 0 ? (
        <div className="card workspace-empty">
          <strong>No drafts yet</strong>
          <span>Use “Save draft” on any animation to keep its current timing controls.</span>
          <button
            type="button"
            className="demo-btn demo-btn--primary"
            onClick={() => onNavigate('gallery')}
          >
            Create a draft
          </button>
        </div>
      ) : (
        <div className="workspace-preview-grid">
          {draftAnimations.map((animation) => (
            <AnimationPreview
              animation={animation}
              context="Draft mode → Saved draft"
              key={animation.id}
            />
          ))}
        </div>
      )}
    </section>
  )
}
