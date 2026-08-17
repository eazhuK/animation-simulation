import { useEffect, useState } from 'react'
import Sidebar from './components/layout/Sidebar.jsx'
import ConfigurationWorkflow from './components/layout/ConfigurationWorkflow.jsx'
import Dashboard from './components/views/Dashboard.jsx'
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
import ConfigurationReport from './components/views/ConfigurationReport.jsx'
import { SECTIONS, DEFAULT_SECTION_ID } from './data/sections.js'
import { CONFIGURATION_STEPS, CONFIGURATION_STEP_IDS } from './data/configurationSteps.js'
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
  'configuration-report': ConfigurationReport,
}

function App() {
  const [activeSection, setActiveSection] = useState(DEFAULT_SECTION_ID)
  const {
    configurations,
    activeConfiguration,
    activateConfiguration,
    getConfiguration,
    markStepVisited,
  } = useSelection()

  const isConfigurationStep = CONFIGURATION_STEP_IDS.includes(activeSection)

  useEffect(() => {
    if (activeConfiguration && isConfigurationStep) markStepVisited(activeSection)
  }, [activeConfiguration, activeSection, isConfigurationStep, markStepVisited])

  const activeLabel =
    activeSection === 'configuration-report'
      ? 'Configuration Report'
      : SECTIONS.find((section) => section.id === activeSection)?.label ?? ''

  const ActiveViewComponent = VIEW_COMPONENTS[activeSection] ?? Dashboard

  function startConfiguration(id) {
    const configuration = getConfiguration(id)
    activateConfiguration(id)
    if (!configuration) {
      setActiveSection(CONFIGURATION_STEPS[0].id)
      return
    }
    const visited = new Set(configuration.visitedSteps)
    const nextStep = CONFIGURATION_STEPS.find((step) => !visited.has(step.id))
    setActiveSection(nextStep?.id ?? CONFIGURATION_STEPS[0].id)
  }

  function viewReport(id) {
    if (id) activateConfiguration(id)
    setActiveSection('configuration-report')
  }

  return (
    <div className="app-shell">
      <Sidebar
        activeSection={activeSection}
        onSelectSection={setActiveSection}
        onCreateConfiguration={() => setActiveSection('dashboard')}
        activeConfiguration={activeConfiguration}
        configurationCount={configurations.length}
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
          {activeConfiguration && isConfigurationStep && (
            <ConfigurationWorkflow
              activeSection={activeSection}
              onSelectStep={setActiveSection}
              onDashboard={() => setActiveSection('dashboard')}
              onReport={() => setActiveSection('configuration-report')}
            />
          )}
          <ActiveViewComponent
            key={`${activeConfiguration?.id ?? 'browse'}-${activeSection}`}
            onNavigate={setActiveSection}
            onStartConfiguration={startConfiguration}
            onViewReport={viewReport}
          />
        </main>
      </div>
    </div>
  )
}

export default App
