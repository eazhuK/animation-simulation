import { useState } from 'react'
import AnimationLabel from '../shared/AnimationLabel.jsx'

const PAGE_TRANSITIONS = [
  { id: 'fade', label: 'Fade', cssClassName: 'anim-page-fade', animationId: 'page-fade' },
  { id: 'slide', label: 'Slide', cssClassName: 'anim-page-slide', animationId: 'page-slide' },
  { id: 'zoom', label: 'Zoom', cssClassName: 'anim-page-zoom', animationId: 'page-zoom' },
  { id: 'curtain', label: 'Curtain', cssClassName: 'anim-page-curtain', animationId: 'page-curtain' },
]

const MOCK_PAGES = [
  { title: 'Dashboard Overview', body: 'A summary of activity across every workspace project.' },
  { title: 'Team Directory', body: 'Browse members, roles, and availability across the org.' },
]

const CONTENT_SECTIONS = ['Header', 'Sidebar', 'Main content', 'Footer']

const DASHBOARD_WIDGETS = [
  { label: 'Revenue', value: '$48.2k' },
  { label: 'Active Users', value: '2,341' },
  { label: 'Sessions', value: '9,807' },
  { label: 'Conversion', value: '4.6%' },
]

export default function Pages() {
  const [transition, setTransition] = useState(PAGE_TRANSITIONS[0])
  const [pageIndex, setPageIndex] = useState(0)
  const [switchKey, setSwitchKey] = useState(0)

  const [contentKey, setContentKey] = useState(0)
  const [widgetKey, setWidgetKey] = useState(0)
  const [heroKey, setHeroKey] = useState(0)

  const [contentLoaded, setContentLoaded] = useState(true)
  const [skeletonKey, setSkeletonKey] = useState(0)

  function switchPage(style) {
    setTransition(style)
    setPageIndex((index) => (index + 1) % MOCK_PAGES.length)
    setSwitchKey((key) => key + 1)
  }

  function reloadWithSkeleton() {
    setContentLoaded(false)
    setTimeout(() => {
      setContentLoaded(true)
      setSkeletonKey((key) => key + 1)
    }, 900)
  }

  const page = MOCK_PAGES[pageIndex]

  return (
    <section className="view">
      <header className="view__header">
        <h2>Pages</h2>
        <p>
          Mock page-level transitions, sequenced load-ins, and a hero entrance — switch between
          two sample pages to see each effect play.
        </p>
      </header>

      <section className="demo-block">
        <div className="demo-block__head">
          <h3>Page transition style</h3>
          <AnimationLabel animationId={transition.animationId} context="Pages → Page transition style" />
        </div>
        <div className="demo-controls">
          <div className="demo-controls__group">
            {PAGE_TRANSITIONS.map((style) => (
              <button
                key={style.id}
                type="button"
                className={`demo-btn ${transition.id === style.id ? 'is-active' : ''}`}
                onClick={() => switchPage(style)}
              >
                {style.label}
              </button>
            ))}
          </div>
        </div>
        <div className="demo-page-frame">
          <div className={`demo-page-frame__content ${transition.cssClassName}`} key={switchKey}>
            <h4>{page.title}</h4>
            <p>{page.body}</p>
          </div>
        </div>
      </section>

      <section className="demo-block">
        <div className="demo-block__head">
          <h3>Content stagger load</h3>
          <AnimationLabel animationId="page-stagger-load" context="Pages → Content stagger load" />
        </div>
        <div className="demo-controls">
          <button type="button" className="demo-btn demo-btn--primary" onClick={() => setContentKey((k) => k + 1)}>
            ↻ Replay load
          </button>
        </div>
        <div className="demo-page-mock" key={contentKey}>
          {CONTENT_SECTIONS.map((section, index) => (
            <div
              key={section}
              className="demo-page-mock__section anim-page-stagger-load"
              style={{ '--anim-delay': `${index * 110}ms` }}
            >
              {section}
            </div>
          ))}
        </div>
      </section>

      <section className="demo-block">
        <div className="demo-block__head">
          <h3>Dashboard widgets sequential load</h3>
          <AnimationLabel animationId="stagger-card-grid" context="Pages → Dashboard widgets sequential load" />
        </div>
        <div className="demo-controls">
          <button type="button" className="demo-btn demo-btn--primary" onClick={() => setWidgetKey((k) => k + 1)}>
            ↻ Replay load
          </button>
        </div>
        <div className="demo-widget-grid" key={widgetKey}>
          {DASHBOARD_WIDGETS.map((widget, index) => (
            <div
              key={widget.label}
              className="demo-widget anim-stagger-card-grid"
              style={{ '--anim-delay': `${index * 110}ms` }}
            >
              <span className="demo-widget__label">{widget.label}</span>
              <span className="demo-widget__value">{widget.value}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="demo-block">
        <div className="demo-block__head">
          <h3>Hero section entrance</h3>
          <AnimationLabel animationId="hero-entrance" context="Pages → Hero section entrance" />
        </div>
        <div className="demo-controls">
          <button type="button" className="demo-btn demo-btn--primary" onClick={() => setHeroKey((k) => k + 1)}>
            ↻ Replay hero
          </button>
        </div>
        <div className="demo-hero" key={heroKey}>
          <span className="demo-hero__eyebrow anim-hero-entrance chip" style={{ '--anim-delay': '0ms' }}>
            New release
          </span>
          <h2 className="demo-hero__title anim-hero-entrance" style={{ '--anim-delay': '120ms' }}>
            Ship polished UI faster
          </h2>
          <p className="demo-hero__subtitle anim-hero-entrance" style={{ '--anim-delay': '240ms' }}>
            A living catalogue of ready-to-use animation patterns for every screen.
          </p>
          <button type="button" className="demo-btn demo-btn--primary demo-hero__cta anim-hero-entrance" style={{ '--anim-delay': '360ms' }}>
            Get started
          </button>
        </div>
      </section>

      <section className="demo-block">
        <div className="demo-block__head">
          <h3>Skeleton-to-content transition</h3>
          <AnimationLabel
            animationIds={['skeleton-shimmer', 'skeleton-to-content']}
            context="Pages → Skeleton-to-content transition"
          />
        </div>
        <div className="demo-controls">
          <button type="button" className="demo-btn demo-btn--primary" onClick={reloadWithSkeleton} disabled={!contentLoaded}>
            ↻ Reload content
          </button>
        </div>
        <div className="demo-skeleton-frame">
          {contentLoaded ? (
            <div className="demo-skeleton-frame__content anim-skeleton-to-content" key={skeletonKey}>
              <h4>Account summary</h4>
              <p>Everything is up to date — no action needed on your account right now.</p>
            </div>
          ) : (
            <div className="demo-skeleton-frame__content">
              <span className="demo-skeleton-block anim-skeleton-shimmer" style={{ width: '55%', height: 18 }} />
              <span className="demo-skeleton-block anim-skeleton-shimmer" style={{ width: '90%' }} />
              <span className="demo-skeleton-block anim-skeleton-shimmer" style={{ width: '75%' }} />
            </div>
          )}
        </div>
      </section>
    </section>
  )
}
