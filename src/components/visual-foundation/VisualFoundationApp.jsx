import { useMemo, useState } from 'react'
import { VISUAL_THEMES, VISUAL_THEME_MAP, ALL_TAGS } from '../../data/visual-foundation/themes.js'
import { useVisualFoundation } from '../../context/VisualFoundationContext.jsx'
import ThemeStage from './ThemeStage.jsx'
import PageTemplate from './PageTemplate.jsx'
import PreviewCard from './PreviewCard.jsx'
import ControlPanel from './ControlPanel.jsx'
import CompareView from './CompareView.jsx'

const MAX_COMPARE = 3

export default function VisualFoundationApp() {
  const {
    favourites,
    isFavourite,
    toggleFavourite,
    selectionEnabled,
    updateFavouriteSettings,
    getFavouriteSettings,
  } = useVisualFoundation()
  const [mode, setMode] = useState('gallery') // 'gallery' | 'detail' | 'compare'
  const [selectedId, setSelectedId] = useState(null)
  const [overrides, setOverrides] = useState({})
  const [activeTag, setActiveTag] = useState(null)
  const [favouritesOnly, setFavouritesOnly] = useState(false)
  const [compareIds, setCompareIds] = useState([])

  const filteredThemes = useMemo(() => {
    return VISUAL_THEMES.filter((t) => {
      if (favouritesOnly && !favourites.has(t.id)) return false
      if (activeTag && !t.tags.includes(activeTag)) return false
      return true
    })
  }, [activeTag, favouritesOnly, favourites])

  const selectedTheme = selectedId ? VISUAL_THEME_MAP[selectedId] : null
  const compareThemes = compareIds.map((id) => VISUAL_THEME_MAP[id])

  const openDetail = (id) => {
    setSelectedId(id)
    setOverrides(getFavouriteSettings(id))
    setMode('detail')
  }

  const toggleCompare = (id) => {
    setCompareIds((prev) => {
      if (prev.includes(id)) return prev.filter((existing) => existing !== id)
      if (prev.length >= MAX_COMPARE) return prev
      return [...prev, id]
    })
  }

  const changeOverride = (key, value) => {
    setOverrides((previous) => {
      const next = { ...previous, [key]: value }
      if (selectedTheme && isFavourite(selectedTheme.id)) {
        updateFavouriteSettings(selectedTheme.id, next)
      }
      return next
    })
  }

  return (
    <div className="flex flex-col gap-6 rounded-3xl bg-slate-950 p-5 sm:p-6">
      <header className="flex flex-col gap-3">
        <div>
          <h2 className="text-lg font-bold text-white">Visual Foundation Gallery</h2>
          <p className="text-sm text-slate-400">
            30 premium visual directions on real page content — pick a design foundation for the product.
          </p>
          {!selectionEnabled && (
            <p className="mt-2 text-xs font-medium text-amber-300">
              Open or create a client configuration to save a visual direction.
            </p>
          )}
        </div>

        {mode !== 'detail' && (
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTag(null)}
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                !activeTag ? 'bg-indigo-500 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              All styles
            </button>
            {ALL_TAGS.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setActiveTag(tag === activeTag ? null : tag)}
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  activeTag === tag ? 'bg-indigo-500 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {tag}
              </button>
            ))}
            <label className="ml-1 flex items-center gap-1.5 rounded-full bg-slate-800 px-3 py-1 text-xs font-medium text-slate-300">
              <input
                type="checkbox"
                checked={favouritesOnly}
                onChange={(e) => setFavouritesOnly(e.target.checked)}
                className="h-3.5 w-3.5 accent-indigo-500"
              />
              Favourites only ({favourites.size})
            </label>
            {compareIds.length > 0 && (
              <button
                type="button"
                onClick={() => setMode('compare')}
                className="ml-auto rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold text-white hover:bg-emerald-400"
              >
                Compare selected ({compareIds.length})
              </button>
            )}
          </div>
        )}

        {mode === 'detail' && selectedTheme && (
          <button
            type="button"
            onClick={() => setMode('gallery')}
            className="w-fit rounded-full bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:bg-slate-700"
          >
            ← Back to gallery
          </button>
        )}
        {mode === 'compare' && (
          <button
            type="button"
            onClick={() => setMode('gallery')}
            className="w-fit rounded-full bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:bg-slate-700"
          >
            ← Back to gallery
          </button>
        )}
      </header>

      {mode === 'gallery' && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filteredThemes.map((theme) => (
            <PreviewCard
              key={theme.id}
              theme={theme}
              onOpen={openDetail}
              compareChecked={compareIds.includes(theme.id)}
              compareDisabled={!compareIds.includes(theme.id) && compareIds.length >= MAX_COMPARE}
              onToggleCompare={toggleCompare}
            />
          ))}
          {filteredThemes.length === 0 && (
            <p className="col-span-full py-10 text-center text-sm text-slate-400">
              No styles match the current filter.
            </p>
          )}
        </div>
      )}

      {mode === 'detail' && selectedTheme && (
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_280px]">
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-start justify-between gap-3 rounded-2xl bg-slate-900 p-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-white">{selectedTheme.name}</h3>
                  <button
                    type="button"
                    onClick={() => toggleFavourite(selectedTheme.id, overrides)}
                    disabled={!selectionEnabled}
                    aria-pressed={isFavourite(selectedTheme.id)}
                    className={`text-lg leading-none disabled:cursor-not-allowed disabled:opacity-40 ${isFavourite(selectedTheme.id) ? 'text-amber-300' : 'text-slate-500 hover:text-slate-300'}`}
                  >
                    {isFavourite(selectedTheme.id) ? '★' : '☆'}
                  </button>
                </div>
                <p className="mt-1 max-w-xl text-sm text-slate-400">{selectedTheme.description}</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {selectedTheme.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-slate-800 px-2 py-0.5 text-[11px] font-medium text-slate-300">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <button
                type="button"
                onClick={() => toggleCompare(selectedTheme.id)}
                disabled={!compareIds.includes(selectedTheme.id) && compareIds.length >= MAX_COMPARE}
                className="shrink-0 rounded-lg bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:bg-slate-700 disabled:opacity-40"
              >
                {compareIds.includes(selectedTheme.id) ? '✓ In compare' : '+ Add to compare'}
              </button>
            </div>

            <div className="min-h-[640px] overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
              <ThemeStage theme={selectedTheme} overrides={overrides} className="min-h-[640px]">
                <PageTemplate pageType={selectedTheme.pageType} interactive />
              </ThemeStage>
            </div>
          </div>

          <ControlPanel
            values={{ ...selectedTheme.defaultControls, ...overrides }}
            defaults={selectedTheme.defaultControls}
            onChange={changeOverride}
            onReset={() => {
              setOverrides({})
              if (isFavourite(selectedTheme.id)) updateFavouriteSettings(selectedTheme.id, {})
            }}
          />
        </div>
      )}

      {mode === 'compare' && (
        <CompareView themes={compareThemes} onRemove={toggleCompare} onOpen={openDetail} />
      )}
    </div>
  )
}
