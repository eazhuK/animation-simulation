import { useRef, useState } from 'react'
import AnimationLabel from '../shared/AnimationLabel.jsx'
import EffectShowcasePanel from '../shared/EffectShowcasePanel.jsx'

const THREE_D_SECTIONS = [
  { id: 'interactive-tilt', label: 'Interactive tilt' },
  { id: 'flip-reveal', label: 'Flip reveal' },
  { id: 'cube-transition', label: 'Cube transition' },
  { id: 'layered-depth', label: 'Layered depth' },
  { id: 'spatial-carousel', label: 'Spatial carousel' },
  { id: 'horizontal-flip', label: 'Horizontal flip', animationId: 'flip-in-horizontal', title: 'Horizontal plane flip', description: 'A spatial panel rotates into view around its horizontal axis.' },
  { id: 'vertical-flip', label: 'Vertical flip', animationId: 'flip-in-vertical', title: 'Vertical plane flip', description: 'A spatial panel turns into view around its vertical axis.' },
  { id: 'modal-depth-flip', label: 'Modal depth flip', animationId: 'modal-flip-in', title: 'Modal depth rotation', description: 'A contained surface rotates forward like a dimensional dialog.' },
  { id: 'rotate-depth', label: 'Rotating depth', animationId: 'rotate-in', title: 'Rotating depth entrance', description: 'Layered surfaces rotate and settle toward the viewer.' },
  { id: 'zoom-depth', label: 'Zoom depth', animationId: 'zoom-bounce-in', title: 'Zoom-and-depth entrance', description: 'A spatial composition advances with a restrained overshoot.' },
]

const CUBE_FACES = [
  { id: 'front', eyebrow: 'Overview', title: '84% engagement', detail: 'Live campaign performance' },
  { id: 'right', eyebrow: 'Audience', title: '12.4k people', detail: 'Across four active segments' },
  { id: 'back', eyebrow: 'Revenue', title: '£48.2k MRR', detail: 'Up 18% this quarter' },
  { id: 'left', eyebrow: 'Pipeline', title: '126 deals', detail: '32 ready for review' },
]

const CAROUSEL_ITEMS = [
  { title: 'Analytics', value: '84%', note: 'Engagement' },
  { title: 'Revenue', value: '£48k', note: 'Monthly' },
  { title: 'Audience', value: '12.4k', note: 'People' },
  { title: 'Pipeline', value: '126', note: 'Deals' },
  { title: 'Retention', value: '92%', note: 'This month' },
]

export default function ThreeDTransformations() {
  const [activeSection, setActiveSection] = useState(THREE_D_SECTIONS[0].id)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [isFlipped, setIsFlipped] = useState(false)
  const [cubeFace, setCubeFace] = useState(0)
  const [depthKey, setDepthKey] = useState(0)
  const [carouselIndex, setCarouselIndex] = useState(0)
  const tabRefs = useRef([])

  function selectTab(index) {
    const nextSection = THREE_D_SECTIONS[index]
    if (!nextSection) return

    setActiveSection(nextSection.id)
    tabRefs.current[index]?.focus()
  }

  function handleTabKeyDown(event, index) {
    let nextIndex

    if (event.key === 'ArrowRight') {
      nextIndex = (index + 1) % THREE_D_SECTIONS.length
    } else if (event.key === 'ArrowLeft') {
      nextIndex = (index - 1 + THREE_D_SECTIONS.length) % THREE_D_SECTIONS.length
    } else if (event.key === 'Home') {
      nextIndex = 0
    } else if (event.key === 'End') {
      nextIndex = THREE_D_SECTIONS.length - 1
    } else {
      return
    }

    event.preventDefault()
    event.stopPropagation()
    selectTab(nextIndex)
  }

  function handleTilt(event) {
    const bounds = event.currentTarget.getBoundingClientRect()
    const pointerX = (event.clientX - bounds.left) / bounds.width
    const pointerY = (event.clientY - bounds.top) / bounds.height

    setTilt({
      x: (0.5 - pointerY) * 14,
      y: (pointerX - 0.5) * 18,
    })
  }

  function moveCarousel(direction) {
    setCarouselIndex((index) =>
      (index + direction + CAROUSEL_ITEMS.length) % CAROUSEL_ITEMS.length,
    )
  }

  return (
    <section className="view three-d-view">
      <header className="view__header">
        <h2>3D Transformations</h2>
        <p>
          A focused spatial-motion prototype using CSS perspective, true Z-axis depth, preserved
          3D layers, and interactive rotation—built for a client-ready walkthrough.
        </p>
      </header>

      <nav className="gallery-tabs" aria-label="3D transformation sections">
        <div className="gallery-tabs__list" role="tablist" aria-orientation="horizontal">
          {THREE_D_SECTIONS.map((section, index) => {
            const isActive = section.id === activeSection

            return (
              <button
                className={`gallery-tabs__tab${isActive ? ' is-active' : ''}`}
                id={`three-d-tab-${section.id}`}
                key={section.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`three-d-panel-${section.id}`}
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
        id="three-d-panel-interactive-tilt"
        role="tabpanel"
        aria-labelledby="three-d-tab-interactive-tilt"
        tabIndex={0}
        hidden={activeSection !== 'interactive-tilt'}
      >
        <div className="demo-block__head">
          <div>
            <h3>Pointer-responsive perspective card</h3>
            <p className="demo-block__note">Move the pointer across the card to inspect its depth.</p>
          </div>
          <AnimationLabel animationId="perspective-tilt-3d" context="3D Transformations → Interactive tilt" />
        </div>
        <div
          className="three-d-stage"
          onPointerMove={handleTilt}
          onPointerLeave={() => setTilt({ x: 0, y: 0 })}
        >
          <article
            className="three-d-tilt-card"
            style={{ '--tilt-x': `${tilt.x}deg`, '--tilt-y': `${tilt.y}deg` }}
          >
            <span className="three-d-kicker">LIVE OVERVIEW</span>
            <h4>Campaign velocity</h4>
            <p>Spatial hierarchy makes the headline and metrics feel physically layered.</p>
            <div className="three-d-metric-row">
              <span><strong>84%</strong> engagement</span>
              <span><strong>+18%</strong> growth</span>
            </div>
          </article>
        </div>
      </section>

      <section
        className="demo-block"
        id="three-d-panel-flip-reveal"
        role="tabpanel"
        aria-labelledby="three-d-tab-flip-reveal"
        tabIndex={0}
        hidden={activeSection !== 'flip-reveal'}
      >
        <div className="demo-block__head">
          <div>
            <h3>Two-sided product reveal</h3>
            <p className="demo-block__note">Select the card to reveal the reverse face.</p>
          </div>
          <AnimationLabel animationId="flip-reveal-3d" context="3D Transformations → Flip reveal" />
        </div>
        <div className="three-d-stage">
          <button
            className="three-d-flip-trigger"
            type="button"
            aria-pressed={isFlipped}
            onClick={() => setIsFlipped((current) => !current)}
          >
            <span className={`three-d-flip-card${isFlipped ? ' is-flipped' : ''}`}>
              <span className="three-d-flip-face three-d-flip-face--front">
                <span className="three-d-kicker">PREMIUM PLAN</span>
                <strong>Growth workspace</strong>
                <small>Click to see included capabilities</small>
              </span>
              <span className="three-d-flip-face three-d-flip-face--back">
                <span className="three-d-kicker">INCLUDED</span>
                <strong>Automation + analytics</strong>
                <small>Unlimited dashboards · Priority support</small>
              </span>
            </span>
          </button>
        </div>
      </section>

      <section
        className="demo-block"
        id="three-d-panel-cube-transition"
        role="tabpanel"
        aria-labelledby="three-d-tab-cube-transition"
        tabIndex={0}
        hidden={activeSection !== 'cube-transition'}
      >
        <div className="demo-block__head">
          <div>
            <h3>Dashboard cube transition</h3>
            <p className="demo-block__note">Rotate between four views without leaving the scene.</p>
          </div>
          <AnimationLabel animationId="cube-transition-3d" context="3D Transformations → Cube transition" />
        </div>
        <div className="demo-controls">
          <button type="button" className="demo-btn" onClick={() => setCubeFace((face) => (face + 3) % 4)}>
            ← Previous face
          </button>
          <span className="three-d-control-status" aria-live="polite">{CUBE_FACES[cubeFace].eyebrow}</span>
          <button type="button" className="demo-btn demo-btn--primary" onClick={() => setCubeFace((face) => (face + 1) % 4)}>
            Next face →
          </button>
        </div>
        <div className="three-d-stage three-d-stage--cube">
          <div className="three-d-cube" style={{ '--cube-rotation': `${cubeFace * -90}deg` }}>
            {CUBE_FACES.map((face) => (
              <article className={`three-d-cube__face three-d-cube__face--${face.id}`} key={face.id}>
                <span className="three-d-kicker">{face.eyebrow}</span>
                <strong>{face.title}</strong>
                <small>{face.detail}</small>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className="demo-block"
        id="three-d-panel-layered-depth"
        role="tabpanel"
        aria-labelledby="three-d-tab-layered-depth"
        tabIndex={0}
        hidden={activeSection !== 'layered-depth'}
      >
        <div className="demo-block__head">
          <div>
            <h3>Layered interface depth</h3>
            <p className="demo-block__note">Panels separate along the Z axis to expose hierarchy.</p>
          </div>
          <AnimationLabel animationId="layered-depth-3d" context="3D Transformations → Layered depth" />
        </div>
        <div className="demo-controls">
          <button type="button" className="demo-btn demo-btn--primary" onClick={() => setDepthKey((key) => key + 1)}>
            ↻ Replay depth
          </button>
        </div>
        <div className="three-d-stage three-d-stage--depth" key={depthKey}>
          {['Workspace shell', 'Analytics panel', 'Live insight', 'Action layer'].map((label, index) => (
            <div
              className="three-d-depth-layer"
              key={label}
              style={{
                '--layer-depth': `${index * 38}px`,
                '--layer-y': `${index * 18}px`,
                '--layer-delay': `${index * 80}ms`,
              }}
            >
              <span className="three-d-kicker">LAYER {index + 1}</span>
              <strong>{label}</strong>
            </div>
          ))}
        </div>
      </section>

      <section
        className="demo-block"
        id="three-d-panel-spatial-carousel"
        role="tabpanel"
        aria-labelledby="three-d-tab-spatial-carousel"
        tabIndex={0}
        hidden={activeSection !== 'spatial-carousel'}
      >
        <div className="demo-block__head">
          <div>
            <h3>Spatial metric carousel</h3>
            <p className="demo-block__note">Cards orbit through depth instead of sliding across a flat row.</p>
          </div>
          <AnimationLabel animationId="spatial-carousel-3d" context="3D Transformations → Spatial carousel" />
        </div>
        <div className="demo-controls">
          <button type="button" className="demo-btn" onClick={() => moveCarousel(-1)}>← Previous</button>
          <span className="three-d-control-status" aria-live="polite">
            {carouselIndex + 1} / {CAROUSEL_ITEMS.length} · {CAROUSEL_ITEMS[carouselIndex].title}
          </span>
          <button type="button" className="demo-btn demo-btn--primary" onClick={() => moveCarousel(1)}>Next →</button>
        </div>
        <div className="three-d-stage three-d-stage--carousel">
          <div
            className="three-d-carousel"
            style={{ '--carousel-rotation': `${carouselIndex * -72}deg` }}
          >
            {CAROUSEL_ITEMS.map((item, index) => (
              <article
                className={`three-d-carousel__card${index === carouselIndex ? ' is-active' : ''}`}
                key={item.title}
                style={{ '--item-angle': `${index * 72}deg` }}
                aria-hidden={index !== carouselIndex}
              >
                <span className="three-d-kicker">{item.title}</span>
                <strong>{item.value}</strong>
                <small>{item.note}</small>
              </article>
            ))}
          </div>
        </div>
      </section>

      {THREE_D_SECTIONS.slice(5).map((section) => (
        <EffectShowcasePanel
          active={activeSection === section.id}
          animationId={section.animationId}
          context={`3D Transformations → ${section.title}`}
          description={section.description}
          id={section.id}
          idPrefix="three-d"
          key={section.id}
          kind="three-d"
          title={section.title}
        />
      ))}
    </section>
  )
}
