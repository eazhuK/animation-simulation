import { useMemo, useState } from 'react'
import Sidebar from './components/layout/Sidebar.jsx'
import DemoMode from './components/layout/DemoMode.jsx'
import Gallery from './components/views/Gallery.jsx'
import Cards from './components/views/Cards.jsx'
import Forms from './components/views/Forms.jsx'
import Tables from './components/views/Tables.jsx'
import Modals from './components/views/Modals.jsx'
import Pages from './components/views/Pages.jsx'
import Loaders from './components/views/Loaders.jsx'
import ThreeDTransformations from './components/views/ThreeDTransformations.jsx'
import DataVisualizationMotion from './components/views/DataVisualizationMotion.jsx'
import NavigationMotion from './components/views/NavigationMotion.jsx'
import TextBrandMotion from './components/views/TextBrandMotion.jsx'
import VisualFoundationGallery from './components/views/VisualFoundationGallery.jsx'
import Favourites from './components/views/Favourites.jsx'
import Dashboard from './components/views/Dashboard.jsx'
import SavedCategories from './components/views/SavedCategories.jsx'
import Drafts from './components/views/Drafts.jsx'
import { SECTIONS, DEFAULT_SECTION_ID } from './data/sections.js'
import { ANIMATIONS_BY_ID } from './data/animations.js'
import { useSelection } from './context/SelectionContext.jsx'

const VIEW_COMPONENTS = {
  dashboard: Dashboard,
  gallery: Gallery,
  cards: Cards,
  forms: Forms,
  tables: Tables,
  modals: Modals,
  pages: Pages,
  loaders: Loaders,
  'three-d': ThreeDTransformations,
  'data-motion': DataVisualizationMotion,
  'navigation-motion': NavigationMotion,
  'text-brand-motion': TextBrandMotion,
  'visual-foundation': VisualFoundationGallery,
  'saved-categories': SavedCategories,
  drafts: Drafts,
  favourites: Favourites,
}

function App() {
  const [activeSection, setActiveSection] = useState(DEFAULT_SECTION_ID)
  const [isDemoMode, setIsDemoMode] = useState(false)
  const { favourites, drafts } = useSelection()

  const sectionCounts = useMemo(
    () => ({
      'saved-categories': new Set(
        Array.from(favourites).map((id) => ANIMATIONS_BY_ID[id]?.category).filter(Boolean)
      ).size,
      drafts: drafts.size,
      favourites: favourites.size,
    }),
    [favourites, drafts]
  )

  const activeLabel =
    SECTIONS.find((section) => section.id === activeSection)?.label ?? ''

  const ActiveViewComponent = VIEW_COMPONENTS[activeSection]

  if (isDemoMode) {
    return (
      <DemoMode
        activeSection={activeSection}
        onSelectSection={setActiveSection}
        onExit={() => setIsDemoMode(false)}
      >
        <ActiveViewComponent onNavigate={setActiveSection} />
      </DemoMode>
    )
  }

  return (
    <div className="app-shell">
      <Sidebar
        activeSection={activeSection}
        onSelectSection={setActiveSection}
        onStartDemo={() => setIsDemoMode(true)}
        sectionCounts={sectionCounts}
      />
      <div className="app-main">
        <header className="app-header">
          <h1>{activeLabel}</h1>
        </header>
        <main
          className={`app-main__content${
            activeSection === 'gallery' ? ' app-main__content--gallery' : ''
          }`}
        >
          <ActiveViewComponent onNavigate={setActiveSection} />
        </main>
      </div>
    </div>
  )
}

export default App
