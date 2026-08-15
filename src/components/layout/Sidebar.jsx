import { SECTIONS } from '../../data/sections.js'

export default function Sidebar({ activeSection, onSelectSection }) {
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
            {section.label}
          </button>
        ))}
      </nav>
    </aside>
  )
}
