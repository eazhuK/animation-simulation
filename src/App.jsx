import { useState } from 'react'
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
import { SECTIONS, DEFAULT_SECTION_ID } from './data/sections.js'

const VIEW_COMPONENTS = {
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
  favourites: Favourites,
}

function App() {
  const [activeSection, setActiveSection] = useState(DEFAULT_SECTION_ID)
  const [isDemoMode, setIsDemoMode] = useState(false)

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
        <ActiveViewComponent />
      </DemoMode>
    )
  }

  return (
    <div className="app-shell">
      <Sidebar
        activeSection={activeSection}
        onSelectSection={setActiveSection}
        onStartDemo={() => setIsDemoMode(true)}
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
          <ActiveViewComponent />
        </main>
      </div>
    </div>
  )
}

export default App
