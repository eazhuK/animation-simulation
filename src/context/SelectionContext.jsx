import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { CONFIGURATION_STEP_IDS } from '../data/configurationSteps.js'

const CONFIGURATIONS_KEY = 'ui-animation-catalogue:configurations:v2'
const LEGACY_FAVOURITES_KEY = 'ui-animation-catalogue:favourites'
const LEGACY_USAGE_KEY = 'ui-animation-catalogue:usage'
const LEGACY_WORKSPACE_KEY = 'ui-animation-catalogue:workspace:v1'
const LEGACY_VISUAL_KEY = 'ui-animation-catalogue:visual-foundation-favourites'

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
    // Keep the current session usable if browser storage is unavailable.
  }
}

function now() {
  return new Date().toISOString()
}

function createId() {
  return globalThis.crypto?.randomUUID?.() ?? `configuration-${Date.now()}-${Math.random()}`
}

function normaliseSettings(settings = {}) {
  return {
    durationMs: Number(settings.durationMs) || DEFAULT_SETTINGS.durationMs,
    delayMs: Number.isFinite(Number(settings.delayMs))
      ? Number(settings.delayMs)
      : DEFAULT_SETTINGS.delayMs,
    speed: Number(settings.speed) || DEFAULT_SETTINGS.speed,
  }
}

function normaliseConfiguration(configuration) {
  return {
    id: configuration.id,
    clientName: configuration.clientName || 'Unnamed client',
    configurationName: configuration.configurationName || 'UI animation configuration',
    notes: configuration.notes || '',
    status: configuration.status === 'saved' ? 'saved' : 'draft',
    createdAt: configuration.createdAt || now(),
    updatedAt: configuration.updatedAt || configuration.createdAt || now(),
    completedAt: configuration.completedAt || null,
    visitedSteps: Array.isArray(configuration.visitedSteps) ? configuration.visitedSteps : [],
    selections: configuration.selections || {},
    visualThemes: configuration.visualThemes || {},
    usage: configuration.usage || {},
  }
}

function readInitialStore() {
  const stored = readJSON(CONFIGURATIONS_KEY, null)
  if (stored?.configurations && typeof stored.configurations === 'object') {
    const configurations = Object.fromEntries(
      Object.entries(stored.configurations).map(([id, configuration]) => [
        id,
        normaliseConfiguration({ ...configuration, id }),
      ])
    )
    return {
      configurations,
      activeConfigurationId: configurations[stored.activeConfigurationId]
        ? stored.activeConfigurationId
        : null,
    }
  }

  const legacyWorkspace = readJSON(LEGACY_WORKSPACE_KEY, {})
  const legacyFavouriteIds = readJSON(LEGACY_FAVOURITES_KEY, [])
  const legacyUsage = readJSON(LEGACY_USAGE_KEY, {})
  const legacyVisualIds = readJSON(LEGACY_VISUAL_KEY, [])
  const legacyIds = new Set([...Object.keys(legacyWorkspace), ...legacyFavouriteIds])

  if (legacyIds.size === 0 && legacyVisualIds.length === 0) {
    return { configurations: {}, activeConfigurationId: null }
  }

  const id = createId()
  const timestamp = now()
  const selections = {}
  legacyIds.forEach((animationId) => {
    selections[animationId] = {
      settings: normaliseSettings(legacyWorkspace[animationId]?.settings),
      selectedAt: legacyWorkspace[animationId]?.updatedAt || timestamp,
    }
  })
  const visualThemes = Object.fromEntries(
    legacyVisualIds.map((themeId) => [themeId, { overrides: {}, selectedAt: timestamp }])
  )

  return {
    activeConfigurationId: id,
    configurations: {
      [id]: normaliseConfiguration({
        id,
        clientName: 'Imported client',
        configurationName: 'Imported configuration',
        status: 'draft',
        createdAt: timestamp,
        updatedAt: timestamp,
        selections,
        visualThemes,
        usage: legacyUsage,
      }),
    },
  }
}

function progressFor(configuration) {
  const visited = new Set(configuration?.visitedSteps ?? [])
  const completed = CONFIGURATION_STEP_IDS.filter((stepId) => visited.has(stepId)).length
  return {
    completed,
    total: CONFIGURATION_STEP_IDS.length,
    percent: Math.round((completed / CONFIGURATION_STEP_IDS.length) * 100),
    missingSteps: CONFIGURATION_STEP_IDS.filter((stepId) => !visited.has(stepId)),
  }
}

/**
 * Multi-client, frontend-only configuration store. Every client configuration owns its own
 * selections, visual themes, step progress, usage history, and draft/saved lifecycle.
 */
export function SelectionProvider({ children }) {
  const [store, setStore] = useState(readInitialStore)

  useEffect(() => {
    writeJSON(CONFIGURATIONS_KEY, store)
  }, [store])

  const configurations = useMemo(
    () =>
      Object.values(store.configurations).sort((a, b) =>
        (b.updatedAt ?? '').localeCompare(a.updatedAt ?? '')
      ),
    [store.configurations]
  )

  const activeConfiguration =
    store.configurations[store.activeConfigurationId] ?? null

  const updateActiveConfiguration = useCallback((updater) => {
    setStore((previous) => {
      const id = previous.activeConfigurationId
      const current = previous.configurations[id]
      if (!current) return previous
      const updated = updater(current)
      if (updated === current) return previous
      return {
        ...previous,
        configurations: {
          ...previous.configurations,
          [id]: updated,
        },
      }
    })
  }, [])

  const createConfiguration = useCallback(({ clientName, configurationName, notes = '' }) => {
    const id = createId()
    const timestamp = now()
    const configuration = normaliseConfiguration({
      id,
      clientName: clientName.trim(),
      configurationName: configurationName.trim(),
      notes: notes.trim(),
      status: 'draft',
      createdAt: timestamp,
      updatedAt: timestamp,
    })
    setStore((previous) => ({
      activeConfigurationId: id,
      configurations: { ...previous.configurations, [id]: configuration },
    }))
    return id
  }, [])

  const activateConfiguration = useCallback((id) => {
    setStore((previous) =>
      previous.configurations[id]
        ? { ...previous, activeConfigurationId: id }
        : previous
    )
  }, [])

  const closeConfiguration = useCallback(() => {
    setStore((previous) => ({ ...previous, activeConfigurationId: null }))
  }, [])

  const deleteConfiguration = useCallback((id) => {
    setStore((previous) => {
      if (!previous.configurations[id]) return previous
      const configurations = { ...previous.configurations }
      delete configurations[id]
      return {
        configurations,
        activeConfigurationId:
          previous.activeConfigurationId === id ? null : previous.activeConfigurationId,
      }
    })
  }, [])

  const updateConfigurationDetails = useCallback(
    (details) => {
      updateActiveConfiguration((current) => ({
        ...current,
        ...details,
        status: 'draft',
        completedAt: null,
        updatedAt: now(),
      }))
    },
    [updateActiveConfiguration]
  )

  const markStepVisited = useCallback(
    (stepId) => {
      if (!CONFIGURATION_STEP_IDS.includes(stepId)) return
      updateActiveConfiguration((current) => {
        if (current.visitedSteps.includes(stepId)) return current
        return {
          ...current,
          visitedSteps: [...current.visitedSteps, stepId],
          updatedAt: now(),
        }
      })
    },
    [updateActiveConfiguration]
  )

  const selectAnimation = useCallback(
    (id, settings) => {
      if (!id) return
      updateActiveConfiguration((current) => ({
        ...current,
        status: 'draft',
        completedAt: null,
        updatedAt: now(),
        selections: {
          ...current.selections,
          [id]: {
            settings: normaliseSettings(settings ?? current.selections[id]?.settings),
            selectedAt: current.selections[id]?.selectedAt || now(),
          },
        },
      }))
    },
    [updateActiveConfiguration]
  )

  const removeAnimation = useCallback(
    (id) => {
      updateActiveConfiguration((current) => {
        if (!current.selections[id]) return current
        const selections = { ...current.selections }
        delete selections[id]
        return {
          ...current,
          selections,
          status: 'draft',
          completedAt: null,
          updatedAt: now(),
        }
      })
    },
    [updateActiveConfiguration]
  )

  const registerUsage = useCallback(
    (id, context) => {
      if (!id || !context) return
      updateActiveConfiguration((current) => {
        const contexts = current.usage[id] ?? []
        if (contexts.includes(context)) return current
        return {
          ...current,
          usage: { ...current.usage, [id]: [...contexts, context] },
        }
      })
    },
    [updateActiveConfiguration]
  )

  const toggleVisualTheme = useCallback(
    (themeId, overrides = {}) => {
      updateActiveConfiguration((current) => {
        const visualThemes = { ...current.visualThemes }
        if (visualThemes[themeId]) {
          delete visualThemes[themeId]
        } else {
          visualThemes[themeId] = { overrides, selectedAt: now() }
        }
        return {
          ...current,
          visualThemes,
          status: 'draft',
          completedAt: null,
          updatedAt: now(),
        }
      })
    },
    [updateActiveConfiguration]
  )

  const updateVisualThemeSettings = useCallback(
    (themeId, overrides) => {
      updateActiveConfiguration((current) => {
        if (!current.visualThemes[themeId]) return current
        return {
          ...current,
          status: 'draft',
          completedAt: null,
          updatedAt: now(),
          visualThemes: {
            ...current.visualThemes,
            [themeId]: { ...current.visualThemes[themeId], overrides },
          },
        }
      })
    },
    [updateActiveConfiguration]
  )

  const saveConfigurationDraft = useCallback(() => {
    updateActiveConfiguration((current) => ({
      ...current,
      status: 'draft',
      completedAt: null,
      updatedAt: now(),
    }))
  }, [updateActiveConfiguration])

  const completeConfiguration = useCallback(() => {
    if (!activeConfiguration) return { ok: false, reason: 'No active configuration.' }
    const progress = progressFor(activeConfiguration)
    if (progress.missingSteps.length > 0) {
      return { ok: false, reason: 'Visit every configuration step first.', ...progress }
    }
    const selectionCount =
      Object.keys(activeConfiguration.selections).length +
      Object.keys(activeConfiguration.visualThemes).length
    if (selectionCount === 0) {
      return { ok: false, reason: 'Select at least one animation or visual theme.' }
    }
    const timestamp = now()
    updateActiveConfiguration((current) => ({
      ...current,
      status: 'saved',
      completedAt: timestamp,
      updatedAt: timestamp,
    }))
    return { ok: true }
  }, [activeConfiguration, updateActiveConfiguration])

  const favourites = useMemo(
    () => new Set(Object.keys(activeConfiguration?.selections ?? {})),
    [activeConfiguration]
  )
  const visualThemeIds = useMemo(
    () => new Set(Object.keys(activeConfiguration?.visualThemes ?? {})),
    [activeConfiguration]
  )

  const getConfiguration = useCallback(
    (id) => store.configurations[id] ?? null,
    [store.configurations]
  )
  const getSelection = useCallback(
    (id) => {
      const selection = activeConfiguration?.selections[id]
      return selection ? { ...selection, status: 'selected' } : null
    },
    [activeConfiguration]
  )
  const getUsage = useCallback(
    (id) => activeConfiguration?.usage[id] ?? [],
    [activeConfiguration]
  )
  const getConfigurationProgress = useCallback((configuration) => progressFor(configuration), [])

  const toggleFavourite = useCallback(
    (id) => {
      if (favourites.has(id)) removeAnimation(id)
      else selectAnimation(id)
    },
    [favourites, removeAnimation, selectAnimation]
  )

  const value = useMemo(
    () => ({
      configurations,
      activeConfiguration,
      createConfiguration,
      activateConfiguration,
      closeConfiguration,
      deleteConfiguration,
      updateConfigurationDetails,
      markStepVisited,
      saveConfigurationDraft,
      completeConfiguration,
      getConfiguration,
      getConfigurationProgress,
      workspace: activeConfiguration?.selections ?? {},
      favourites,
      drafts: new Set(),
      visualThemeIds,
      isFavourite: (id) => favourites.has(id),
      isDraft: () => false,
      getSelection,
      saveAnimation: selectAnimation,
      saveDraft: selectAnimation,
      removeAnimation,
      toggleFavourite,
      registerUsage,
      getUsage,
      toggleVisualTheme,
      updateVisualThemeSettings,
    }),
    [
      configurations,
      activeConfiguration,
      createConfiguration,
      activateConfiguration,
      closeConfiguration,
      deleteConfiguration,
      updateConfigurationDetails,
      markStepVisited,
      saveConfigurationDraft,
      completeConfiguration,
      getConfiguration,
      getConfigurationProgress,
      favourites,
      visualThemeIds,
      getSelection,
      selectAnimation,
      removeAnimation,
      toggleFavourite,
      registerUsage,
      getUsage,
      toggleVisualTheme,
      updateVisualThemeSettings,
    ]
  )

  return <SelectionContext.Provider value={value}>{children}</SelectionContext.Provider>
}

export function useSelection() {
  const context = useContext(SelectionContext)
  if (!context) throw new Error('useSelection must be used within a SelectionProvider')
  return context
}
