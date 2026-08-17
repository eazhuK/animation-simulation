import { useState } from 'react'
import { PAGE_CONTENT } from '../../data/visual-foundation/pageContent.js'
import {
  VfgPanel,
  VfgButton,
  VfgPill,
  VfgInput,
  VfgSelect,
  VfgTable,
  VfgChartBars,
  VfgStatCard,
  VfgActivityFeed,
  VfgEmptyState,
  VfgModal,
  VfgToast,
} from './primitives.jsx'

const AVATAR_COLUMN_BY_PAGE_TYPE = {
  'healthcare-dashboard': 0,
  'hr-portal': 0,
}

/** Renders one full realistic screen (nav, stats, chart, table, filters, floating modal/toast) for a given page-content config, styled entirely through the ambient --vfg-* tokens. */
export default function PageTemplate({ pageType, interactive = true }) {
  const content = PAGE_CONTENT[pageType]
  const [modalOpen, setModalOpen] = useState(false)
  const [toastOpen, setToastOpen] = useState(false)

  if (!content) return null

  const openModal = () => interactive && setModalOpen(true)
  const openToast = () => interactive && setToastOpen(true)

  return (
    <div className="relative flex min-h-full w-full flex-col text-(--vfg-text)">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-(--vfg-border) px-6 py-4">
        <div className="flex items-center gap-3">
          <span className="h-8 w-8 rounded-(--vfg-radius-button) bg-(--vfg-primary) shadow-(--vfg-shadow-button)" />
          <nav className="flex flex-wrap gap-1">
            {content.navItems.map((item, index) => (
              <span
                key={item}
                className={`rounded-(--vfg-radius-button) px-3 py-1.5 text-xs font-medium ${
                  index === 0 ? 'bg-(--vfg-surface-strong) text-(--vfg-text)' : 'text-(--vfg-text-muted)'
                }`}
              >
                {item}
              </span>
            ))}
          </nav>
        </div>
        <button
          type="button"
          onClick={openToast}
          className="rounded-(--vfg-radius-button) border border-(--vfg-border) bg-(--vfg-surface-strong) px-3 py-1.5 text-xs font-semibold text-(--vfg-text) shadow-(--vfg-shadow-button)"
        >
          🔔 Notify
        </button>
      </header>

      <div className="flex flex-1 flex-col gap-6 px-6 py-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-(--vfg-text)">{content.title}</h2>
            <p className="mt-1 text-sm text-(--vfg-text-muted)">{content.subtitle}</p>
          </div>
          <div className="flex gap-2">
            <VfgButton variant="ghost">Settings</VfgButton>
            <VfgButton variant="secondary">Filter</VfgButton>
            <VfgButton variant="primary" onClick={openModal}>+ New</VfgButton>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {content.stats.map((stat) => (
            <VfgStatCard key={stat.label} {...stat} />
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="flex flex-col gap-4 lg:col-span-2">
            <VfgPanel title={content.chart.label}>
              <VfgChartBars bars={content.chart.bars} />
            </VfgPanel>
            <VfgPanel
              title={content.table.columns[0] + ' overview'}
              action={
                <div className="flex gap-1.5">
                  <VfgPill status="healthy">healthy</VfgPill>
                  <VfgPill status="watch">watch</VfgPill>
                  <VfgPill status="risk">risk</VfgPill>
                </div>
              }
            >
              <VfgTable
                columns={content.table.columns}
                rows={content.table.rows}
                avatarColumn={AVATAR_COLUMN_BY_PAGE_TYPE[pageType] ?? -1}
              />
            </VfgPanel>
          </div>

          <div className="flex flex-col gap-4">
            <VfgPanel title="Filters">
              <div className="flex flex-col gap-3">
                {content.formFields.map((field) =>
                  field.type === 'select' ? (
                    <VfgSelect key={field.label} label={field.label} options={field.options} />
                  ) : (
                    <VfgInput key={field.label} label={field.label} placeholder={field.placeholder} />
                  )
                )}
              </div>
            </VfgPanel>

            <VfgPanel title={content.activity ? 'Recent activity' : 'Nothing scheduled'}>
              {content.activity ? (
                <VfgActivityFeed items={content.activity} />
              ) : (
                <VfgEmptyState title="All caught up" body="Nothing needs your attention right now — new items will appear here." />
              )}
            </VfgPanel>
          </div>
        </div>
      </div>

      {modalOpen && (
        <VfgModal title={content.modal.title} body={content.modal.body} onClose={() => setModalOpen(false)} />
      )}
      {toastOpen && (
        <VfgToast title={content.toast.title} message={content.toast.message} onClose={() => setToastOpen(false)} />
      )}
    </div>
  )
}
