import { useEffect, useState } from 'react'
import { useSelection } from '../../context/SelectionContext.jsx'

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

export default function AnimationPreview({ animation, context }) {
  const { id, name, description, cssClassName, suitableFor, previewKind = 'enter' } = animation
  const {
    activeConfiguration,
    getSelection,
    saveAnimation,
    removeAnimation,
    registerUsage,
  } = useSelection()
  const selection = getSelection(id)

  const [durationMs, setDurationMs] = useState(() => selection?.settings?.durationMs ?? 500)
  const [delayMs, setDelayMs] = useState(() => selection?.settings?.delayMs ?? 0)
  const [speed, setSpeed] = useState(() => selection?.settings?.speed ?? 1)
  const [replayToken, setReplayToken] = useState(0)
  const [isPreviewing, setIsPreviewing] = useState(false)

  useEffect(() => {
    if (context) registerUsage(id, context)
  }, [id, context, registerUsage])

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
  const currentSettings = { durationMs, delayMs, speed }

  return (
    <article className="anim-card">
      <header className="anim-card__header">
        <div>
          <h4 className="anim-card__title">{name}</h4>
          <p className="anim-card__desc">{description}</p>
        </div>
        <span
          className={`anim-card__status anim-card__status--${
            !activeConfiguration ? 'disabled' : selection ? 'selected' : 'new'
          }`}
        >
          {!activeConfiguration ? 'No client' : selection ? 'Selected' : 'Not selected'}
        </span>
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
        <div className="anim-card__actions">
          <button
            type="button"
            className="anim-card__action anim-card__action--primary"
            disabled={!activeConfiguration}
            onClick={() => saveAnimation(id, currentSettings)}
          >
            {selection ? '✓ Update selection' : 'Select for client'}
          </button>
          {selection && (
            <button
              type="button"
              className="anim-card__action anim-card__action--quiet"
              onClick={() => removeAnimation(id)}
            >
              Clear
            </button>
          )}
          <button type="button" className="anim-card__replay" onClick={handleReplay}>
            ↻ Replay
          </button>
        </div>

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
