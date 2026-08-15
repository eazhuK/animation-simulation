import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

const FAVOURITES_KEY = 'ui-animation-catalogue:favourites'
const USAGE_KEY = 'ui-animation-catalogue:usage'

const SelectionContext = createContext(null)

function readJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

/**
 * Shared client-selection state: favourited animation ids (persisted) plus a map of which
 * "Section → demo block" contexts each animation has actually been shown in (also persisted, so
 * the Favourites summary keeps its component mapping across reloads).
 */
export function SelectionProvider({ children }) {
  const [favourites, setFavourites] = useState(() => new Set(readJSON(FAVOURITES_KEY, [])))
  const [usage, setUsage] = useState(() => {
    const stored = readJSON(USAGE_KEY, {})
    const map = new Map()
    Object.entries(stored).forEach(([id, contexts]) => map.set(id, new Set(contexts)))
    return map
  })

  useEffect(() => {
    localStorage.setItem(FAVOURITES_KEY, JSON.stringify([...favourites]))
  }, [favourites])

  useEffect(() => {
    const plain = {}
    usage.forEach((contexts, id) => {
      plain[id] = [...contexts]
    })
    localStorage.setItem(USAGE_KEY, JSON.stringify(plain))
  }, [usage])

  const toggleFavourite = useCallback((id) => {
    setFavourites((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }, [])

  const registerUsage = useCallback((id, context) => {
    if (!id || !context) return
    setUsage((prev) => {
      const existing = prev.get(id)
      if (existing?.has(context)) return prev
      const next = new Map(prev)
      next.set(id, new Set(existing).add(context))
      return next
    })
  }, [])

  const value = useMemo(
    () => ({
      favourites,
      isFavourite: (id) => favourites.has(id),
      toggleFavourite,
      registerUsage,
      getUsage: (id) => Array.from(usage.get(id) ?? []),
    }),
    [favourites, usage, toggleFavourite, registerUsage]
  )

  return <SelectionContext.Provider value={value}>{children}</SelectionContext.Provider>
}

export function useSelection() {
  const ctx = useContext(SelectionContext)
  if (!ctx) throw new Error('useSelection must be used within a SelectionProvider')
  return ctx
}
