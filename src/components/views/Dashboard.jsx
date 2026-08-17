import { useMemo, useState } from 'react'
import { useSelection } from '../../context/SelectionContext.jsx'

function formatDate(value) {
  if (!value) return 'Not completed'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return 'Recently updated'
  return new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date)
}

export default function Dashboard({ onStartConfiguration, onViewReport }) {
  const {
    configurations,
    createConfiguration,
    activateConfiguration,
    deleteConfiguration,
    getConfigurationProgress,
  } = useSelection()
  const [activeTab, setActiveTab] = useState('draft')
  const [clientName, setClientName] = useState('')
  const [configurationName, setConfigurationName] = useState('')
  const [notes, setNotes] = useState('')
  const [formError, setFormError] = useState('')

  const drafts = useMemo(
    () => configurations.filter((configuration) => configuration.status === 'draft'),
    [configurations]
  )
  const saved = useMemo(
    () => configurations.filter((configuration) => configuration.status === 'saved'),
    [configurations]
  )
  const visibleConfigurations = activeTab === 'draft' ? drafts : saved

  function createNewConfiguration(event) {
    event.preventDefault()
    if (!clientName.trim() || !configurationName.trim()) {
      setFormError('Client name and configuration name are required.')
      return
    }
    const id = createConfiguration({ clientName, configurationName, notes })
    setClientName('')
    setConfigurationName('')
    setNotes('')
    setFormError('')
    onStartConfiguration(id)
  }

  function continueConfiguration(id) {
    activateConfiguration(id)
    onStartConfiguration(id)
  }

  function viewReport(id) {
    activateConfiguration(id)
    onViewReport(id)
  }

  function removeConfiguration(configuration) {
    if (window.confirm(`Delete ${configuration.clientName}'s configuration from this browser?`)) {
      deleteConfiguration(configuration.id)
    }
  }

  return (
    <section className="view workspace-view">
      <header className="view__header workspace-hero">
        <div>
          <span className="workspace-eyebrow">Multi-client workspace</span>
          <h2>Client configuration dashboard</h2>
          <p>
            Create one configuration per client, complete every guided step, and keep each record
            as a draft or final saved configuration. All data stays in this browser.
          </p>
        </div>
      </header>

      <div className="workspace-stats" aria-label="Configuration summary">
        <div className="workspace-stat workspace-stat--static">
          <span className="workspace-stat__value">{configurations.length}</span>
          <span className="workspace-stat__label">All clients</span>
          <span className="workspace-stat__hint">Independent configurations</span>
        </div>
        <button type="button" className="workspace-stat" onClick={() => setActiveTab('draft')}>
          <span className="workspace-stat__value">{drafts.length}</span>
          <span className="workspace-stat__label">Draft configurations</span>
          <span className="workspace-stat__hint">Work still in progress</span>
        </button>
        <button type="button" className="workspace-stat" onClick={() => setActiveTab('saved')}>
          <span className="workspace-stat__value">{saved.length}</span>
          <span className="workspace-stat__label">Saved configurations</span>
          <span className="workspace-stat__hint">Complete and report-ready</span>
        </button>
        <div className="workspace-stat workspace-stat--static">
          <span className="workspace-stat__value">
            {configurations.reduce(
              (total, configuration) =>
                total +
                Object.keys(configuration.selections).length +
                Object.keys(configuration.visualThemes).length,
              0
            )}
          </span>
          <span className="workspace-stat__label">Total selections</span>
          <span className="workspace-stat__hint">Across every client</span>
        </div>
      </div>

      <form className="card configuration-create" onSubmit={createNewConfiguration}>
        <div className="workspace-panel__head">
          <div>
            <h3>Create new configuration</h3>
            <p>Start a separate guided selection journey for a client.</p>
          </div>
        </div>
        <div className="configuration-create__fields">
          <label>
            <span>Client name *</span>
            <input
              value={clientName}
              onChange={(event) => setClientName(event.target.value)}
              placeholder="e.g. Acme Retail"
            />
          </label>
          <label>
            <span>Configuration name *</span>
            <input
              value={configurationName}
              onChange={(event) => setConfigurationName(event.target.value)}
              placeholder="e.g. Checkout motion direction"
            />
          </label>
          <label className="configuration-create__notes">
            <span>Notes</span>
            <input
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              placeholder="Optional project or stakeholder notes"
            />
          </label>
          <button type="submit" className="demo-btn demo-btn--primary">
            Create & start
          </button>
        </div>
        {formError && <p className="configuration-create__error" role="alert">{formError}</p>}
      </form>

      <section className="configuration-list-section">
        <div className="configuration-tabs" role="tablist" aria-label="Configuration status">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'draft'}
            className={activeTab === 'draft' ? 'is-active' : ''}
            onClick={() => setActiveTab('draft')}
          >
            Drafts <span>{drafts.length}</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'saved'}
            className={activeTab === 'saved' ? 'is-active' : ''}
            onClick={() => setActiveTab('saved')}
          >
            Saved <span>{saved.length}</span>
          </button>
        </div>

        {visibleConfigurations.length === 0 ? (
          <div className="card workspace-empty">
            <strong>No {activeTab} configurations</strong>
            <span>
              {activeTab === 'draft'
                ? 'Create a client configuration above to begin.'
                : 'A configuration appears here after every step is visited and it is completed.'}
            </span>
          </div>
        ) : (
          <div className="configuration-card-grid">
            {visibleConfigurations.map((configuration) => {
              const progress = getConfigurationProgress(configuration)
              const selectionCount =
                Object.keys(configuration.selections).length +
                Object.keys(configuration.visualThemes).length
              return (
                <article
                  className="card configuration-card"
                  data-configuration-status={configuration.status}
                  key={configuration.id}
                >
                  <header>
                    <span className={`workspace-status workspace-status--${configuration.status}`}>
                      {configuration.status}
                    </span>
                    <button
                      type="button"
                      className="configuration-card__delete"
                      onClick={() => removeConfiguration(configuration)}
                      aria-label={`Delete ${configuration.clientName} configuration`}
                    >
                      ×
                    </button>
                  </header>
                  <div>
                    <h3>{configuration.clientName}</h3>
                    <p>{configuration.configurationName}</p>
                  </div>
                  {configuration.notes && <small>{configuration.notes}</small>}
                  <div className="configuration-card__progress">
                    <span>
                      <strong>{progress.completed}/{progress.total}</strong> steps
                    </span>
                    <span>{selectionCount} selection{selectionCount === 1 ? '' : 's'}</span>
                  </div>
                  <div className="configuration-progress-track" aria-label={`${progress.percent}% complete`}>
                    <span style={{ width: `${progress.percent}%` }} />
                  </div>
                  <time>Updated {formatDate(configuration.updatedAt)}</time>
                  <footer>
                    <button
                      type="button"
                      className="demo-btn demo-btn--primary"
                      onClick={() => continueConfiguration(configuration.id)}
                    >
                      {configuration.status === 'saved' ? 'Edit configuration' : 'Continue'}
                    </button>
                    <button
                      type="button"
                      className="demo-btn"
                      onClick={() => viewReport(configuration.id)}
                    >
                      {configuration.status === 'saved' ? 'Open report' : 'Preview report'}
                    </button>
                  </footer>
                </article>
              )
            })}
          </div>
        )}
      </section>
    </section>
  )
}
