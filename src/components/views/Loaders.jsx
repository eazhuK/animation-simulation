import { useState } from 'react'
import AnimationLabel from '../shared/AnimationLabel.jsx'

const SPINNERS = [
  { id: 'spinner-circle', label: 'Circle spinner', animationId: 'spinner-circle', cssClassName: 'anim-spinner-circle' },
  { id: 'spinner-dual-ring', label: 'Dual ring spinner', animationId: 'spinner-dual-ring', cssClassName: 'anim-spinner-dual-ring' },
]

const SKELETON_ROWS = 3

export default function Loaders() {
  const [loopKey, setLoopKey] = useState(0)
  const [buttonState, setButtonState] = useState('idle')
  const [showFullPage, setShowFullPage] = useState(false)

  function triggerButtonLoading() {
    if (buttonState !== 'idle') return
    setButtonState('loading')
    setTimeout(() => setButtonState('idle'), 1400)
  }

  function toggleFullPage() {
    setShowFullPage(true)
    setTimeout(() => setShowFullPage(false), 2200)
  }

  return (
    <section className="view">
      <header className="view__header">
        <h2>Loading Effects</h2>
        <p>
          Spinners, pulse/dot loaders, skeleton &amp; shimmer placeholders, progress indicators,
          and loading states for buttons and full pages.
        </p>
      </header>

      <section className="demo-block">
        <div className="demo-block__head">
          <h3>Spinner &amp; dot loading</h3>
          <AnimationLabel
            animationIds={['spinner-circle', 'spinner-dual-ring', 'spinner-dots']}
            context="Loaders → Spinner & dot loading"
          />
        </div>
        <div className="demo-controls">
          <button type="button" className="demo-btn demo-btn--primary" onClick={() => setLoopKey((k) => k + 1)}>
            ↻ Resync
          </button>
        </div>
        <div className="demo-loader-grid" key={loopKey}>
          {SPINNERS.map((spinner) => (
            <div className="demo-loader-tile" key={spinner.id}>
              <span className={`demo-loader-shape ${spinner.cssClassName}`} />
              <span className="demo-loader-tile__label">{spinner.label}</span>
            </div>
          ))}
          <div className="demo-loader-tile">
            <div className="demo-dot-row">
              {[0, 1, 2].map((index) => (
                <span
                  key={index}
                  className="demo-dot anim-spinner-dots"
                  style={{ '--anim-delay': `${index * 160}ms` }}
                />
              ))}
            </div>
            <span className="demo-loader-tile__label">Dot loading</span>
          </div>
        </div>
      </section>

      <section className="demo-block">
        <div className="demo-block__head">
          <h3>Pulse loading</h3>
          <AnimationLabel animationIds={['pulse-dot', 'pulse-ring']} context="Loaders → Pulse loading" />
        </div>
        <div className="demo-loader-grid" key={`pulse-${loopKey}`}>
          <div className="demo-loader-tile">
            <span className="demo-pulse-dot-shape anim-pulse-dot" />
            <span className="demo-loader-tile__label">Pulse dot</span>
          </div>
          <div className="demo-loader-tile">
            <div className="demo-pulse-wrap">
              <span className="demo-pulse-ring-shape anim-pulse-ring" />
              <span className="demo-pulse-dot-shape" />
            </div>
            <span className="demo-loader-tile__label">Pulse ring</span>
          </div>
        </div>
      </section>

      <section className="demo-block">
        <div className="demo-block__head">
          <h3>Skeleton &amp; shimmer loaders</h3>
          <AnimationLabel animationId="skeleton-shimmer" context="Loaders → Skeleton & shimmer loaders" />
        </div>
        <p className="demo-block__note">
          The same shimmer sweep doubles as both the skeleton placeholder technique and the
          shimmer loading effect requested for this section.
        </p>
        <div className="demo-skeleton-list">
          {Array.from({ length: SKELETON_ROWS }).map((_, index) => (
            <div className="demo-skeleton-list__row" key={index}>
              <span className="demo-skeleton-block demo-skeleton-block--avatar anim-skeleton-shimmer" />
              <div className="demo-skeleton-list__lines">
                <span className="demo-skeleton-block anim-skeleton-shimmer" style={{ width: '60%' }} />
                <span className="demo-skeleton-block anim-skeleton-shimmer" style={{ width: '90%' }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="demo-block">
        <div className="demo-block__head">
          <h3>Progress indicators</h3>
          <AnimationLabel
            animationIds={['progress-bar-indeterminate', 'circular-progress-spin']}
            context="Loaders → Progress indicators"
          />
        </div>
        <div className="demo-progress-row">
          <div>
            <span className="demo-loader-tile__label">Progress bar</span>
            <div className="demo-progress-track">
              <span className="anim-progress-bar-indeterminate" />
            </div>
          </div>
          <div className="demo-loader-tile">
            <span className="demo-loader-shape anim-circular-progress-spin" />
            <span className="demo-loader-tile__label">Circular progress</span>
          </div>
        </div>
      </section>

      <section className="demo-block">
        <div className="demo-block__head">
          <h3>Button loading state</h3>
          <AnimationLabel animationId="button-loading-spin" context="Loaders → Button loading state" />
        </div>
        <div className="demo-controls">
          <button
            type="button"
            className="demo-submit-btn"
            onClick={triggerButtonLoading}
            disabled={buttonState !== 'idle'}
          >
            {buttonState === 'loading' && <span className="demo-spinner anim-button-loading-spin" />}
            {buttonState === 'loading' ? 'Saving…' : 'Save changes'}
          </button>
        </div>
      </section>

      <section className="demo-block">
        <div className="demo-block__head">
          <h3>Full-page loading screen</h3>
          <AnimationLabel
            animationIds={['spinner-dual-ring', 'progress-bar-indeterminate']}
            context="Loaders → Full-page loading screen"
          />
        </div>
        <p className="demo-block__note">
          Shown inside a contained preview frame — not an actual overlay across the whole app.
        </p>
        <div className="demo-controls">
          <button type="button" className="demo-btn demo-btn--primary" onClick={toggleFullPage} disabled={showFullPage}>
            Show loading screen
          </button>
        </div>
        <div className="demo-loading-screen-frame">
          {showFullPage && (
            <div className="demo-loading-screen">
              <span className="demo-loader-shape demo-loader-shape--lg anim-spinner-dual-ring" />
              <span className="demo-loading-screen__text">Loading your workspace…</span>
              <div className="demo-progress-track demo-loading-screen__progress">
                <span className="anim-progress-bar-indeterminate" />
              </div>
            </div>
          )}
        </div>
      </section>
    </section>
  )
}
