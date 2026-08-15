import { useState } from 'react'
import { CATEGORIES } from '../../data/categories.js'
import { ANIMATIONS } from '../../data/animations.js'
import AnimationPreview from '../shared/AnimationPreview.jsx'

export default function Gallery() {
  const [favourites, setFavourites] = useState(() => new Set())

  function toggleFavourite(id) {
    setFavourites((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  return (
    <section className="view">
      <header className="view__header">
        <h2>Gallery</h2>
        <p>
          {ANIMATIONS.length} animations across {CATEGORIES.length} categories. Replay any
          preview and tweak duration, delay, and speed, then mark favourites to hand off to the
          dev team.
        </p>
      </header>

      {CATEGORIES.map((category) => {
        const entries = ANIMATIONS.filter((animation) => animation.category === category.id)
        if (entries.length === 0) return null

        return (
          <section className="anim-category" key={category.id}>
            <h3 className="anim-category__title">
              {category.label}
              <span className="anim-category__count">{entries.length}</span>
            </h3>
            <div className="anim-grid">
              {entries.map((animation) => (
                <AnimationPreview
                  key={animation.id}
                  animation={animation}
                  isFavourite={favourites.has(animation.id)}
                  onToggleFavourite={() => toggleFavourite(animation.id)}
                />
              ))}
            </div>
          </section>
        )
      })}
    </section>
  )
}
