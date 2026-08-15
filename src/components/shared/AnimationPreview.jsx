import { useEffect, useState } from 'react'

const DURATION_MIN = 150
const DURATION_MAX = 1500
const DURATION_STEP = 50

const DELAY_MIN = 0
const DELAY_MAX = 1000
const DELAY_STEP = 50

const SPEED_MIN = 0.25
const SPEED_MAX = 2
const SPEED_STEP = 0.25

const STAGGER_COUNT = 4

export default function AnimationPreview({ animation, isFavourite, onToggleFavourite }) {
  const { name, description, cssClassName, suitableFor, previewKind = 'enter' } = animation

  const [durationMs, setDurationMs] = useState(500)
  const [delayMs, setDelayMs] = useState(0)
  const [speed, setSpeed] = useState(1)
  const [replayToken, setReplayToken] = useState(0)
  const [isPreviewing, setIsPreviewing] = useState(false)

  const effectiveDuration = Math.max(50, Math.round(durationMs / speed))
  const staggerStep = Math.max(30, Math.round(120 / speed))

  useEffect(() => {
    if (previewKind !== 'interactive' || !isPreviewing) return undefined
    const timer = setTimeout(() => setIsPreviewing(false), effectiveDuration + delayMs + 80)
    return () => clearTimeout(timer)
  }, [isPreviewing, previewKind, effectiveDuration, delayMs])

  function handleReplay() {
    if (previewKind === 'interactive') {
      setIsPreviewing(false)
      requestAnimationFrame(() => setIsPreviewing(true))
    } else {
      setReplayToken((token) => token + 1)
    }
  }

  const stageVars = {
    '--anim-duration': `${effectiveDuration}ms`,
    '--anim-delay': `${delayMs}ms`,
  }

  return (
    <article className="anim-card">
      <header className="anim-card__header">
        <div>
          <h4 className="anim-card__title">{name}</h4>
          <p className="anim-card__desc">{description}</p>
        </div>
        <label className="anim-card__fav">
          <input type="checkbox" checked={isFavourite} onChange={onToggleFavourite} />
          <span>Favourite</span>
        </label>
      </header>

      <div className="anim-card__tags">
        {suitableFor.map((tag) => (
          <span className="chip chip--muted" key={tag}>
            {tag}
          </span>
        ))}
      </div>

      <div className="anim-stage" style={stageVars}>
        {previewKind === 'stagger' ? (
          <div className="anim-stage__group" key={replayToken}>
            {Array.from({ length: STAGGER_COUNT }).map((_, index) => (
              <div
                className={`anim-stage__box anim-stage__box--sm ${cssClassName}`}
                key={index}
                style={{ '--anim-delay': `${delayMs + index * staggerStep}ms` }}
              />
            ))}
          </div>
        ) : previewKind === 'interactive' ? (
          <div className={`anim-stage__box ${cssClassName} ${isPreviewing ? 'is-previewing' : ''}`} />
        ) : (
          <div className={`anim-stage__box ${cssClassName}`} key={replayToken} />
        )}
      </div>

      <div className="anim-card__controls">
        <button type="button" className="anim-card__replay" onClick={handleReplay}>
          ↻ Replay
        </button>

        <label className="anim-card__control">
          <span>Duration</span>
          <input
            type="range"
            min={DURATION_MIN}
            max={DURATION_MAX}
            step={DURATION_STEP}
            value={durationMs}
            onChange={(event) => setDurationMs(Number(event.target.value))}
          />
          <span className="anim-card__control-value">{durationMs}ms</span>
        </label>

        <label className="anim-card__control">
          <span>Delay</span>
          <input
            type="range"
            min={DELAY_MIN}
            max={DELAY_MAX}
            step={DELAY_STEP}
            value={delayMs}
            onChange={(event) => setDelayMs(Number(event.target.value))}
          />
          <span className="anim-card__control-value">{delayMs}ms</span>
        </label>

        <label className="anim-card__control">
          <span>Speed</span>
          <input
            type="range"
            min={SPEED_MIN}
            max={SPEED_MAX}
            step={SPEED_STEP}
            value={speed}
            onChange={(event) => setSpeed(Number(event.target.value))}
          />
          <span className="anim-card__control-value">{speed}×</span>
        </label>
      </div>
    </article>
  )
}
