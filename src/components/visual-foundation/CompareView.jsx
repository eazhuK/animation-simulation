import ThemeStage from './ThemeStage.jsx'
import PageTemplate from './PageTemplate.jsx'

/** Side-by-side comparison of up to 3 selected themes, each rendering its real page template so surface/shadow/colour differences are directly comparable. */
export default function CompareView({ themes, onRemove, onOpen }) {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
      {themes.map((theme) => (
        <div key={theme.id} className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-xl">
          <div className="flex items-center justify-between gap-2 px-4 py-3">
            <div>
              <h3 className="text-sm font-semibold text-white">{theme.name}</h3>
              <p className="text-xs text-slate-400">{theme.tags.join(' · ')}</p>
            </div>
            <div className="flex shrink-0 gap-1.5">
              <button
                type="button"
                onClick={() => onOpen(theme.id)}
                className="rounded-lg bg-indigo-500 px-2.5 py-1 text-xs font-semibold text-white hover:bg-indigo-400"
              >
                Full preview
              </button>
              <button
                type="button"
                onClick={() => onRemove(theme.id)}
                className="rounded-lg bg-slate-800 px-2.5 py-1 text-xs font-semibold text-slate-300 hover:bg-slate-700"
              >
                Remove
              </button>
            </div>
          </div>
          <div className="relative h-[420px] w-full overflow-hidden">
            <ThemeStage theme={theme} className="pointer-events-none absolute inset-0">
              <div className="origin-top-left" style={{ transform: 'scale(0.62)', width: '161%', height: '161%' }}>
                <PageTemplate pageType={theme.pageType} interactive={false} />
              </div>
            </ThemeStage>
          </div>
        </div>
      ))}
    </div>
  )
}
