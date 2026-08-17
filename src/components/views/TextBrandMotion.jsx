import { useState } from 'react'
import AnimationLabel from '../shared/AnimationLabel.jsx'
import SectionTabs from '../shared/SectionTabs.jsx'

const TEXT_EFFECTS = [
  { id: 'headline', label: 'Headline reveal', animationId: 'headline-mask-reveal', title: 'Headline mask reveal' },
  { id: 'words', label: 'Staggered words', animationId: 'staggered-word-entrance', title: 'Staggered word entrance' },
  { id: 'letters', label: 'Letter reveal', animationId: 'letter-by-letter-reveal', title: 'Letter-by-letter reveal' },
  { id: 'morph', label: 'Text morph', animationId: 'text-message-morph', title: 'Campaign message morph' },
  { id: 'logo', label: 'Logo assembly', animationId: 'logo-piece-assembly', title: 'Brand-mark assembly' },
  { id: 'ticker', label: 'Announcement ticker', animationId: 'announcement-ticker', title: 'Announcement ticker' },
  { id: 'wave', label: 'Character wave', animationId: 'character-wave', title: 'Character wave' },
  { id: 'quote', label: 'Quote focus', animationId: 'quote-focus-reveal', title: 'Editorial quote focus' },
  { id: 'number', label: 'Numeric flip', animationId: 'numeric-headline-flip', title: 'Numeric headline flip' },
  { id: 'cta', label: 'CTA emphasis', animationId: 'cta-copy-emphasis', title: 'Call-to-action emphasis' },
]

function TextPrototype({ effect, morphMessage }) {
  if (effect.id === 'headline') {
    return <div className="text-brand-mask"><h3 className="anim-headline-mask-reveal">Build momentum that lasts.</h3></div>
  }

  if (effect.id === 'words') {
    return <h3 className="text-brand-word-line">{'Turn insight into action'.split(' ').map((word, index) => <span className="anim-staggered-word-entrance" style={{ '--anim-delay': `${index * 110}ms` }} key={word}>{word}</span>)}</h3>
  }

  if (effect.id === 'letters') {
    return <h3 className="text-brand-letter-line">{'NORTHSTAR'.split('').map((letter, index) => <span className="anim-letter-by-letter-reveal" style={{ '--anim-delay': `${index * 70}ms` }} key={`${letter}-${index}`}>{letter}</span>)}</h3>
  }

  if (effect.id === 'morph') {
    return <h3 className="text-brand-morph anim-text-message-morph" key={morphMessage}>{morphMessage ? 'Move from idea to impact.' : 'Make every signal useful.'}</h3>
  }

  if (effect.id === 'logo') {
    return <div className="text-brand-logo" aria-label="Northstar logo assembly">{['N', 'O', 'R', 'T'].map((piece, index) => <span className="anim-logo-piece-assembly" style={{ '--anim-delay': `${index * 100}ms` }} key={piece}>{piece}</span>)}</div>
  }

  if (effect.id === 'ticker') {
    return <div className="text-brand-ticker"><div className="anim-announcement-ticker">NEW RELEASE · ANALYTICS 2.0 · BOOK A DEMO · NEW RELEASE · ANALYTICS 2.0 · BOOK A DEMO · </div></div>
  }

  if (effect.id === 'wave') {
    return <h3 className="text-brand-letter-line">{'LAUNCH FASTER'.split('').map((letter, index) => <span className="anim-character-wave" style={{ '--anim-delay': `${index * 55}ms` }} key={`${letter}-${index}`}>{letter === ' ' ? '\u00a0' : letter}</span>)}</h3>
  }

  if (effect.id === 'quote') {
    return <blockquote className="text-brand-quote anim-quote-focus-reveal">“The clearest product story we have ever presented.”<cite>— Product Director</cite></blockquote>
  }

  if (effect.id === 'number') {
    return <div className="text-brand-number anim-numeric-headline-flip"><strong>94%</strong><span>of teams shipped faster</span></div>
  }

  return <div className="text-brand-cta anim-cta-copy-emphasis"><span>READY WHEN YOU ARE</span><h3>Start building the next release.</h3><button type="button">Explore the platform</button></div>
}

export default function TextBrandMotion() {
  const [activeId, setActiveId] = useState(TEXT_EFFECTS[0].id)
  const [replayKey, setReplayKey] = useState(0)
  const [morphMessage, setMorphMessage] = useState(false)
  const activeEffect = TEXT_EFFECTS.find((effect) => effect.id === activeId) ?? TEXT_EFFECTS[0]

  function replay() {
    if (activeId === 'morph') setMorphMessage((message) => !message)
    setReplayKey((key) => key + 1)
  }

  return (
    <section className="view">
      <header className="view__header"><h2>Text &amp; Brand Motion</h2><p>Ten compact brand, headline, messaging, and editorial motion prototypes for polished client presentations.</p></header>
      <SectionTabs items={TEXT_EFFECTS} activeId={activeId} onChange={setActiveId} idPrefix="text-brand" label="Text and brand motion sections" />
      <section className="demo-block" id={`text-brand-panel-${activeEffect.id}`} role="tabpanel" aria-labelledby={`text-brand-tab-${activeEffect.id}`} tabIndex={0}>
        <div className="demo-block__head"><div><h3>{activeEffect.title}</h3><p className="demo-block__note">A focused, presentation-ready example using transform and opacity motion.</p></div><AnimationLabel animationId={activeEffect.animationId} context={`Text & Brand Motion → ${activeEffect.title}`} /></div>
        <div className="demo-controls"><button type="button" className="demo-btn demo-btn--primary" onClick={replay}>↻ {activeId === 'morph' ? 'Change message' : 'Replay example'}</button></div>
        <div className="text-brand-stage" key={`${activeId}-${replayKey}`}><TextPrototype effect={activeEffect} morphMessage={morphMessage} /></div>
      </section>
    </section>
  )
}
