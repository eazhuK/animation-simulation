export default function PlaceholderView({ title, description, note }) {
  return (
    <section className="view">
      <header className="view__header">
        <h2>{title}</h2>
        <p>{description}</p>
      </header>
      <div className="placeholder-panel">{note}</div>
    </section>
  )
}
