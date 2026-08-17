import { useRef, useState } from 'react'
import AnimationLabel from '../shared/AnimationLabel.jsx'
import EffectShowcasePanel from '../shared/EffectShowcasePanel.jsx'

const CARD_SECTIONS = [
  { id: 'layout-entry', label: 'Layout & entry direction' },
  { id: 'staggered-entry', label: 'Staggered entry' },
  { id: 'entrance-effects', label: 'Entrance effects' },
  { id: 'directions-converge', label: 'Four directions converge' },
  { id: 'hover-interactions', label: 'Hover interactions' },
  { id: 'fade-collection', label: 'Fade-up collection', animationId: 'fade-in-up', title: 'Fade-up card collection', description: 'A restrained fade and rise for loading a new card set.' },
  { id: 'diagonal-reveal', label: 'Diagonal reveal', animationId: 'clip-reveal-diagonal', title: 'Diagonal card reveal', description: 'Cards appear through a directional clipped reveal.' },
  { id: 'rotate-entrance', label: 'Rotate entrance', animationId: 'rotate-in', title: 'Rotating card entrance', description: 'A compact rotational entrance for featured content.' },
  { id: 'focus-cards', label: 'Focus reveal', animationId: 'focus-in', title: 'Focus-in card reveal', description: 'Cards sharpen and settle into the foreground.' },
  { id: 'scale-cascade', label: 'Scale cascade', animationId: 'stagger-scale-in', title: 'Scale cascade grid', description: 'A card group scales into place in sequence.' },
]

const DIRECTIONS = [
  { id: 'left', label: 'From Left', cssClassName: 'anim-slide-in-left', animationId: 'slide-in-left' },
  { id: 'right', label: 'From Right', cssClassName: 'anim-slide-in-right', animationId: 'slide-in-right' },
  { id: 'top', label: 'From Top', cssClassName: 'anim-slide-in-down', animationId: 'slide-in-down' },
  { id: 'bottom', label: 'From Bottom', cssClassName: 'anim-slide-in-up', animationId: 'slide-in-up' },
]

const ENTRANCE_EFFECTS = [
  { id: 'scale-settle', label: 'Scale & Settle', cssClassName: 'anim-scale-settle', animationId: 'scale-settle' },
  { id: 'bounce-in', label: 'Bounce In', cssClassName: 'anim-bounce-in', animationId: 'bounce-in' },
  { id: 'flip-in', label: 'Flip In', cssClassName: 'anim-flip-card-3d', animationId: 'flip-card-3d' },
]

const HOVER_EFFECTS = [
  { cssClassName: 'anim-hover-lift', animationId: 'hover-lift', label: 'Lift' },
  { cssClassName: 'anim-hover-glow', animationId: 'hover-glow', label: 'Glow' },
  { cssClassName: 'anim-hover-tilt', animationId: 'hover-tilt', label: 'Tilt' },
  { cssClassName: 'anim-hover-shake', animationId: 'hover-shake', label: 'Shake' },
]

const SAMPLE_CARDS = [
  { title: 'Growth Plan', body: 'Best for growing teams that need more automation.', tag: 'Plan' },
  { title: 'Weekly Digest', body: 'A summary of activity across your workspace.', tag: 'Report' },
  { title: 'New Integration', body: 'Connect a third-party tool to your workflow.', tag: 'App' },
  { title: 'Team Member', body: 'Invited 2 days ago, pending acceptance.', tag: 'Invite' },
]

const CONVERGE_CARDS = [
  { ...SAMPLE_CARDS[0], cssClassName: 'anim-slide-in-left' },
  { ...SAMPLE_CARDS[1], cssClassName: 'anim-slide-in-down' },
  { ...SAMPLE_CARDS[2], cssClassName: 'anim-slide-in-up' },
  { ...SAMPLE_CARDS[3], cssClassName: 'anim-slide-in-right' },
]

function SampleCard({ title, body, tag, className = '' }) {
  return (
    <article className={`demo-card ${className}`}>
      <div className="demo-card__thumb" aria-hidden="true" />
      <div className="demo-card__body">
        <span className="chip">{tag}</span>
        <h4>{title}</h4>
        <p>{body}</p>
      </div>
    </article>
  )
}

export default function Cards() {
  const [activeCardSection, setActiveCardSection] = useState(CARD_SECTIONS[0].id)
  const tabRefs = useRef([])
  const [cardCount, setCardCount] = useState(3)
  const [direction, setDirection] = useState(DIRECTIONS[0])
  const [entryKey, setEntryKey] = useState(0)

  const [staggerKey, setStaggerKey] = useState(0)

  const [entranceEffect, setEntranceEffect] = useState(ENTRANCE_EFFECTS[0])
  const [entranceKey, setEntranceKey] = useState(0)

  const [convergeKey, setConvergeKey] = useState(0)

  const [previewingHover, setPreviewingHover] = useState(null)

  function triggerDirection(dir) {
    setDirection(dir)
    setEntryKey((key) => key + 1)
  }

  function triggerHoverPreview(animationId) {
    setPreviewingHover(null)
    requestAnimationFrame(() => setPreviewingHover(animationId))
    setTimeout(() => setPreviewingHover((current) => (current === animationId ? null : current)), 650)
  }

  function selectTab(index) {
    const nextSection = CARD_SECTIONS[index]
    if (!nextSection) return

    setActiveCardSection(nextSection.id)
    tabRefs.current[index]?.focus()
  }

  function handleTabKeyDown(event, index) {
    let nextIndex

    if (event.key === 'ArrowRight') {
      nextIndex = (index + 1) % CARD_SECTIONS.length
    } else if (event.key === 'ArrowLeft') {
      nextIndex = (index - 1 + CARD_SECTIONS.length) % CARD_SECTIONS.length
    } else if (event.key === 'Home') {
      nextIndex = 0
    } else if (event.key === 'End') {
      nextIndex = CARD_SECTIONS.length - 1
    } else {
      return
    }

    event.preventDefault()
    event.stopPropagation()
    selectTab(nextIndex)
  }

  const cards = SAMPLE_CARDS.slice(0, cardCount)

  return (
    <section className="view">
      <header className="view__header">
        <h2>Cards</h2>
        <p>
          Real card layouts driven by the animation registry — trigger entry directions, stagger,
          entrance effects, and hover interactions on live components.
        </p>
      </header>

      <nav className="gallery-tabs" aria-label="Card animation sections">
        <div className="gallery-tabs__list" role="tablist" aria-orientation="horizontal">
          {CARD_SECTIONS.map((section, index) => {
            const isActive = section.id === activeCardSection

            return (
              <button
                className={`gallery-tabs__tab${isActive ? ' is-active' : ''}`}
                id={`cards-tab-${section.id}`}
                key={section.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`cards-panel-${section.id}`}
                tabIndex={isActive ? 0 : -1}
                ref={(element) => {
                  tabRefs.current[index] = element
                }}
                onClick={() => setActiveCardSection(section.id)}
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
        id="cards-panel-layout-entry"
        role="tabpanel"
        aria-labelledby="cards-tab-layout-entry"
        tabIndex={0}
        hidden={activeCardSection !== 'layout-entry'}
      >
        <div className="demo-block__head">
          <h3>Layout &amp; entry direction</h3>
          <AnimationLabel animationId={direction.animationId} context="Cards → Layout & entry direction" />
        </div>
        <div className="demo-controls">
          <div className="demo-controls__group">
            {[2, 3, 4].map((count) => (
              <button
                key={count}
                type="button"
                className={`demo-btn ${cardCount === count ? 'is-active' : ''}`}
                onClick={() => setCardCount(count)}
              >
                {count} cards
              </button>
            ))}
          </div>
          <div className="demo-controls__group">
            {DIRECTIONS.map((dir) => (
              <button
                key={dir.id}
                type="button"
                className={`demo-btn ${direction.id === dir.id ? 'is-active' : ''}`}
                onClick={() => triggerDirection(dir)}
              >
                {dir.label}
              </button>
            ))}
          </div>
        </div>
        <div className={`demo-card-grid demo-card-grid--${cardCount}`} key={entryKey}>
          {cards.map((card) => (
            <SampleCard key={card.title} {...card} className={direction.cssClassName} />
          ))}
        </div>
      </section>

      <section
        className="demo-block"
        id="cards-panel-staggered-entry"
        role="tabpanel"
        aria-labelledby="cards-tab-staggered-entry"
        tabIndex={0}
        hidden={activeCardSection !== 'staggered-entry'}
      >
        <div className="demo-block__head">
          <h3>Staggered entry</h3>
          <AnimationLabel animationId="stagger-card-grid" context="Cards → Staggered entry" />
        </div>
        <div className="demo-controls">
          <button type="button" className="demo-btn demo-btn--primary" onClick={() => setStaggerKey((k) => k + 1)}>
            ↻ Replay stagger
          </button>
        </div>
        <div className="demo-card-grid demo-card-grid--4" key={staggerKey}>
          {SAMPLE_CARDS.map((card, index) => (
            <div key={card.title} style={{ '--anim-delay': `${index * 120}ms` }}>
              <SampleCard {...card} className="anim-stagger-card-grid" />
            </div>
          ))}
        </div>
      </section>

      <section
        className="demo-block"
        id="cards-panel-entrance-effects"
        role="tabpanel"
        aria-labelledby="cards-tab-entrance-effects"
        tabIndex={0}
        hidden={activeCardSection !== 'entrance-effects'}
      >
        <div className="demo-block__head">
          <h3>Entrance effects</h3>
          <AnimationLabel animationId={entranceEffect.animationId} context="Cards → Entrance effects" />
        </div>
        <div className="demo-controls">
          <div className="demo-controls__group">
            {ENTRANCE_EFFECTS.map((effect) => (
              <button
                key={effect.id}
                type="button"
                className={`demo-btn ${entranceEffect.id === effect.id ? 'is-active' : ''}`}
                onClick={() => {
                  setEntranceEffect(effect)
                  setEntranceKey((k) => k + 1)
                }}
              >
                {effect.label}
              </button>
            ))}
          </div>
        </div>
        <div className="demo-card-grid demo-card-grid--1" key={entranceKey}>
          <SampleCard {...SAMPLE_CARDS[0]} className={entranceEffect.cssClassName} />
        </div>
      </section>

      <section
        className="demo-block"
        id="cards-panel-directions-converge"
        role="tabpanel"
        aria-labelledby="cards-tab-directions-converge"
        tabIndex={0}
        hidden={activeCardSection !== 'directions-converge'}
      >
        <div className="demo-block__head">
          <h3>Four directions converge</h3>
          <AnimationLabel
            animationIds={['slide-in-left', 'slide-in-right', 'slide-in-up', 'slide-in-down']}
            context="Cards → Four directions converge"
          />
        </div>
        <div className="demo-controls">
          <button type="button" className="demo-btn demo-btn--primary" onClick={() => setConvergeKey((k) => k + 1)}>
            ↻ Converge
          </button>
        </div>
        <div className="demo-card-grid demo-card-grid--converge" key={convergeKey}>
          {CONVERGE_CARDS.map((card) => (
            <SampleCard key={card.title} {...card} />
          ))}
        </div>
      </section>

      <section
        className="demo-block"
        id="cards-panel-hover-interactions"
        role="tabpanel"
        aria-labelledby="cards-tab-hover-interactions"
        tabIndex={0}
        hidden={activeCardSection !== 'hover-interactions'}
      >
        <div className="demo-block__head">
          <h3>Hover interactions</h3>
          <AnimationLabel
            animationIds={HOVER_EFFECTS.map((h) => h.animationId)}
            context="Cards → Hover interactions"
          />
        </div>
        <div className="demo-card-grid demo-card-grid--4">
          {HOVER_EFFECTS.map((hover, index) => (
            <div className="demo-hover-item" key={hover.animationId}>
              <SampleCard
                {...SAMPLE_CARDS[index]}
                className={`${hover.cssClassName} ${previewingHover === hover.animationId ? 'is-previewing' : ''}`}
              />
              <button
                type="button"
                className="demo-btn demo-btn--sm"
                onClick={() => triggerHoverPreview(hover.animationId)}
              >
                Preview {hover.label}
              </button>
            </div>
          ))}
        </div>
      </section>

      {CARD_SECTIONS.slice(5).map((section) => (
        <EffectShowcasePanel
          active={activeCardSection === section.id}
          animationId={section.animationId}
          context={`Cards → ${section.title}`}
          description={section.description}
          id={section.id}
          idPrefix="cards"
          key={section.id}
          kind="card"
          title={section.title}
        />
      ))}
    </section>
  )
}
