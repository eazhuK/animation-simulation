import ThemeStage from './ThemeStage.jsx'
import PageTemplate from './PageTemplate.jsx'
import { useVisualFoundation } from '../../context/VisualFoundationContext.jsx'

/** One gallery tile: a scaled-down live render of the theme's real page (not a static image), plus name/description/tags and favourite/compare/open actions. */
export default function PreviewCard({ theme, onOpen, compareChecked, onToggleCompare, compareDisabled }) {
  const { isFavourite, toggleFavourite } = useVisualFoundation()
  const favourited = isFavourite(theme.id)

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-[0_16px_40px_-16px_rgba(0,0,0,0.6)] transition-transform duration-200 hover:-translate-y-1">
      <button
        type="button"
        onClick={() => onOpen(theme.id)}
        className="relative block h-44 w-full overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
        aria-label={`Open ${theme.name} detail preview`}
      >
        <ThemeStage theme={theme} className="pointer-events-none absolute inset-0">
          <div className="origin-top-left" style={{ transform: 'scale(0.27)', width: '370%', height: '370%' }}>
            <PageTemplate pageType={theme.pageType} interactive={false} />
          </div>
        </ThemeStage>
        <span className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
      </button>

      <div className="flex flex-1 flex-col gap-2.5 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-semibold text-white">{theme.name}</h3>
          <button
            type="button"
            onClick={() => toggleFavourite(theme.id)}
            aria-pressed={favourited}
            aria-label={favourited ? `Remove ${theme.name} from favourites` : `Add ${theme.name} to favourites`}
            className={`shrink-0 text-lg leading-none ${favourited ? 'text-amber-300' : 'text-slate-500 hover:text-slate-300'}`}
          >
            {favourited ? '★' : '☆'}
          </button>
        </div>
        <p className="text-xs leading-relaxed text-slate-400">{theme.description}</p>
        <div className="flex flex-wrap gap-1.5">
          {theme.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-slate-800 px-2 py-0.5 text-[11px] font-medium text-slate-300">
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-auto flex items-center justify-between gap-2 pt-2">
          <label className="flex items-center gap-1.5 text-xs text-slate-400">
            <input
              type="checkbox"
              checked={compareChecked}
              disabled={compareDisabled}
              onChange={() => onToggleCompare(theme.id)}
              className="h-3.5 w-3.5 accent-indigo-500"
            />
            Compare
          </label>
          <button
            type="button"
            onClick={() => onOpen(theme.id)}
            className="rounded-lg bg-indigo-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-indigo-400"
          >
            Open
          </button>
        </div>
      </div>
    </div>
  )
}
