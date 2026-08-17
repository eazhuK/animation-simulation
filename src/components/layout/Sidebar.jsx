import { SECTIONS } from '../../data/sections.js'

export default function Sidebar({ activeSection, onSelectSection, onStartDemo, sectionCounts = {} }) {
  return (
    <aside className="sidebar">
      <div className="sidebar__brand">UI Animation Catalogue</div>
      <nav className="sidebar__nav">
        {SECTIONS.map((section) => (
          <button
            key={section.id}
            type="button"
            className={
              'sidebar__link' + (section.id === activeSection ? ' is-active' : '')
            }
            aria-current={section.id === activeSection ? 'page' : undefined}
            onClick={() => onSelectSection(section.id)}
          >
            <span>{section.label}</span>
            {sectionCounts[section.id] > 0 && (
              <span className="sidebar__count">{sectionCounts[section.id]}</span>
            )}
          </button>
        ))}
      </nav>
      <button type="button" className="sidebar__demo-btn" onClick={onStartDemo}>
        ▶ Start Client Demo
      </button>
    </aside>
  )
}
