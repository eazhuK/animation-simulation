/**
 * Reusable "lacquer / glass" primitives shared by every page template.
 * Every visual value they use is a `var(--vfg-*)` token set by
 * lib/visual-foundation/computeTokens.js on an ancestor — swapping theme or
 * a control never touches these components, only the token values.
 */

const STATUS_STYLE = {
  healthy: 'bg-emerald-500/15 text-emerald-300 border-emerald-400/30',
  watch: 'bg-amber-500/15 text-amber-300 border-amber-400/30',
  risk: 'bg-rose-500/15 text-rose-300 border-rose-400/30',
  neutral: 'bg-slate-500/15 text-slate-300 border-slate-400/30',
}

export function VfgCard({ className = '', children, ...rest }) {
  return (
    <div
      className={`rounded-(--vfg-radius-card) border border-(--vfg-border) bg-(--vfg-surface) backdrop-blur-(--vfg-blur) shadow-(--vfg-shadow-card) ${className}`}
      {...rest}
    >
      {children}
    </div>
  )
}

export function VfgPanel({ className = '', title, action, children, ...rest }) {
  return (
    <div
      className={`rounded-(--vfg-radius-panel) border border-(--vfg-border) bg-(--vfg-surface) backdrop-blur-(--vfg-blur) shadow-(--vfg-shadow-card) p-4 sm:p-5 ${className}`}
      {...rest}
    >
      {(title || action) && (
        <div className="flex items-center justify-between mb-4">
          {title && <h3 className="text-sm font-semibold text-(--vfg-text) tracking-wide">{title}</h3>}
          {action}
        </div>
      )}
      {children}
    </div>
  )
}

export function VfgButton({ variant = 'primary', className = '', children, ...rest }) {
  if (variant === 'primary') {
    return (
      <button
        type="button"
        className={`rounded-(--vfg-radius-button) px-4 py-2 text-sm font-semibold text-white bg-(--vfg-primary) shadow-(--vfg-shadow-button) transition-transform duration-150 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--vfg-accent-solid) ${className}`}
        {...rest}
      >
        {children}
      </button>
    )
  }
  if (variant === 'secondary') {
    return (
      <button
        type="button"
        className={`rounded-(--vfg-radius-button) px-4 py-2 text-sm font-semibold text-(--vfg-text) bg-(--vfg-surface-strong) border border-(--vfg-border) shadow-(--vfg-shadow-card) transition-transform duration-150 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--vfg-accent-solid) ${className}`}
        {...rest}
      >
        {children}
      </button>
    )
  }
  return (
    <button
      type="button"
      className={`rounded-(--vfg-radius-button) px-4 py-2 text-sm font-semibold text-(--vfg-text-muted) border border-transparent hover:border-(--vfg-border) hover:text-(--vfg-text) transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--vfg-accent-solid) ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}

export function VfgPill({ status = 'neutral', children }) {
  return (
    <span
      className={`inline-flex items-center rounded-(--vfg-radius-pill) border px-2.5 py-0.5 text-xs font-medium capitalize ${STATUS_STYLE[status] ?? STATUS_STYLE.neutral}`}
    >
      {children}
    </span>
  )
}

export function VfgInput({ label, ...rest }) {
  return (
    <label className="flex flex-col gap-1.5 text-xs font-medium text-(--vfg-text-muted)">
      {label}
      <input
        className="rounded-(--vfg-radius-button) border border-(--vfg-border) bg-(--vfg-surface-sunken) px-3 py-2 text-sm text-(--vfg-text) shadow-[inset_0_1px_2px_rgba(0,0,0,0.15)] outline-none focus-visible:ring-2 focus-visible:ring-(--vfg-accent-solid)"
        {...rest}
      />
    </label>
  )
}

export function VfgSelect({ label, options = [], ...rest }) {
  return (
    <label className="flex flex-col gap-1.5 text-xs font-medium text-(--vfg-text-muted)">
      {label}
      <select
        className="rounded-(--vfg-radius-button) border border-(--vfg-border) bg-(--vfg-surface-sunken) px-3 py-2 text-sm text-(--vfg-text) shadow-[inset_0_1px_2px_rgba(0,0,0,0.15)] outline-none focus-visible:ring-2 focus-visible:ring-(--vfg-accent-solid)"
        {...rest}
      >
        {options.map((opt) => (
          <option key={opt}>{opt}</option>
        ))}
      </select>
    </label>
  )
}

export function VfgAvatar({ name }) {
  const initials = name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
  return (
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white bg-(--vfg-primary) shadow-(--vfg-shadow-button)">
      {initials}
    </span>
  )
}

export function VfgTable({ columns, rows, avatarColumn = -1 }) {
  return (
    <div className="overflow-x-auto rounded-(--vfg-radius-button) border border-(--vfg-border)">
      <table className="w-full min-w-[480px] border-collapse text-sm">
        <thead>
          <tr className="bg-(--vfg-surface-strong)">
            {columns.map((col) => (
              <th
                key={col}
                className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-(--vfg-text-muted)"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={`border-t border-(--vfg-border) transition-colors hover:bg-(--vfg-surface-strong) ${
                rowIndex % 2 === 1 ? 'bg-(--vfg-surface-sunken)' : ''
              }`}
            >
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="px-4 py-2.5 text-(--vfg-text)">
                  {cellIndex === row.length - 1 ? (
                    <VfgPill status={cell}>{cell}</VfgPill>
                  ) : cellIndex === avatarColumn ? (
                    <div className="flex items-center gap-2">
                      <VfgAvatar name={String(cell)} />
                      <span>{cell}</span>
                    </div>
                  ) : (
                    <span>{cell}</span>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function VfgChartBars({ bars, label }) {
  const max = Math.max(...bars, 1)
  return (
    <div>
      {label && <p className="mb-3 text-xs font-medium text-(--vfg-text-muted)">{label}</p>}
      <div className="flex h-32 items-end gap-2">
        {bars.map((value, index) => (
          <div
            key={index}
            className="flex-1 rounded-t-[6px] bg-(--vfg-primary) shadow-(--vfg-shadow-button) transition-[height] duration-500"
            style={{ height: `${(value / max) * 100}%` }}
          />
        ))}
      </div>
    </div>
  )
}

export function VfgStatCard({ label, value, delta, trend }) {
  const trendColor = trend === 'up' ? 'text-emerald-300' : trend === 'down' ? 'text-rose-300' : 'text-(--vfg-text-muted)'
  return (
    <VfgCard className="p-4">
      <p className="text-xs font-medium text-(--vfg-text-muted)">{label}</p>
      <p className="mt-1.5 text-2xl font-bold text-(--vfg-text)">{value}</p>
      {delta && <p className={`mt-1 text-xs font-semibold ${trendColor}`}>{delta}</p>}
    </VfgCard>
  )
}

export function VfgActivityFeed({ items }) {
  return (
    <ul className="flex flex-col gap-3">
      {items.map((item, index) => (
        <li key={index} className="flex items-start justify-between gap-3 text-sm">
          <span className="text-(--vfg-text)">{item.title}</span>
          <span className="shrink-0 text-xs text-(--vfg-text-muted)">{item.time}</span>
        </li>
      ))}
    </ul>
  )
}

export function VfgModal({ title, body, onClose }) {
  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center rounded-(--vfg-radius-panel) bg-black/40 p-6">
      <div className="w-full max-w-sm rounded-(--vfg-radius-panel) border border-(--vfg-border) bg-(--vfg-surface-strong) backdrop-blur-(--vfg-blur) p-5 shadow-(--vfg-shadow-card)">
        <h4 className="text-sm font-semibold text-(--vfg-text)">{title}</h4>
        <p className="mt-2 text-sm text-(--vfg-text-muted)">{body}</p>
        <div className="mt-4 flex justify-end gap-2">
          <VfgButton variant="ghost" onClick={onClose}>Dismiss</VfgButton>
          <VfgButton variant="primary" onClick={onClose}>Confirm</VfgButton>
        </div>
      </div>
    </div>
  )
}

export function VfgToast({ title, message, onClose }) {
  return (
    <div
      role="status"
      className="absolute bottom-4 right-4 z-30 w-64 rounded-(--vfg-radius-button) border border-(--vfg-border) bg-(--vfg-surface-strong) backdrop-blur-(--vfg-blur) p-3.5 shadow-(--vfg-shadow-card)"
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-xs font-semibold text-(--vfg-text)">{title}</p>
          <p className="mt-0.5 text-xs text-(--vfg-text-muted)">{message}</p>
        </div>
        <button type="button" onClick={onClose} className="text-xs text-(--vfg-text-muted) hover:text-(--vfg-text)">✕</button>
      </div>
    </div>
  )
}

export function VfgEmptyState({ title, body }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-(--vfg-radius-panel) border border-dashed border-(--vfg-border) py-10 text-center">
      <p className="text-sm font-semibold text-(--vfg-text)">{title}</p>
      <p className="max-w-xs text-xs text-(--vfg-text-muted)">{body}</p>
    </div>
  )
}
