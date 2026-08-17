import { useRef, useState } from 'react'
import AnimationLabel from '../shared/AnimationLabel.jsx'
import EffectShowcasePanel from '../shared/EffectShowcasePanel.jsx'

const LOADER_SECTIONS = [
  { id: 'spinner-dots', label: 'Spinner & dot loading' },
  { id: 'pulse-loading', label: 'Pulse loading' },
  { id: 'skeleton-shimmer', label: 'Skeleton & shimmer loaders' },
  { id: 'progress-indicators', label: 'Progress indicators' },
  { id: 'button-loading', label: 'Button loading state' },
  { id: 'full-page-loading', label: 'Full-page loading screen' },
  { id: 'blur-pulse', label: 'Blur pulse', animationId: 'blur-pulse', title: 'Blur-pulse loading state', description: 'A soft focus pulse communicates background processing.' },
  { id: 'bounce-activity', label: 'Bounce activity', animationId: 'bounce-loop', title: 'Bouncing activity markers', description: 'A repeating vertical cue shows lightweight activity.' },
  { id: 'stagger-resolution', label: 'Staggered resolution', animationId: 'stagger-fade-up', title: 'Staggered loader resolution', description: 'Placeholder items resolve into content sequentially.' },
  { id: 'scale-resolution', label: 'Scale resolution', animationId: 'stagger-scale-in', title: 'Scaling loader resolution', description: 'Loaded items scale into their final positions in sequence.' },
]

const SPINNERS = [
  { id: 'spinner-circle', label: 'Circle spinner', animationId: 'spinner-circle', cssClassName: 'anim-spinner-circle' },
  { id: 'spinner-dual-ring', label: 'Dual ring spinner', animationId: 'spinner-dual-ring', cssClassName: 'anim-spinner-dual-ring' },
]

const SKELETON_ROWS = 3

export default function Loaders() {
  const [activeLoaderSection, setActiveLoaderSection] = useState(LOADER_SECTIONS[0].id)
  const tabRefs = useRef([])
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

  function selectTab(index) {
    const nextSection = LOADER_SECTIONS[index]
    if (!nextSection) return

    setActiveLoaderSection(nextSection.id)
    tabRefs.current[index]?.focus()
  }

  function handleTabKeyDown(event, index) {
    let nextIndex

    if (event.key === 'ArrowRight') {
      nextIndex = (index + 1) % LOADER_SECTIONS.length
    } else if (event.key === 'ArrowLeft') {
      nextIndex = (index - 1 + LOADER_SECTIONS.length) % LOADER_SECTIONS.length
    } else if (event.key === 'Home') {
      nextIndex = 0
    } else if (event.key === 'End') {
      nextIndex = LOADER_SECTIONS.length - 1
    } else {
      return
    }

    event.preventDefault()
    event.stopPropagation()
    selectTab(nextIndex)
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

      <nav className="gallery-tabs" aria-label="Loading effect sections">
        <div className="gallery-tabs__list" role="tablist" aria-orientation="horizontal">
          {LOADER_SECTIONS.map((section, index) => {
            const isActive = section.id === activeLoaderSection

            return (
              <button
                className={`gallery-tabs__tab${isActive ? ' is-active' : ''}`}
                id={`loaders-tab-${section.id}`}
                key={section.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`loaders-panel-${section.id}`}
                tabIndex={isActive ? 0 : -1}
                ref={(element) => {
                  tabRefs.current[index] = element
                }}
                onClick={() => setActiveLoaderSection(section.id)}
                onKeyDown={(event) => handleTabKeyDown(event, index)}
              >
                {section.label}
              </button>
            )
          })}
        </div>
      </nav>

      <section
        className="demo-block"
        id="loaders-panel-spinner-dots"
        role="tabpanel"
        aria-labelledby="loaders-tab-spinner-dots"
        tabIndex={0}
        hidden={activeLoaderSection !== 'spinner-dots'}
      >
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

      <section
        className="demo-block"
        id="loaders-panel-pulse-loading"
        role="tabpanel"
        aria-labelledby="loaders-tab-pulse-loading"
        tabIndex={0}
        hidden={activeLoaderSection !== 'pulse-loading'}
      >
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

      <section
        className="demo-block"
        id="loaders-panel-skeleton-shimmer"
        role="tabpanel"
        aria-labelledby="loaders-tab-skeleton-shimmer"
        tabIndex={0}
        hidden={activeLoaderSection !== 'skeleton-shimmer'}
      >
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

      <section
        className="demo-block"
        id="loaders-panel-progress-indicators"
        role="tabpanel"
        aria-labelledby="loaders-tab-progress-indicators"
        tabIndex={0}
        hidden={activeLoaderSection !== 'progress-indicators'}
      >
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

      <section
        className="demo-block"
        id="loaders-panel-button-loading"
        role="tabpanel"
        aria-labelledby="loaders-tab-button-loading"
        tabIndex={0}
        hidden={activeLoaderSection !== 'button-loading'}
      >
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

      <section
        className="demo-block"
        id="loaders-panel-full-page-loading"
        role="tabpanel"
        aria-labelledby="loaders-tab-full-page-loading"
        tabIndex={0}
        hidden={activeLoaderSection !== 'full-page-loading'}
      >
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

      {LOADER_SECTIONS.slice(6).map((section) => (
        <EffectShowcasePanel
          active={activeLoaderSection === section.id}
          animationId={section.animationId}
          context={`Loading Effects → ${section.title}`}
          description={section.description}
          id={section.id}
          idPrefix="loaders"
          key={section.id}
          kind="loader"
          title={section.title}
        />
      ))}
    </section>
  )
}
