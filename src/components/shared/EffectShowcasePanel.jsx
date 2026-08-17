import { useState } from 'react'
import { ANIMATIONS_BY_ID } from '../../data/animations.js'
import AnimationLabel from './AnimationLabel.jsx'

function Prototype({ kind, effectClass }) {
  const itemClass = `compact-effect-item ${effectClass}`

  if (kind === 'form') {
    return (
      <div className={`compact-effect-form ${effectClass}`}>
        <span /><span /><span className="is-short" />
        <button type="button" tabIndex={-1}>Continue</button>
      </div>
    )
  }

  if (kind === 'table') {
    return (
      <div className="compact-effect-table">
        {[0, 1, 2, 3].map((index) => (
          <span className={itemClass} key={index} style={{ '--anim-delay': `${index * 90}ms` }}>
            <i /><i /><i />
          </span>
        ))}
      </div>
    )
  }

  if (kind === 'modal') {
    return <div className={`compact-effect-modal ${effectClass}`}><strong>Preview panel</strong><span>Contained modal motion</span></div>
  }

  if (kind === 'page') {
    return (
      <div className={`compact-effect-page ${effectClass}`}>
        <span className="compact-effect-page__nav" />
        <span /><span /><span className="is-wide" />
      </div>
    )
  }

  if (kind === 'loader') {
    return (
      <div className="compact-effect-loader">
        {[0, 1, 2, 3].map((index) => <span className={itemClass} key={index} style={{ '--anim-delay': `${index * 90}ms` }} />)}
      </div>
    )
  }

  if (kind === 'data') {
    return (
      <div className="compact-effect-bars">
        {[45, 72, 58, 88, 66].map((height, index) => (
          <span className={itemClass} key={height} style={{ height: `${height}%`, '--anim-delay': `${index * 80}ms` }} />
        ))}
      </div>
    )
  }

  if (kind === 'navigation') {
    return (
      <div className={`compact-effect-navigation ${effectClass}`}>
        {['Overview', 'Projects', 'Analytics', 'Settings'].map((item, index) => <span className={index === 0 ? 'is-active' : ''} key={item}>{item}</span>)}
      </div>
    )
  }

  if (kind === 'three-d') {
    return (
      <div className={`compact-effect-depth ${effectClass}`}>
        <span /><span /><span />
      </div>
    )
  }

  return (
    <div className="compact-effect-card-grid">
      {[0, 1, 2].map((index) => (
        <article className={itemClass} key={index} style={{ '--anim-delay': `${index * 90}ms` }}>
          <span /><strong>Prototype {index + 1}</strong><small>Client-ready example</small>
        </article>
      ))}
    </div>
  )
}

export default function EffectShowcasePanel({
  active,
  animationId,
  context,
  description,
  id,
  idPrefix,
  kind = 'card',
  title,
}) {
  const [replayKey, setReplayKey] = useState(0)
  const animation = ANIMATIONS_BY_ID[animationId]

  if (!animation) return null

  return (
    <section
      className="demo-block"
      id={`${idPrefix}-panel-${id}`}
      role="tabpanel"
      aria-labelledby={`${idPrefix}-tab-${id}`}
      tabIndex={0}
      hidden={!active}
    >
      <div className="demo-block__head">
        <div>
          <h3>{title}</h3>
          <p className="demo-block__note">{description}</p>
        </div>
        <AnimationLabel animationId={animationId} context={context} />
      </div>
      <div className="demo-controls">
        <button type="button" className="demo-btn demo-btn--primary" onClick={() => setReplayKey((key) => key + 1)}>
          ↻ Replay example
        </button>
      </div>
      <div className="compact-effect-stage" key={replayKey}>
        <Prototype kind={kind} effectClass={animation.cssClassName} />
      </div>
    </section>
  )
}
