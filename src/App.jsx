import { useState } from 'react'
import Sidebar from './components/layout/Sidebar.jsx'
import Gallery from './components/views/Gallery.jsx'
import Cards from './components/views/Cards.jsx'
import Forms from './components/views/Forms.jsx'
import Tables from './components/views/Tables.jsx'
import Modals from './components/views/Modals.jsx'
import Pages from './components/views/Pages.jsx'
import Loaders from './components/views/Loaders.jsx'
import PlaceholderView from './components/views/PlaceholderView.jsx'
import { SECTIONS, DEFAULT_SECTION_ID } from './data/sections.js'

const VIEW_COMPONENTS = {
  gallery: Gallery,
  cards: Cards,
  forms: Forms,
  tables: Tables,
  modals: Modals,
  pages: Pages,
  loaders: Loaders,
}

const PLACEHOLDER_COPY = {
  favourites: {
    title: 'Selected / Favourites',
    description: 'Animations marked as favourites, ready to hand off to the dev team.',
    note: 'Favourite/selection tracking arrives in Phase 5.',
  },
}

function App() {
  const [activeSection, setActiveSection] = useState(DEFAULT_SECTION_ID)

  const activeLabel =
    SECTIONS.find((section) => section.id === activeSection)?.label ?? ''

  const ActiveViewComponent = VIEW_COMPONENTS[activeSection]

  return (
    <div className="app-shell">
      <Sidebar activeSection={activeSection} onSelectSection={setActiveSection} />
      <div className="app-main">
        <header className="app-header">
          <h1>{activeLabel}</h1>
        </header>
        <main className="app-main__content">
          {ActiveViewComponent ? (
            <ActiveViewComponent />
          ) : (
            <PlaceholderView {...PLACEHOLDER_COPY[activeSection]} />
          )}
        </main>
      </div>
    </div>
  )
}

export default App
