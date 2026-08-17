import { useMemo } from 'react'
import { useSelection } from '../../context/SelectionContext.jsx'
import { CONFIGURATION_STEPS } from '../../data/configurationSteps.js'
import { VISUAL_THEME_MAP } from '../../data/visual-foundation/themes.js'
import {
  configurationFileName,
  generateConfigurationMarkdown,
  groupConfigurationSelections,
} from '../../lib/configurationReport.js'

export default function ConfigurationReport({ onNavigate }) {
  const { activeConfiguration, getConfigurationProgress } = useSelection()

  const markdown = useMemo(
    () => (activeConfiguration ? generateConfigurationMarkdown(activeConfiguration) : ''),
    [activeConfiguration]
  )
  const groups = useMemo(
    () => (activeConfiguration ? groupConfigurationSelections(activeConfiguration) : []),
    [activeConfiguration]
  )

  if (!activeConfiguration) {
    return (
      <section className="view workspace-view">
        <div className="card workspace-empty">
          <strong>No configuration selected</strong>
          <button type="button" className="demo-btn" onClick={() => onNavigate('dashboard')}>
            Return to dashboard
          </button>
        </div>
      </section>
    )
  }

  const progress = getConfigurationProgress(activeConfiguration)
  const visualThemes = Object.keys(activeConfiguration.visualThemes)
    .map((id) => VISUAL_THEME_MAP[id])
    .filter(Boolean)

  function downloadMarkdown() {
    const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = configurationFileName(activeConfiguration)
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <section className="view configuration-report">
      <header className="configuration-report__toolbar">
        <button type="button" className="demo-btn" onClick={() => onNavigate('dashboard')}>
          ← Dashboard
        </button>
        <div>
          <button type="button" className="demo-btn" onClick={downloadMarkdown}>
            Download Markdown
          </button>
          <button type="button" className="demo-btn demo-btn--primary" onClick={() => window.print()}>
            Print / Save PDF
          </button>
        </div>
      </header>

      <article className="card configuration-report__document">
        <header className="configuration-report__header">
          <span className="workspace-eyebrow">UI animation configuration report</span>
          <h2>{activeConfiguration.clientName}</h2>
          <p>{activeConfiguration.configurationName}</p>
          <div className="configuration-report__meta">
            <span className={`workspace-status workspace-status--${activeConfiguration.status}`}>
              {activeConfiguration.status}
            </span>
            <span>{progress.completed}/{progress.total} steps visited</span>
            <span>
              {Object.keys(activeConfiguration.selections).length + visualThemes.length} selections
            </span>
          </div>
          {activeConfiguration.notes && <p className="configuration-report__notes">{activeConfiguration.notes}</p>}
        </header>

        <section className="configuration-report__section">
          <h3>Step completion</h3>
          <div className="configuration-report__steps">
            {CONFIGURATION_STEPS.map((step) => (
              <span key={step.id} className={activeConfiguration.visitedSteps.includes(step.id) ? 'is-complete' : ''}>
                {activeConfiguration.visitedSteps.includes(step.id) ? '✓' : '○'} {step.label}
              </span>
            ))}
          </div>
        </section>

        <section className="configuration-report__section">
          <h3>Selected animations</h3>
          {groups.length === 0 ? (
            <p className="configuration-report__empty">No animations selected.</p>
          ) : (
            groups.map((group) => (
              <div className="configuration-report__group" key={group.id}>
                <h4>{group.label}</h4>
                {group.selections.map(({ animation, selection }) => (
                  <div className="configuration-report__selection" key={animation.id}>
                    <div>
                      <strong>{animation.name}</strong>
                      <p>{animation.description}</p>
                    </div>
                    <span>
                      {selection.settings.durationMs}ms · {selection.settings.delayMs}ms delay · {selection.settings.speed}×
                    </span>
                  </div>
                ))}
              </div>
            ))
          )}
        </section>

        <section className="configuration-report__section">
          <h3>Selected visual foundations</h3>
          {visualThemes.length === 0 ? (
            <p className="configuration-report__empty">No visual foundation selected.</p>
          ) : (
            <div className="configuration-report__themes">
              {visualThemes.map((theme) => (
                <div key={theme.id}>
                  <strong>{theme.name}</strong>
                  <p>{theme.description}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      </article>
    </section>
  )
}
