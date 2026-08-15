import { useState } from 'react'
import AnimationLabel from '../shared/AnimationLabel.jsx'

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

      <section className="demo-block">
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

      <section className="demo-block">
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

      <section className="demo-block">
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

      <section className="demo-block">
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

      <section className="demo-block">
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
    </section>
  )
}
