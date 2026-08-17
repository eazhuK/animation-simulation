import { useRef, useState } from "react";
import { CATEGORIES } from "../../data/categories.js";
import { ANIMATIONS } from "../../data/animations.js";
import AnimationPreview from "../shared/AnimationPreview.jsx";

const GALLERY_CATEGORIES = CATEGORIES.map((category) => ({
  ...category,
  entries: ANIMATIONS.filter((animation) => animation.category === category.id),
})).filter((category) => category.entries.length > 0);

export default function Gallery() {
  const [activeCategoryId, setActiveCategoryId] = useState(
    GALLERY_CATEGORIES[0]?.id,
  );
  const tabRefs = useRef([]);
  const activeCategory =
    GALLERY_CATEGORIES.find((category) => category.id === activeCategoryId) ??
    GALLERY_CATEGORIES[0];

  const selectTab = (index) => {
    const nextCategory = GALLERY_CATEGORIES[index];
    if (!nextCategory) return;

    setActiveCategoryId(nextCategory.id);
    tabRefs.current[index]?.focus();
  };

  const handleTabKeyDown = (event, index) => {
    let nextIndex;

    if (event.key === "ArrowRight") {
      nextIndex = (index + 1) % GALLERY_CATEGORIES.length;
    } else if (event.key === "ArrowLeft") {
      nextIndex =
        (index - 1 + GALLERY_CATEGORIES.length) % GALLERY_CATEGORIES.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = GALLERY_CATEGORIES.length - 1;
    } else {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    selectTab(nextIndex);
  };

  if (!activeCategory) return null;

  return (
    <section className="view">
      {/* <header className="view__header">
        <h5>Gallery</h5>
        <p>
          {ANIMATIONS.length} animations across {CATEGORIES.length} categories.
          Choose a category, replay any preview, and tweak its timing before
          marking favourites for handoff.
        </p>
      </header> */}

      <nav className="gallery-tabs" aria-label="Animation categories">
        <div
          className="gallery-tabs__list"
          role="tablist"
          aria-orientation="horizontal"
        >
          {GALLERY_CATEGORIES.map((category, index) => {
            const isActive = category.id === activeCategory.id;

            return (
              <button
                className={`gallery-tabs__tab${isActive ? " is-active" : ""}`}
                id={`gallery-tab-${category.id}`}
                key={category.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`gallery-panel-${category.id}`}
                tabIndex={isActive ? 0 : -1}
                ref={(element) => {
                  tabRefs.current[index] = element;
                }}
                onClick={() => setActiveCategoryId(category.id)}
                onKeyDown={(event) => handleTabKeyDown(event, index)}
              >
                <span>{category.label}</span>
                <span
                  className="gallery-tabs__count"
                  aria-label={`${category.entries.length} animations`}
                >
                  {category.entries.length}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      <section
        className="anim-category"
        id={`gallery-panel-${activeCategory.id}`}
        role="tabpanel"
        aria-labelledby={`gallery-tab-${activeCategory.id}`}
        tabIndex={0}
      >
        <h3 className="anim-category__title">
          {activeCategory.label}
          <span className="anim-category__count">
            {activeCategory.entries.length}
          </span>
        </h3>
        <div className="anim-grid">
          {activeCategory.entries.map((animation) => (
            <AnimationPreview
              key={animation.id}
              animation={animation}
              context={`Gallery → ${activeCategory.label}`}
            />
          ))}
        </div>
      </section>
    </section>
  );
}
