import { useEffect, useState } from 'react'
import AnimationLabel from '../shared/AnimationLabel.jsx'

const MODAL_TYPES = [
  {
    id: 'fade-backdrop',
    label: 'Fade Backdrop',
    layout: 'center',
    panelClassName: '',
    animationIds: ['modal-fade-backdrop'],
  },
  {
    id: 'scale-popup',
    label: 'Scale Popup',
    layout: 'center',
    panelClassName: 'anim-modal-scale-in',
    animationIds: ['modal-scale-in'],
  },
  {
    id: 'drawer',
    label: 'Slide Drawer',
    layout: 'drawer',
    panelClassName: 'anim-drawer-slide-in',
    animationIds: ['drawer-slide-in'],
  },
  {
    id: 'bottom-sheet',
    label: 'Bottom Sheet',
    layout: 'sheet',
    panelClassName: 'anim-bottom-sheet-rise',
    animationIds: ['bottom-sheet-rise'],
  },
  {
    id: 'flip',
    label: 'Flip Modal',
    layout: 'center',
    panelClassName: 'anim-modal-flip-in',
    animationIds: ['modal-flip-in'],
  },
  {
    id: 'bounce',
    label: 'Bounce / Spring Popup',
    layout: 'center',
    panelClassName: 'anim-modal-bounce-in',
    animationIds: ['modal-bounce-in'],
  },
  {
    id: 'alert',
    label: 'Alert / Confirmation',
    layout: 'alert',
    panelClassName: 'anim-zoom-bounce-in',
    animationIds: ['zoom-bounce-in'],
  },
]

const TOAST_VISIBLE_MS = 2200

export default function Modals() {
  const [activeModalId, setActiveModalId] = useState(null)
  const [toastPhase, setToastPhase] = useState(null) // null | 'enter' | 'exit'

  const activeModal = MODAL_TYPES.find((modal) => modal.id === activeModalId)

  function closeModal() {
    setActiveModalId(null)
  }

  useEffect(() => {
    if (!activeModal) return undefined
    function handleKeyDown(event) {
      if (event.key === 'Escape') closeModal()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [activeModal])

  function showToast() {
    setToastPhase('enter')
    setTimeout(() => setToastPhase('exit'), TOAST_VISIBLE_MS)
    setTimeout(() => setToastPhase(null), TOAST_VISIBLE_MS + 350)
  }

  return (
    <section className="view">
      <header className="view__header">
        <h2>Modals</h2>
        <p>
          Trigger buttons open live demo modals covering backdrop, popup, drawer, sheet, flip,
          bounce, alert, and toast entry/exit animations from the registry.
        </p>
      </header>

      <section className="demo-block">
        <div className="demo-block__head">
          <h3>Modal &amp; popup styles</h3>
        </div>
        <div className="demo-controls">
          <div className="demo-controls__group">
            {MODAL_TYPES.map((modal) => (
              <button
                key={modal.id}
                type="button"
                className="demo-btn"
                onClick={() => setActiveModalId(modal.id)}
              >
                {modal.label}
              </button>
            ))}
          </div>
          <button type="button" className="demo-btn demo-btn--primary" onClick={showToast}>
            Show Toast
          </button>
        </div>
        {activeModal && (
          <AnimationLabel animationIds={activeModal.animationIds} context="Modals → Modal & popup styles" />
        )}
        <AnimationLabel
          animationIds={['toast-slide-in', 'slide-out-right', 'toast-progress-dismiss']}
          context="Modals → Toast notification"
        />
      </section>

      {activeModal && (
        <div className="demo-modal-backdrop anim-modal-fade-backdrop" onClick={closeModal}>
          <div
            className={`demo-modal-panel demo-modal-panel--${activeModal.layout} ${activeModal.panelClassName}`}
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="demo-modal-title"
          >
            {activeModal.layout === 'alert' ? (
              <>
                <h4 id="demo-modal-title">Delete this item?</h4>
                <p>This action can’t be undone. The item will be permanently removed.</p>
                <div className="demo-modal__actions">
                  <button type="button" className="demo-btn" onClick={closeModal}>
                    Cancel
                  </button>
                  <button type="button" className="demo-btn demo-btn--danger" onClick={closeModal}>
                    Delete
                  </button>
                </div>
              </>
            ) : (
              <>
                <h4 id="demo-modal-title">{activeModal.label}</h4>
                <p>
                  This panel demonstrates the “{activeModal.label}” entrance animation applied to a
                  real modal/drawer surface.
                </p>
                <div className="demo-modal__actions">
                  <button type="button" className="demo-btn demo-btn--primary" onClick={closeModal}>
                    Close
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {toastPhase && (
        <div
          className={`demo-toast ${toastPhase === 'enter' ? 'anim-toast-slide-in' : 'anim-slide-out-right'}`}
          role="status"
          aria-live="polite"
        >
          <span>Changes saved successfully.</span>
          {toastPhase === 'enter' && (
            <span
              className="demo-toast__progress anim-toast-progress-dismiss"
              style={{ '--anim-duration': `${TOAST_VISIBLE_MS}ms` }}
            />
          )}
        </div>
      )}
    </section>
  )
}
