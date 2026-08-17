import { useRef, useState } from 'react'
import AnimationLabel from '../shared/AnimationLabel.jsx'
import EffectShowcasePanel from '../shared/EffectShowcasePanel.jsx'

const DATA_SECTIONS = [
  { id: 'kpi-counters', label: 'Animated KPI counters' },
  { id: 'bar-growth', label: 'Bar chart growth' },
  { id: 'line-drawing', label: 'Line chart drawing' },
  { id: 'donut-progress', label: 'Donut progress' },
  { id: 'live-updates', label: 'Live data updates' },
  { id: 'dashboard-filtering', label: 'Dashboard filtering' },
  { id: 'widget-cascade', label: 'Widget cascade', animationId: 'stagger-card-grid', title: 'Dashboard widget cascade', description: 'Metric tiles settle into the dashboard in sequence.' },
  { id: 'fresh-record', label: 'Fresh-record cue', animationId: 'row-highlight-new', title: 'Fresh data highlight', description: 'A newly received record receives a brief visual cue.' },
  { id: 'chart-skeleton', label: 'Chart skeleton', animationId: 'skeleton-shimmer', title: 'Chart skeleton loading', description: 'Chart-shaped placeholders preserve dashboard structure.' },
  { id: 'metric-focus', label: 'Metric focus', animationId: 'focus-in', title: 'Focused metric reveal', description: 'A selected metric resolves from soft focus into clarity.' },
]

const KPI_CARDS = [
  { label: 'Monthly revenue', steps: ['£0', '£12k', '£26k', '£39k', '£48k'], change: '+18.4%' },
  { label: 'Active customers', steps: ['0', '620', '1,240', '1,860', '2,481'], change: '+12.1%' },
  { label: 'Conversion rate', steps: ['0%', '1.2%', '2.5%', '3.7%', '4.8%'], change: '+0.7%' },
]

const BAR_DATA = [
  { label: 'Mon', value: 42 },
  { label: 'Tue', value: 68 },
  { label: 'Wed', value: 54 },
  { label: 'Thu', value: 82 },
  { label: 'Fri', value: 73 },
  { label: 'Sat', value: 91 },
  { label: 'Sun', value: 64 },
]

const LIVE_ROWS = [
  { source: 'Enterprise plan', region: 'London', value: '+£8,400', status: 'Won' },
  { source: 'Growth workspace', region: 'Berlin', value: '+£3,250', status: 'Upgraded' },
  { source: 'Team subscription', region: 'Madrid', value: '+£1,890', status: 'New' },
  { source: 'Annual renewal', region: 'Dublin', value: '+£5,600', status: 'Renewed' },
]

const FILTER_CARDS = [
  { title: 'Revenue', value: '£48.2k', category: 'Revenue', note: 'Monthly recurring' },
  { title: 'Pipeline', value: '£126k', category: 'Revenue', note: 'Open opportunities' },
  { title: 'Engagement', value: '84%', category: 'Engagement', note: 'Across campaigns' },
  { title: 'Retention', value: '92%', category: 'Engagement', note: 'Rolling 30 days' },
]

const FILTERS = ['All', 'Revenue', 'Engagement']

export default function DataVisualizationMotion() {
  const [activeSection, setActiveSection] = useState(DATA_SECTIONS[0].id)
  const [kpiKey, setKpiKey] = useState(0)
  const [barKey, setBarKey] = useState(0)
  const [lineKey, setLineKey] = useState(0)
  const [donutKey, setDonutKey] = useState(0)
  const [liveKey, setLiveKey] = useState(0)
  const [activeFilter, setActiveFilter] = useState('All')
  const tabRefs = useRef([])

  function selectTab(index) {
    const nextSection = DATA_SECTIONS[index]
    if (!nextSection) return

    setActiveSection(nextSection.id)
    tabRefs.current[index]?.focus()
  }

  function handleTabKeyDown(event, index) {
    let nextIndex

    if (event.key === 'ArrowRight') {
      nextIndex = (index + 1) % DATA_SECTIONS.length
    } else if (event.key === 'ArrowLeft') {
      nextIndex = (index - 1 + DATA_SECTIONS.length) % DATA_SECTIONS.length
    } else if (event.key === 'Home') {
      nextIndex = 0
    } else if (event.key === 'End') {
      nextIndex = DATA_SECTIONS.length - 1
    } else {
      return
    }

    event.preventDefault()
    event.stopPropagation()
    selectTab(nextIndex)
  }

  const filteredCards =
    activeFilter === 'All'
      ? FILTER_CARDS
      : FILTER_CARDS.filter((card) => card.category === activeFilter)

  return (
    <section className="view data-motion-view">
      <header className="view__header">
        <h2>Data Visualization Motion</h2>
        <p>
          Client-ready dashboard motion for metrics, charts, live updates, and filtering—presented
          as compact examples without a charting dependency.
        </p>
      </header>

      <nav className="gallery-tabs" aria-label="Data visualization sections">
        <div className="gallery-tabs__list" role="tablist" aria-orientation="horizontal">
          {DATA_SECTIONS.map((section, index) => {
            const isActive = section.id === activeSection

            return (
              <button
                className={`gallery-tabs__tab${isActive ? ' is-active' : ''}`}
                id={`data-tab-${section.id}`}
                key={section.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`data-panel-${section.id}`}
                tabIndex={isActive ? 0 : -1}
                ref={(element) => {
                  tabRefs.current[index] = element
                }}
                onClick={() => setActiveSection(section.id)}
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
        id="data-panel-kpi-counters"
        role="tabpanel"
        aria-labelledby="data-tab-kpi-counters"
        tabIndex={0}
        hidden={activeSection !== 'kpi-counters'}
      >
        <div className="demo-block__head">
          <div>
            <h3>Rolling KPI counters</h3>
            <p className="demo-block__note">Values roll through meaningful milestones before settling.</p>
          </div>
          <AnimationLabel animationId="kpi-counter-reveal" context="Data Visualization Motion → KPI counters" />
        </div>
        <div className="demo-controls">
          <button type="button" className="demo-btn demo-btn--primary" onClick={() => setKpiKey((key) => key + 1)}>
            ↻ Replay counters
          </button>
        </div>
        <div className="data-kpi-grid" key={kpiKey}>
          {KPI_CARDS.map((metric, index) => (
            <article className="data-kpi-card anim-kpi-counter-reveal" key={metric.label} style={{ '--anim-delay': `${index * 100}ms` }}>
              <span className="data-label">{metric.label}</span>
              <span className="data-counter-window" aria-label={metric.steps.at(-1)}>
                <span className="data-counter-strip" aria-hidden="true">
                  {metric.steps.map((step) => <span key={step}>{step}</span>)}
                </span>
              </span>
              <span className="data-change">↑ {metric.change} vs last month</span>
            </article>
          ))}
        </div>
      </section>

      <section
        className="demo-block"
        id="data-panel-bar-growth"
        role="tabpanel"
        aria-labelledby="data-tab-bar-growth"
        tabIndex={0}
        hidden={activeSection !== 'bar-growth'}
      >
        <div className="demo-block__head">
          <div>
            <h3>Sequential bar growth</h3>
            <p className="demo-block__note">Daily activity grows from a shared baseline in reading order.</p>
          </div>
          <AnimationLabel animationId="bar-chart-grow" context="Data Visualization Motion → Bar chart growth" />
        </div>
        <div className="demo-controls">
          <button type="button" className="demo-btn demo-btn--primary" onClick={() => setBarKey((key) => key + 1)}>
            ↻ Replay bars
          </button>
        </div>
        <div className="data-chart-card" key={barKey} role="img" aria-label="Weekly activity bar chart, highest on Saturday">
          <div className="data-chart-heading"><span>Weekly activity</span><strong>8,491 sessions</strong></div>
          <div className="data-bar-chart">
            {BAR_DATA.map((bar, index) => (
              <div className="data-bar" key={bar.label}>
                <span className="data-bar__track">
                  <span
                    className="data-bar__fill anim-bar-chart-grow"
                    style={{ height: `${bar.value}%`, '--anim-delay': `${index * 80}ms` }}
                  />
                </span>
                <span>{bar.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="demo-block"
        id="data-panel-line-drawing"
        role="tabpanel"
        aria-labelledby="data-tab-line-drawing"
        tabIndex={0}
        hidden={activeSection !== 'line-drawing'}
      >
        <div className="demo-block__head">
          <div>
            <h3>Progressive trend-line reveal</h3>
            <p className="demo-block__note">A translating mask uncovers the SVG without animating layout.</p>
          </div>
          <AnimationLabel animationId="line-chart-draw" context="Data Visualization Motion → Line chart drawing" />
        </div>
        <div className="demo-controls">
          <button type="button" className="demo-btn demo-btn--primary" onClick={() => setLineKey((key) => key + 1)}>
            ↻ Replay line
          </button>
        </div>
        <div className="data-chart-card" key={lineKey}>
          <div className="data-chart-heading"><span>Revenue trend</span><strong>+24.8%</strong></div>
          <div className="data-line-chart">
            <svg viewBox="0 0 600 220" role="img" aria-labelledby="data-line-title data-line-desc">
              <title id="data-line-title">Six-month revenue trend</title>
              <desc id="data-line-desc">Revenue rises overall, with a small dip in the fourth month.</desc>
              {[40, 85, 130, 175].map((y) => <line key={y} x1="20" x2="580" y1={y} y2={y} className="data-line-grid" />)}
              <polyline points="25,178 125,145 225,156 325,92 425,108 575,42" className="data-line-path" />
              {[[25, 178], [125, 145], [225, 156], [325, 92], [425, 108], [575, 42]].map(([x, y], index) => (
                <circle key={x} cx={x} cy={y} r="6" className="data-line-point" style={{ '--anim-delay': `${index * 100 + 300}ms` }} />
              ))}
            </svg>
            <span className="data-line-mask" aria-hidden="true" />
          </div>
        </div>
      </section>

      <section
        className="demo-block"
        id="data-panel-donut-progress"
        role="tabpanel"
        aria-labelledby="data-tab-donut-progress"
        tabIndex={0}
        hidden={activeSection !== 'donut-progress'}
      >
        <div className="demo-block__head">
          <div>
            <h3>Segmented donut progress</h3>
            <p className="demo-block__note">Twelve active segments reveal progress around a stable label.</p>
          </div>
          <AnimationLabel animationId="donut-progress-reveal" context="Data Visualization Motion → Donut progress" />
        </div>
        <div className="demo-controls">
          <button type="button" className="demo-btn demo-btn--primary" onClick={() => setDonutKey((key) => key + 1)}>
            ↻ Replay progress
          </button>
        </div>
        <div className="data-donut-layout" key={donutKey}>
          <div className="data-donut" role="img" aria-label="75 percent of quarterly target achieved">
            {Array.from({ length: 16 }).map((_, index) => (
              <span
                className={`data-donut__segment${index < 12 ? ' is-active' : ''}`}
                key={index}
                style={{ '--segment-angle': `${index * 22.5}deg`, '--segment-delay': `${index * 55}ms` }}
              />
            ))}
            <span className="data-donut__value"><strong>75%</strong><small>of target</small></span>
          </div>
          <div className="data-donut-copy">
            <span className="data-label">Quarterly target</span>
            <strong>£180k of £240k</strong>
            <p>On track to complete seven days ahead of schedule.</p>
          </div>
        </div>
      </section>

      <section
        className="demo-block"
        id="data-panel-live-updates"
        role="tabpanel"
        aria-labelledby="data-tab-live-updates"
        tabIndex={0}
        hidden={activeSection !== 'live-updates'}
      >
        <div className="demo-block__head">
          <div>
            <h3>Live revenue feed</h3>
            <p className="demo-block__note">Fresh rows arrive with restrained motion and clear status labels.</p>
          </div>
          <AnimationLabel animationId="live-data-update" context="Data Visualization Motion → Live updates" />
        </div>
        <div className="demo-controls">
          <button type="button" className="demo-btn demo-btn--primary" onClick={() => setLiveKey((key) => key + 1)}>
            ↻ Simulate updates
          </button>
          <span className="data-live-indicator"><span aria-hidden="true" /> Live</span>
        </div>
        <div className="data-live-list" key={liveKey}>
          {LIVE_ROWS.map((row, index) => (
            <article className="data-live-row anim-live-data-update" key={row.source} style={{ '--anim-delay': `${index * 110}ms` }}>
              <div><strong>{row.source}</strong><span>{row.region}</span></div>
              <span className="data-live-value">{row.value}</span>
              <span className="chip">{row.status}</span>
            </article>
          ))}
        </div>
      </section>

      <section
        className="demo-block"
        id="data-panel-dashboard-filtering"
        role="tabpanel"
        aria-labelledby="data-tab-dashboard-filtering"
        tabIndex={0}
        hidden={activeSection !== 'dashboard-filtering'}
      >
        <div className="demo-block__head">
          <div>
            <h3>Dashboard filter transition</h3>
            <p className="demo-block__note">Choose a segment to focus the dashboard result set.</p>
          </div>
          <AnimationLabel animationId="dashboard-filter-transition" context="Data Visualization Motion → Dashboard filtering" />
        </div>
        <div className="demo-controls" role="group" aria-label="Dashboard data filter">
          {FILTERS.map((filter) => (
            <button
              type="button"
              className={`demo-btn${activeFilter === filter ? ' is-active' : ''}`}
              aria-pressed={activeFilter === filter}
              key={filter}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
        <div className="data-filter-grid" key={activeFilter}>
          {filteredCards.map((card, index) => (
            <article className="data-filter-card anim-dashboard-filter-transition" key={card.title} style={{ '--anim-delay': `${index * 90}ms` }}>
              <span className="data-label">{card.title}</span>
              <strong>{card.value}</strong>
              <span>{card.note}</span>
            </article>
          ))}
        </div>
      </section>

      {DATA_SECTIONS.slice(6).map((section) => (
        <EffectShowcasePanel
          active={activeSection === section.id}
          animationId={section.animationId}
          context={`Data Visualization Motion → ${section.title}`}
          description={section.description}
          id={section.id}
          idPrefix="data"
          key={section.id}
          kind="data"
          title={section.title}
        />
      ))}
    </section>
  )
}
