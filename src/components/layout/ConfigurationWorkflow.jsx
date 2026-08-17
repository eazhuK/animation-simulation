import { useMemo, useState } from 'react'
import { CONFIGURATION_STEPS, CONFIGURATION_STEP_MAP } from '../../data/configurationSteps.js'
import { useSelection } from '../../context/SelectionContext.jsx'

export default function ConfigurationWorkflow({ activeSection, onSelectStep, onDashboard, onReport }) {
  const {
    activeConfiguration,
    getConfigurationProgress,
    saveConfigurationDraft,
    completeConfiguration,
  } = useSelection()
  const [feedback, setFeedback] = useState('')

  const progress = useMemo(
    () => getConfigurationProgress(activeConfiguration),
    [activeConfiguration, getConfigurationProgress]
  )
  const activeIndex = CONFIGURATION_STEPS.findIndex((step) => step.id === activeSection)

  if (!activeConfiguration || activeIndex < 0) return null

  const visited = new Set(activeConfiguration.visitedSteps)

  function saveDraft() {
    saveConfigurationDraft()
    setFeedback('Draft saved in this browser.')
  }

  function complete() {
    const result = completeConfiguration()
    if (result.ok) {
      setFeedback('Configuration completed and saved.')
      onReport()
      return
    }
    if (result.missingSteps?.length) {
      const labels = result.missingSteps
        .map((stepId) => CONFIGURATION_STEP_MAP[stepId]?.shortLabel)
        .filter(Boolean)
      setFeedback(`Visit the remaining steps: ${labels.join(', ')}.`)
    } else {
      setFeedback(result.reason)
    }
  }

  return (
    <section className="configuration-workflow" aria-label="Client configuration progress">
      <div className="configuration-workflow__summary">
        <div>
          <span className="workspace-eyebrow">Active client configuration</span>
          <h2>{activeConfiguration.clientName}</h2>
          <p>{activeConfiguration.configurationName}</p>
        </div>
        <div className="configuration-workflow__status">
          <span className={`workspace-status workspace-status--${activeConfiguration.status}`}>
            {activeConfiguration.status}
          </span>
          <strong>{progress.completed}/{progress.total} steps visited</strong>
        </div>
      </div>

      <div className="configuration-progress-track" aria-hidden="true">
        <span style={{ width: `${progress.percent}%` }} />
      </div>

      <div className="configuration-stepper" role="tablist" aria-label="Configuration steps">
        {CONFIGURATION_STEPS.map((step, index) => {
          const isCurrent = step.id === activeSection
          const isVisited = visited.has(step.id)
          return (
            <button
              key={step.id}
              type="button"
              role="tab"
              aria-selected={isCurrent}
              className={`configuration-step${isCurrent ? ' is-current' : ''}${
                isVisited ? ' is-visited' : ''
              }`}
              onClick={() => onSelectStep(step.id)}
              title={step.label}
            >
              <span>{isVisited ? '✓' : index + 1}</span>
              <small>{step.shortLabel}</small>
            </button>
          )
        })}
      </div>

      <div className="configuration-workflow__actions">
        <button type="button" className="demo-btn" onClick={onDashboard}>
          Dashboard
        </button>
        <button
          type="button"
          className="demo-btn"
          disabled={activeIndex === 0}
          onClick={() => onSelectStep(CONFIGURATION_STEPS[activeIndex - 1].id)}
        >
          ← Previous
        </button>
        <button type="button" className="demo-btn" onClick={saveDraft}>
          Save draft
        </button>
        {activeIndex < CONFIGURATION_STEPS.length - 1 ? (
          <button
            type="button"
            className="demo-btn demo-btn--primary"
            onClick={() => onSelectStep(CONFIGURATION_STEPS[activeIndex + 1].id)}
          >
            Next step →
          </button>
        ) : (
          <button type="button" className="demo-btn demo-btn--primary" onClick={complete}>
            Complete & save
          </button>
        )}
      </div>
      {feedback && <p className="configuration-workflow__feedback" role="status">{feedback}</p>}
    </section>
  )
}
