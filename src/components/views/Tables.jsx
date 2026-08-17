import { Fragment, useState } from 'react'
import AnimationLabel from '../shared/AnimationLabel.jsx'
import EffectShowcasePanel from '../shared/EffectShowcasePanel.jsx'
import SectionTabs from '../shared/SectionTabs.jsx'

const TABLE_SECTIONS = [
  { id: 'complete-table', label: 'Complete table flow' },
  { id: 'row-stagger', label: 'Row stagger', animationId: 'row-stagger-reveal', title: 'Staggered row reveal', description: 'Rows arrive sequentially to establish scanning order.' },
  { id: 'row-slide', label: 'Row slide', animationId: 'row-slide-in', title: 'Sliding row entrance', description: 'New rows enter laterally from a shared edge.' },
  { id: 'row-fade', label: 'Row fade', animationId: 'row-fade-in', title: 'Fading row entrance', description: 'Rows appear with restrained opacity motion.' },
  { id: 'new-highlight', label: 'New-row highlight', animationId: 'row-highlight-new', title: 'New-row highlight', description: 'A fresh record receives a brief visual acknowledgement.' },
  { id: 'row-expansion', label: 'Row expansion', animationId: 'row-expand', title: 'Expandable row detail', description: 'A selected record reveals its supporting detail.' },
  { id: 'sort-loading', label: 'Sort loading', animationId: 'spinner-circle', title: 'Sorting activity state', description: 'A compact progress cue communicates active sorting.' },
  { id: 'table-skeleton', label: 'Table skeleton', animationId: 'skeleton-shimmer', title: 'Table skeleton loading', description: 'Row-shaped placeholders preserve the table structure.' },
  { id: 'list-stagger', label: 'List stagger', animationId: 'stagger-slide-in', title: 'Staggered list entrance', description: 'List records enter in a readable sequence.' },
  { id: 'list-focus', label: 'List focus reveal', animationId: 'focus-in', title: 'Focus-based list reveal', description: 'Records sharpen into view as data resolves.' },
]

const INITIAL_ROWS = [
  { id: 1, name: 'Amara Okafor', role: 'Product Designer', status: 'Active' },
  { id: 2, name: 'Liam Chen', role: 'Backend Engineer', status: 'Active' },
  { id: 3, name: 'Priya Nair', role: 'QA Lead', status: 'On leave' },
  { id: 4, name: 'Tomas Novak', role: 'Support', status: 'Active' },
  { id: 5, name: 'Sofia Reyes', role: 'Account Manager', status: 'Invited' },
]

const NEW_ROW_POOL = [
  { name: 'Kenji Watanabe', role: 'Frontend Engineer', status: 'Invited' },
  { name: 'Elena Petrova', role: 'Data Analyst', status: 'Active' },
  { name: 'Noah Williams', role: 'Sales', status: 'Invited' },
]

const ENTRY_STYLES = [
  { id: 'stagger', label: 'Staggered reveal', animationId: 'row-stagger-reveal' },
  { id: 'slide', label: 'Slide in', animationId: 'row-slide-in' },
  { id: 'fade', label: 'Fade in', animationId: 'row-fade-in' },
]

const SKELETON_COLUMNS = [80, 60, 40]

export default function Tables() {
  const [activeTableSection, setActiveTableSection] = useState(TABLE_SECTIONS[0].id)
  const [rows, setRows] = useState(INITIAL_ROWS)
  const [entryStyle, setEntryStyle] = useState(ENTRY_STYLES[0])
  const [revealKey, setRevealKey] = useState(0)
  const [highlightId, setHighlightId] = useState(null)
  const [expandedId, setExpandedId] = useState(null)
  const [sorting, setSorting] = useState(false)
  const [sortDir, setSortDir] = useState('asc')
  const [showSkeleton, setShowSkeleton] = useState(false)

  function replayReveal(style) {
    if (style) setEntryStyle(style)
    setRevealKey((k) => k + 1)
  }

  function addRow() {
    const pick = NEW_ROW_POOL[Math.floor(Math.random() * NEW_ROW_POOL.length)]
    const id = Date.now()
    setRows((prev) => [{ id, ...pick }, ...prev])
    setHighlightId(id)
  }

  function sortByName() {
    setSorting(true)
    setTimeout(() => {
      const nextDir = sortDir === 'asc' ? 'desc' : 'asc'
      setRows((prev) =>
        [...prev].sort((a, b) =>
          nextDir === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
        )
      )
      setSortDir(nextDir)
      setSorting(false)
      replayReveal(ENTRY_STYLES[0])
    }, 650)
  }

  function toggleSkeleton() {
    setShowSkeleton(true)
    setTimeout(() => {
      setShowSkeleton(false)
      replayReveal(ENTRY_STYLES[0])
    }, 1200)
  }

  const rowClassName = () =>
    entryStyle.id === 'stagger' ? 'anim-row-stagger-reveal' : `anim-${entryStyle.id === 'slide' ? 'row-slide-in' : 'row-fade-in'}`

  const rowStyle = (index) =>
    entryStyle.id === 'stagger' ? { '--anim-delay': `${index * 90}ms` } : undefined

  return (
    <section className="view">
      <header className="view__header">
        <h2>Tables / Lists</h2>
        <p>
          A sample data table demonstrating row reveal, new-row highlighting, row expansion,
          sort loading, and a skeleton loading state.
        </p>
      </header>

      <SectionTabs items={TABLE_SECTIONS} activeId={activeTableSection} onChange={setActiveTableSection} idPrefix="tables" label="Table and list animation sections" />

      <section
        className="demo-block"
        id="tables-panel-complete-table"
        role="tabpanel"
        aria-labelledby="tables-tab-complete-table"
        tabIndex={0}
        hidden={activeTableSection !== 'complete-table'}
      >
        <div className="demo-block__head">
          <h3>Row reveal &amp; new-row highlight</h3>
          <AnimationLabel
            animationIds={[entryStyle.animationId, 'row-highlight-new', 'row-expand', 'spinner-circle', 'skeleton-shimmer']}
            context="Tables → Row reveal & new-row highlight"
          />
        </div>
        <div className="demo-controls">
          <div className="demo-controls__group">
            {ENTRY_STYLES.map((style) => (
              <button
                key={style.id}
                type="button"
                className={`demo-btn ${entryStyle.id === style.id ? 'is-active' : ''}`}
                onClick={() => replayReveal(style)}
              >
                {style.label}
              </button>
            ))}
          </div>
          <button type="button" className="demo-btn demo-btn--primary" onClick={addRow}>
            + Add row
          </button>
          <button type="button" className="demo-btn" onClick={sortByName} disabled={sorting}>
            Sort by name ({sortDir === 'asc' ? 'A→Z' : 'Z→A'})
          </button>
          <button type="button" className="demo-btn" onClick={toggleSkeleton} disabled={showSkeleton}>
            Show skeleton
          </button>
        </div>

        <div className="demo-table-wrap">
          {sorting && (
            <div className="demo-table__overlay">
              <span className="demo-spinner demo-spinner--lg anim-spinner-circle" />
            </div>
          )}
          <table className="demo-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody key={revealKey}>
              {showSkeleton
                ? Array.from({ length: 5 }).map((_, index) => (
                    <tr key={index}>
                      {SKELETON_COLUMNS.map((width, col) => (
                        <td key={col}>
                          <span
                            className="demo-skeleton-block anim-skeleton-shimmer"
                            style={{ width: `${width}%` }}
                          />
                        </td>
                      ))}
                    </tr>
                  ))
                : rows.map((row, index) => (
                    <Fragment key={row.id}>
                      <tr
                        className={[
                          rowClassName(index),
                          row.id === highlightId ? 'anim-row-highlight-new' : '',
                          expandedId === row.id ? 'is-expanded' : '',
                        ]
                          .filter(Boolean)
                          .join(' ')}
                        style={rowStyle(index)}
                        tabIndex={0}
                        role="button"
                        aria-expanded={expandedId === row.id}
                        onClick={() => setExpandedId((prev) => (prev === row.id ? null : row.id))}
                        onKeyDown={(event) => {
                          if (event.key !== 'Enter' && event.key !== ' ') return
                          event.preventDefault()
                          setExpandedId((prev) => (prev === row.id ? null : row.id))
                        }}
                      >
                        <td>{row.name}</td>
                        <td>{row.role}</td>
                        <td>
                          <span className={`demo-status-chip demo-status-chip--${row.status.replace(/\s+/g, '-').toLowerCase()}`}>
                            {row.status}
                          </span>
                        </td>
                      </tr>
                      {expandedId === row.id && (
                        <tr className="demo-table__detail-row">
                          <td colSpan={3}>
                            <div className="demo-table__detail anim-row-expand">
                              Full profile for <strong>{row.name}</strong> — {row.role}, status:{' '}
                              {row.status}. Click the row again to collapse.
                            </div>
                          </td>
                        </tr>
                      )}
                    </Fragment>
                  ))}
            </tbody>
          </table>
        </div>
      </section>

      {TABLE_SECTIONS.slice(1).map((section) => (
        <EffectShowcasePanel
          active={activeTableSection === section.id}
          animationId={section.animationId}
          context={`Tables / Lists → ${section.title}`}
          description={section.description}
          id={section.id}
          idPrefix="tables"
          key={section.id}
          kind="table"
          title={section.title}
        />
      ))}
    </section>
  )
}
