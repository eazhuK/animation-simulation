import { useRef } from 'react'

export default function SectionTabs({ items, activeId, onChange, idPrefix, label }) {
  const tabRefs = useRef([])

  function selectTab(index) {
    const nextItem = items[index]
    if (!nextItem) return

    onChange(nextItem.id)
    tabRefs.current[index]?.focus()
  }

  function handleKeyDown(event, index) {
    let nextIndex

    if (event.key === 'ArrowRight') {
      nextIndex = (index + 1) % items.length
    } else if (event.key === 'ArrowLeft') {
      nextIndex = (index - 1 + items.length) % items.length
    } else if (event.key === 'Home') {
      nextIndex = 0
    } else if (event.key === 'End') {
      nextIndex = items.length - 1
    } else {
      return
    }

    event.preventDefault()
    event.stopPropagation()
    selectTab(nextIndex)
  }

  return (
    <nav className="gallery-tabs" aria-label={label}>
      <div className="gallery-tabs__list" role="tablist" aria-orientation="horizontal">
        {items.map((item, index) => {
          const isActive = item.id === activeId

          return (
            <button
              className={`gallery-tabs__tab${isActive ? ' is-active' : ''}`}
              id={`${idPrefix}-tab-${item.id}`}
              key={item.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`${idPrefix}-panel-${item.id}`}
              tabIndex={isActive ? 0 : -1}
              ref={(element) => {
                tabRefs.current[index] = element
              }}
              onClick={() => onChange(item.id)}
              onKeyDown={(event) => handleKeyDown(event, index)}
            >
              {item.label}
              {item.count !== undefined && <span className="gallery-tabs__count">{item.count}</span>}
            </button>
          )
        })}
      </div>
    </nav>
  )
}
