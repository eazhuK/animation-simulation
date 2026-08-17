import { CONTROL_DIMENSIONS } from '../../lib/visual-foundation/controls.js'

/** Segmented-button controls for the 6 theme dimensions; used only in the detail preview so the client can see each control visibly reshape the same screen. */
export default function ControlPanel({ values, defaults, onChange, onReset }) {
  const isModified = CONTROL_DIMENSIONS.some((dim) => values[dim.key] !== defaults[dim.key])

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-slate-900 p-4 text-slate-100">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">Theme controls</h3>
        {isModified && (
          <button type="button" onClick={onReset} className="text-xs font-medium text-indigo-300 hover:text-indigo-200">
            Reset to theme defaults
          </button>
        )}
      </div>
      {CONTROL_DIMENSIONS.map((dim) => (
        <div key={dim.key}>
          <p className="mb-1.5 text-xs font-medium text-slate-400">{dim.label}</p>
          <div className="flex flex-wrap gap-1.5">
            {dim.options.map((opt) => {
              const active = values[dim.key] === opt.value
              return (
                <button
                  key={opt.value}
                  type="button"
                  aria-pressed={active}
                  onClick={() => onChange(dim.key, opt.value)}
                  className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400 ${
                    active ? 'bg-indigo-500 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {opt.label}
                </button>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
