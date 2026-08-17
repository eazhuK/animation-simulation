import { createContext, useCallback, useContext, useMemo } from 'react'
import { useSelection } from './SelectionContext.jsx'

const VisualFoundationContext = createContext(null)

/** Visual-theme selections are scoped to the active client configuration. */
export function VisualFoundationProvider({ children }) {
  const {
    activeConfiguration,
    visualThemeIds,
    toggleVisualTheme,
    updateVisualThemeSettings,
  } = useSelection()

  const toggleFavourite = useCallback(
    (id, overrides = {}) => {
      if (activeConfiguration) toggleVisualTheme(id, overrides)
    },
    [activeConfiguration, toggleVisualTheme]
  )

  const getFavouriteSettings = useCallback(
    (id) => activeConfiguration?.visualThemes[id]?.overrides ?? {},
    [activeConfiguration]
  )

  const value = useMemo(
    () => ({
      favourites: visualThemeIds,
      selectionEnabled: Boolean(activeConfiguration),
      isFavourite: (id) => visualThemeIds.has(id),
      toggleFavourite,
      updateFavouriteSettings: updateVisualThemeSettings,
      getFavouriteSettings,
    }),
    [
      activeConfiguration,
      visualThemeIds,
      toggleFavourite,
      updateVisualThemeSettings,
      getFavouriteSettings,
    ]
  )

  return <VisualFoundationContext.Provider value={value}>{children}</VisualFoundationContext.Provider>
}

export function useVisualFoundation() {
  const context = useContext(VisualFoundationContext)
  if (!context) throw new Error('useVisualFoundation must be used within a VisualFoundationProvider')
  return context
}
