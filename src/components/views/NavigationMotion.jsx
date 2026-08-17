import { useRef, useState } from 'react'
import AnimationLabel from '../shared/AnimationLabel.jsx'
import EffectShowcasePanel from '../shared/EffectShowcasePanel.jsx'

const NAVIGATION_SECTIONS = [
  { id: 'sidebar-expand', label: 'Sidebar expand / collapse' },
  { id: 'mega-menu', label: 'Mega-menu reveal' },
  { id: 'mobile-menu', label: 'Mobile menu morph' },
  { id: 'tab-indicator', label: 'Animated tab indicator' },
  { id: 'breadcrumbs', label: 'Breadcrumb transitions' },
  { id: 'floating-dock', label: 'Floating navigation dock' },
  { id: 'drawer-navigation', label: 'Drawer navigation', animationId: 'drawer-slide-in', title: 'Sliding drawer navigation', description: 'A secondary navigation surface enters from the viewport edge.' },
  { id: 'sheet-navigation', label: 'Sheet navigation', animationId: 'bottom-sheet-rise', title: 'Bottom-sheet navigation', description: 'Mobile destinations rise within a contained sheet.' },
  { id: 'curtain-navigation', label: 'Curtain navigation', animationId: 'page-curtain', title: 'Curtain route transition', description: 'A route change reveals the destination through a directional curtain.' },
  { id: 'staggered-menu', label: 'Staggered menu', animationId: 'stagger-slide-in', title: 'Staggered menu items', description: 'Menu destinations enter sequentially to support scanning.' },
]

const MOCK_NAV_ITEMS = ['Overview', 'Projects', 'Analytics', 'Customers']
const CONTENT_TABS = ['Overview', 'Activity', 'Audience', 'Settings']
const DOCK_ITEMS = ['Home', 'Search', 'Create', 'Inbox', 'Profile']

const BREADCRUMB_PATHS = [
  ['Workspace'],
  ['Workspace', 'Projects'],
  ['Workspace', 'Projects', 'Launch plan'],
  ['Workspace', 'Projects', 'Launch plan', 'Assets'],
]

export default function NavigationMotion() {
  const [activeSection, setActiveSection] = useState(NAVIGATION_SECTIONS[0].id)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [megaMenuOpen, setMegaMenuOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [contentTab, setContentTab] = useState(0)
  const [breadcrumbLevel, setBreadcrumbLevel] = useState(0)
  const [activeDockItem, setActiveDockItem] = useState(0)
  const tabRefs = useRef([])

  function selectTab(index) {
    const nextSection = NAVIGATION_SECTIONS[index]
    if (!nextSection) return

    setActiveSection(nextSection.id)
    tabRefs.current[index]?.focus()
  }

  function handleTabKeyDown(event, index) {
    let nextIndex

    if (event.key === 'ArrowRight') {
      nextIndex = (index + 1) % NAVIGATION_SECTIONS.length
    } else if (event.key === 'ArrowLeft') {
      nextIndex = (index - 1 + NAVIGATION_SECTIONS.length) % NAVIGATION_SECTIONS.length
    } else if (event.key === 'Home') {
      nextIndex = 0
    } else if (event.key === 'End') {
      nextIndex = NAVIGATION_SECTIONS.length - 1
    } else {
      return
    }

    event.preventDefault()
    event.stopPropagation()
    selectTab(nextIndex)
  }

  const breadcrumbPath = BREADCRUMB_PATHS[breadcrumbLevel]

  return (
    <section className="view navigation-motion-view">
      <header className="view__header">
        <h2>Navigation &amp; Menu Motion</h2>
        <p>
          Contained prototypes for navigation rails, menus, hierarchy, and active-state motion—each
          designed to clarify location without overwhelming the interface.
        </p>
      </header>

      <nav className="gallery-tabs" aria-label="Navigation motion sections">
        <div className="gallery-tabs__list" role="tablist" aria-orientation="horizontal">
          {NAVIGATION_SECTIONS.map((section, index) => {
            const isActive = section.id === activeSection

            return (
              <button
                className={`gallery-tabs__tab${isActive ? ' is-active' : ''}`}
                id={`navigation-tab-${section.id}`}
                key={section.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`navigation-panel-${section.id}`}
                tabIndex={isActive ? 0 : -1}
                ref={(element) => {
                  tabRefs.current[index] = element
                }}
                onClick={() => setActiveSection(section.id)}
                onKeyDown={(event) => handleTabKeyDown(event, index)}
              >
                {section.label}
              </button>
            )
          })}
        </div>
      </nav>

      <section
        className="demo-block"
        id="navigation-panel-sidebar-expand"
        role="tabpanel"
        aria-labelledby="navigation-tab-sidebar-expand"
        tabIndex={0}
        hidden={activeSection !== 'sidebar-expand'}
      >
        <div className="demo-block__head">
          <div>
            <h3>Expandable navigation rail</h3>
            <p className="demo-block__note">The full panel translates over a stable icon rail.</p>
          </div>
          <AnimationLabel animationId="sidebar-expand-motion" context="Navigation Motion → Sidebar expand" />
        </div>
        <div className="demo-controls">
          <button
            type="button"
            className="demo-btn demo-btn--primary"
            aria-expanded={sidebarOpen}
            aria-controls="navigation-sidebar-prototype"
            onClick={() => setSidebarOpen((open) => !open)}
          >
            {sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
          </button>
        </div>
        <div className="nav-prototype-frame nav-sidebar-frame" id="navigation-sidebar-prototype">
          <div className="nav-sidebar-rail" aria-hidden="true">
            {MOCK_NAV_ITEMS.map((item) => <span key={item}>{item.slice(0, 1)}</span>)}
          </div>
          <aside className={`nav-sidebar-panel${sidebarOpen ? ' is-open' : ''}`} aria-hidden={!sidebarOpen}>
            <strong>Northstar</strong>
            {MOCK_NAV_ITEMS.map((item, index) => (
              <span className={index === 0 ? 'is-active' : ''} key={item}>{item}</span>
            ))}
          </aside>
          <div className="nav-sidebar-content">
            <span className="nav-prototype-kicker">Workspace</span>
            <strong>Good morning, Alex</strong>
            <div className="nav-content-placeholder" aria-hidden="true" />
          </div>
        </div>
      </section>

      <section
        className="demo-block"
        id="navigation-panel-mega-menu"
        role="tabpanel"
        aria-labelledby="navigation-tab-mega-menu"
        tabIndex={0}
        hidden={activeSection !== 'mega-menu'}
      >
        <div className="demo-block__head">
          <div>
            <h3>Structured mega-menu reveal</h3>
            <p className="demo-block__note">A contained menu settles directly beneath its trigger.</p>
          </div>
          <AnimationLabel animationId="mega-menu-reveal" context="Navigation Motion → Mega menu" />
        </div>
        <div className="nav-prototype-frame nav-mega-frame">
          <header className="nav-mega-header">
            <strong>Northstar</strong>
            <button
              type="button"
              aria-expanded={megaMenuOpen}
              aria-controls="navigation-mega-menu"
              onClick={() => setMegaMenuOpen((open) => !open)}
            >
              Products <span aria-hidden="true">⌄</span>
            </button>
            <span>Solutions</span>
            <span>Resources</span>
          </header>
          <div
            className={`nav-mega-panel${megaMenuOpen ? ' is-open' : ''}`}
            id="navigation-mega-menu"
            aria-hidden={!megaMenuOpen}
          >
            {[
              ['Build', 'Projects', 'Automations'],
              ['Measure', 'Analytics', 'Reports'],
              ['Connect', 'Customers', 'Integrations'],
            ].map(([heading, ...items]) => (
              <div key={heading}>
                <strong>{heading}</strong>
                {items.map((item) => <span key={item}>{item}</span>)}
              </div>
            ))}
            <aside><span className="nav-prototype-kicker">FEATURED</span><strong>Spring product tour</strong></aside>
          </div>
          <div className="nav-mega-content"><strong>A calmer way to run work.</strong><span>Open Products to explore the menu.</span></div>
        </div>
      </section>

      <section
        className="demo-block"
        id="navigation-panel-mobile-menu"
        role="tabpanel"
        aria-labelledby="navigation-tab-mobile-menu"
        tabIndex={0}
        hidden={activeSection !== 'mobile-menu'}
      >
        <div className="demo-block__head">
          <div>
            <h3>Mobile menu transformation</h3>
            <p className="demo-block__note">The trigger morphs while the menu translates into the phone frame.</p>
          </div>
          <AnimationLabel animationId="mobile-menu-morph" context="Navigation Motion → Mobile menu" />
        </div>
        <div className="nav-phone-frame">
          <header>
            <strong>Northstar</strong>
            <button
              type="button"
              className={`nav-mobile-trigger${mobileMenuOpen ? ' is-open' : ''}`}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="navigation-mobile-menu"
              onClick={() => setMobileMenuOpen((open) => !open)}
            >
              <span /><span /><span />
            </button>
          </header>
          <div className="nav-phone-content"><span>Dashboard</span><strong>Track what matters.</strong></div>
          <nav
            className={`nav-mobile-panel${mobileMenuOpen ? ' is-open' : ''}`}
            id="navigation-mobile-menu"
            aria-hidden={!mobileMenuOpen}
          >
            {MOCK_NAV_ITEMS.map((item, index) => (
              <button type="button" tabIndex={mobileMenuOpen ? 0 : -1} key={item} onClick={() => setMobileMenuOpen(false)}>
                <span>{String(index + 1).padStart(2, '0')}</span>{item}
              </button>
            ))}
          </nav>
        </div>
      </section>

      <section
        className="demo-block"
        id="navigation-panel-tab-indicator"
        role="tabpanel"
        aria-labelledby="navigation-tab-tab-indicator"
        tabIndex={0}
        hidden={activeSection !== 'tab-indicator'}
      >
        <div className="demo-block__head">
          <div>
            <h3>Travelling active-tab indicator</h3>
            <p className="demo-block__note">The indicator moves independently beneath stable labels.</p>
          </div>
          <AnimationLabel animationId="tab-indicator-slide" context="Navigation Motion → Tab indicator" />
        </div>
        <div className="nav-prototype-frame nav-tabs-frame">
          <nav className="nav-content-tabs" aria-label="Account sections" style={{ '--indicator-offset': `${contentTab * 100}%` }}>
            {CONTENT_TABS.map((tab, index) => (
              <button type="button" aria-current={contentTab === index ? 'page' : undefined} key={tab} onClick={() => setContentTab(index)}>
                {tab}
              </button>
            ))}
            <span className="nav-content-tabs__indicator" aria-hidden="true" />
          </nav>
          <div className="nav-tab-content" key={contentTab} aria-live="polite">
            <span className="nav-prototype-kicker">{CONTENT_TABS[contentTab]}</span>
            <strong>{CONTENT_TABS[contentTab]} content</strong>
            <p>The active context changes while the navigation remains visually stable.</p>
          </div>
        </div>
      </section>

      <section
        className="demo-block"
        id="navigation-panel-breadcrumbs"
        role="tabpanel"
        aria-labelledby="navigation-tab-breadcrumbs"
        tabIndex={0}
        hidden={activeSection !== 'breadcrumbs'}
      >
        <div className="demo-block__head">
          <div>
            <h3>Hierarchical breadcrumb transition</h3>
            <p className="demo-block__note">Move forward and back through a realistic content hierarchy.</p>
          </div>
          <AnimationLabel animationId="breadcrumb-transition" context="Navigation Motion → Breadcrumbs" />
        </div>
        <div className="demo-controls">
          <button type="button" className="demo-btn" disabled={breadcrumbLevel === 0} onClick={() => setBreadcrumbLevel((level) => level - 1)}>← Back</button>
          <button type="button" className="demo-btn demo-btn--primary" disabled={breadcrumbLevel === BREADCRUMB_PATHS.length - 1} onClick={() => setBreadcrumbLevel((level) => level + 1)}>Go deeper →</button>
        </div>
        <div className="nav-prototype-frame nav-breadcrumb-frame">
          <nav className="nav-breadcrumbs anim-breadcrumb-transition" aria-label="Breadcrumb" key={breadcrumbLevel}>
            {breadcrumbPath.map((item, index) => (
              <span key={item}>
                {index > 0 && <i aria-hidden="true">/</i>}
                <span aria-current={index === breadcrumbPath.length - 1 ? 'page' : undefined}>{item}</span>
              </span>
            ))}
          </nav>
          <div className="nav-breadcrumb-content" key={`content-${breadcrumbLevel}`}>
            <span className="nav-prototype-kicker">LEVEL {breadcrumbLevel + 1}</span>
            <strong>{breadcrumbPath.at(-1)}</strong>
            <p>Context remains visible as the user moves deeper.</p>
          </div>
        </div>
      </section>

      <section
        className="demo-block"
        id="navigation-panel-floating-dock"
        role="tabpanel"
        aria-labelledby="navigation-tab-floating-dock"
        tabIndex={0}
        hidden={activeSection !== 'floating-dock'}
      >
        <div className="demo-block__head">
          <div>
            <h3>Floating navigation dock</h3>
            <p className="demo-block__note">Hover or select a destination to magnify and lift it.</p>
          </div>
          <AnimationLabel animationId="floating-dock-magnify" context="Navigation Motion → Floating dock" />
        </div>
        <div className="nav-prototype-frame nav-dock-frame">
          <div className="nav-dock-content" aria-live="polite">
            <span className="nav-prototype-kicker">CURRENT DESTINATION</span>
            <strong>{DOCK_ITEMS[activeDockItem]}</strong>
          </div>
          <nav className="nav-floating-dock" aria-label="Prototype dock navigation">
            {DOCK_ITEMS.map((item, index) => (
              <button
                type="button"
                aria-label={item}
                aria-current={activeDockItem === index ? 'page' : undefined}
                className={activeDockItem === index ? 'is-active' : ''}
                key={item}
                onClick={() => setActiveDockItem(index)}
              >
                <span aria-hidden="true">{item.slice(0, 1)}</span>
              </button>
            ))}
          </nav>
        </div>
      </section>

      {NAVIGATION_SECTIONS.slice(6).map((section) => (
        <EffectShowcasePanel
          active={activeSection === section.id}
          animationId={section.animationId}
          context={`Navigation & Menu Motion → ${section.title}`}
          description={section.description}
          id={section.id}
          idPrefix="navigation"
          key={section.id}
          kind="navigation"
          title={section.title}
        />
      ))}
    </section>
  )
}
