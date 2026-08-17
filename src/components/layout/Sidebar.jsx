import { SECTIONS } from '../../data/sections.js'
import { CONFIGURATION_STEP_IDS } from '../../data/configurationSteps.js'

export default function Sidebar({
  activeSection,
  onSelectSection,
  onCreateConfiguration,
  activeConfiguration,
  configurationCount = 0,
}) {
  const visited = new Set(activeConfiguration?.visitedSteps ?? [])

  return (
    <aside className="sidebar">
      <div className="sidebar__brand">UI Animation Catalogue</div>
      {activeConfiguration && (
        <div className="sidebar__client">
          <span>Active client</span>
          <strong>{activeConfiguration.clientName}</strong>
          <small>{activeConfiguration.configurationName}</small>
        </div>
      )}
      <nav className="sidebar__nav">
        {SECTIONS.map((section) => {
          const isStep = CONFIGURATION_STEP_IDS.includes(section.id)
          const isVisited = visited.has(section.id)
          return (
            <button
              key={section.id}
              type="button"
              className={`sidebar__link${section.id === activeSection ? ' is-active' : ''}${
                isVisited ? ' is-complete' : ''
              }`}
              aria-current={section.id === activeSection ? 'page' : undefined}
              onClick={() => onSelectSection(section.id)}
            >
              <span>{section.label}</span>
              {section.id === 'dashboard' && configurationCount > 0 && (
                <span className="sidebar__count">{configurationCount}</span>
              )}
              {isStep && isVisited && <span className="sidebar__step-check">✓</span>}
            </button>
          )
        })}
      </nav>
      <button type="button" className="sidebar__demo-btn" onClick={onCreateConfiguration}>
        + New configuration
      </button>
    </aside>
  )
}
