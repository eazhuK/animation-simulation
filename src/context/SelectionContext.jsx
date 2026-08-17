import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

const FAVOURITES_KEY = 'ui-animation-catalogue:favourites'
const USAGE_KEY = 'ui-animation-catalogue:usage'
const WORKSPACE_KEY = 'ui-animation-catalogue:workspace:v1'

const DEFAULT_SETTINGS = {
  durationMs: 500,
  delayMs: 0,
  speed: 1,
}

const SelectionContext = createContext(null)

function readJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

function writeJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // The catalogue remains usable if private browsing or storage limits block persistence.
  }
}

function normaliseSettings(settings = {}) {
  return {
    durationMs: Number(settings.durationMs) || DEFAULT_SETTINGS.durationMs,
    delayMs: Number.isFinite(Number(settings.delayMs)) ? Number(settings.delayMs) : DEFAULT_SETTINGS.delayMs,
    speed: Number(settings.speed) || DEFAULT_SETTINGS.speed,
  }
}

function readInitialWorkspace() {
  const stored = readJSON(WORKSPACE_KEY, null)
  if (stored && typeof stored === 'object' && !Array.isArray(stored)) return stored

  const migrated = {}
  readJSON(FAVOURITES_KEY, []).forEach((id) => {
    migrated[id] = {
      status: 'saved',
      settings: DEFAULT_SETTINGS,
      updatedAt: null,
    }
  })
  return migrated
}

/**
 * Frontend-only workspace state. Saved animations, drafts, preview settings, and usage context
 * are persisted in localStorage so the dashboard survives refreshes without a backend.
 */
export function SelectionProvider({ children }) {
  const [workspace, setWorkspace] = useState(readInitialWorkspace)
  const [usage, setUsage] = useState(() => {
    const stored = readJSON(USAGE_KEY, {})
    const map = new Map()
    Object.entries(stored).forEach(([id, contexts]) => map.set(id, new Set(contexts)))
    return map
  })

  const favourites = useMemo(
    () => new Set(Object.keys(workspace).filter((id) => workspace[id]?.status === 'saved')),
    [workspace]
  )
  const drafts = useMemo(
    () => new Set(Object.keys(workspace).filter((id) => workspace[id]?.status === 'draft')),
    [workspace]
  )

  useEffect(() => {
    writeJSON(WORKSPACE_KEY, workspace)
    writeJSON(FAVOURITES_KEY, [...favourites])
  }, [workspace, favourites])

  useEffect(() => {
    const plain = {}
    usage.forEach((contexts, id) => {
      plain[id] = [...contexts]
    })
    writeJSON(USAGE_KEY, plain)
  }, [usage])

  const setAnimationStatus = useCallback((id, status, settings) => {
    if (!id) return
    setWorkspace((previous) => {
      const current = previous[id]
      return {
        ...previous,
        [id]: {
          status,
          settings: normaliseSettings(settings ?? current?.settings),
          updatedAt: new Date().toISOString(),
        },
      }
    })
  }, [])

  const saveAnimation = useCallback(
    (id, settings) => setAnimationStatus(id, 'saved', settings),
    [setAnimationStatus]
  )

  const saveDraft = useCallback(
    (id, settings) => setAnimationStatus(id, 'draft', settings),
    [setAnimationStatus]
  )

  const removeAnimation = useCallback((id) => {
    setWorkspace((previous) => {
      if (!previous[id]) return previous
      const next = { ...previous }
      delete next[id]
      return next
    })
  }, [])

  const toggleFavourite = useCallback(
    (id) => {
      if (workspace[id]?.status === 'saved') {
        removeAnimation(id)
      } else {
        saveAnimation(id, workspace[id]?.settings)
      }
    },
    [workspace, removeAnimation, saveAnimation]
  )

  const registerUsage = useCallback((id, context) => {
    if (!id || !context) return
    setUsage((previous) => {
      const existing = previous.get(id)
      if (existing?.has(context)) return previous
      const next = new Map(previous)
      next.set(id, new Set(existing).add(context))
      return next
    })
  }, [])

  const getSelection = useCallback((id) => workspace[id] ?? null, [workspace])
  const getUsage = useCallback((id) => Array.from(usage.get(id) ?? []), [usage])

  const value = useMemo(
    () => ({
      workspace,
      favourites,
      drafts,
      isFavourite: (id) => favourites.has(id),
      isDraft: (id) => drafts.has(id),
      getSelection,
      saveAnimation,
      saveDraft,
      removeAnimation,
      toggleFavourite,
      registerUsage,
      getUsage,
    }),
    [
      workspace,
      favourites,
      drafts,
      getSelection,
      saveAnimation,
      saveDraft,
      removeAnimation,
      toggleFavourite,
      registerUsage,
      getUsage,
    ]
  )

  return <SelectionContext.Provider value={value}>{children}</SelectionContext.Provider>
}

export function useSelection() {
  const context = useContext(SelectionContext)
  if (!context) throw new Error('useSelection must be used within a SelectionProvider')
  return context
}
