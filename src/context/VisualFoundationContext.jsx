import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

const FAVOURITES_KEY = 'ui-animation-catalogue:visual-foundation-favourites'

function readJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

const VisualFoundationContext = createContext(null)

/** Persisted favourite theme ids for the Visual Foundation Gallery — kept separate from the animation catalogue's own favourites/localStorage key. */
export function VisualFoundationProvider({ children }) {
  const [favourites, setFavourites] = useState(() => new Set(readJSON(FAVOURITES_KEY, [])))

  useEffect(() => {
    localStorage.setItem(FAVOURITES_KEY, JSON.stringify([...favourites]))
  }, [favourites])

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

  const value = useMemo(
    () => ({ favourites, isFavourite: (id) => favourites.has(id), toggleFavourite }),
    [favourites, toggleFavourite]
  )

  return <VisualFoundationContext.Provider value={value}>{children}</VisualFoundationContext.Provider>
}

export function useVisualFoundation() {
  const ctx = useContext(VisualFoundationContext)
  if (!ctx) throw new Error('useVisualFoundation must be used within a VisualFoundationProvider')
  return ctx
}
