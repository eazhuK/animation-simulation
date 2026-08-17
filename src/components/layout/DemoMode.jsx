import { useEffect } from 'react'
import { SECTIONS } from '../../data/sections.js'

export default function DemoMode({ activeSection, onSelectSection, onExit, children }) {
  const activeIndex = SECTIONS.findIndex((section) => section.id === activeSection)
  const activeLabel = SECTIONS[activeIndex]?.label ?? ''
  const canGoPrev = activeIndex > 0
  const canGoNext = activeIndex < SECTIONS.length - 1

  const goPrev = () => {
    if (canGoPrev) onSelectSection(SECTIONS[activeIndex - 1].id)
  }
  const goNext = () => {
    if (canGoNext) onSelectSection(SECTIONS[activeIndex + 1].id)
  }

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape') onExit()
      else if (event.key === 'ArrowLeft') goPrev()
      else if (event.key === 'ArrowRight') goNext()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  })

  return (
    <div className="demo-mode">
      <header className="demo-mode__topbar">
        <span className="demo-mode__brand">UI Animation Catalogue — Client Demo</span>
        <button type="button" className="demo-mode__exit" onClick={onExit}>
          Exit Demo ✕
        </button>
      </header>

      <main
        className={`demo-mode__content${
          activeSection === 'gallery' ? ' demo-mode__content--gallery' : ''
        }`}
      >
        <h1 className="demo-mode__title">{activeLabel}</h1>
        {children}
      </main>

      <footer className="demo-mode__footer">
        <button
          type="button"
          className="demo-mode__nav-btn"
          onClick={goPrev}
          disabled={!canGoPrev}
        >
          ← Previous
        </button>

        <div className="demo-mode__dots" role="tablist" aria-label="Demo sections">
          {SECTIONS.map((section, index) => (
            <button
              key={section.id}
              type="button"
              role="tab"
              aria-selected={index === activeIndex}
              aria-label={section.label}
              title={section.label}
              className={
                'demo-mode__dot' + (index === activeIndex ? ' is-active' : '')
              }
              onClick={() => onSelectSection(section.id)}
            />
          ))}
        </div>

        <button
          type="button"
          className="demo-mode__nav-btn"
          onClick={goNext}
          disabled={!canGoNext}
        >
          Next →
        </button>
      </footer>
    </div>
  )
}
