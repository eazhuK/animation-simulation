import { CATEGORIES } from '../../data/categories.js'
import { ANIMATIONS } from '../../data/animations.js'
import AnimationPreview from '../shared/AnimationPreview.jsx'

export default function Gallery() {
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
                  context={`Gallery → ${category.label}`}
                />
              ))}
            </div>
          </section>
        )
      })}
    </section>
  )
}
