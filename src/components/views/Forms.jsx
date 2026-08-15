import { useState } from 'react'
import AnimationLabel from '../shared/AnimationLabel.jsx'

const FIELDS = [
  { id: 'name', label: 'Full name', type: 'text', placeholder: ' ' },
  { id: 'email', label: 'Email address', type: 'email', placeholder: ' ' },
  { id: 'message', label: 'Message', type: 'textarea', placeholder: ' ' },
]

const ENTRY_EFFECTS = [
  { id: 'fade-in-up', label: 'Fade In Up', cssClassName: 'anim-fade-in-up' },
  { id: 'scale-in', label: 'Scale In', cssClassName: 'anim-scale-in' },
]

function validate(values) {
  const errors = {}
  if (!values.name.trim()) errors.name = true
  if (!/^\S+@\S+\.\S+$/.test(values.email)) errors.email = true
  return errors
}

export default function Forms() {
  const [entryEffect, setEntryEffect] = useState(ENTRY_EFFECTS[0])
  const [entryKey, setEntryKey] = useState(0)
  const [revealKey, setRevealKey] = useState(0)

  const [values, setValues] = useState({ name: '', email: '', message: '' })
  const [focusedField, setFocusedField] = useState(null)
  const [errorFields, setErrorFields] = useState({})
  const [submitState, setSubmitState] = useState('idle')

  function updateField(id, value) {
    setValues((prev) => ({ ...prev, [id]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    if (submitState !== 'idle') return

    const errors = validate(values)
    if (Object.keys(errors).length > 0) {
      setErrorFields(errors)
      setTimeout(() => setErrorFields({}), 650)
      return
    }

    setSubmitState('loading')
    setTimeout(() => {
      setSubmitState('success')
      setTimeout(() => {
        setSubmitState('idle')
        setValues({ name: '', email: '', message: '' })
      }, 1800)
    }, 1000)
  }

  return (
    <section className="view">
      <header className="view__header">
        <h2>Forms</h2>
        <p>
          A sample form demonstrating container entry, staggered field reveal, focus animation,
          validation feedback, and a submit loading→success transition.
        </p>
      </header>

      <section className="demo-block">
        <div className="demo-block__head">
          <h3>Container entry &amp; field reveal</h3>
          <AnimationLabel animationIds={[entryEffect.id, 'field-reveal']} />
        </div>
        <div className="demo-controls">
          <div className="demo-controls__group">
            {ENTRY_EFFECTS.map((effect) => (
              <button
                key={effect.id}
                type="button"
                className={`demo-btn ${entryEffect.id === effect.id ? 'is-active' : ''}`}
                onClick={() => {
                  setEntryEffect(effect)
                  setEntryKey((k) => k + 1)
                }}
              >
                {effect.label}
              </button>
            ))}
          </div>
          <button type="button" className="demo-btn demo-btn--primary" onClick={() => setRevealKey((k) => k + 1)}>
            ↻ Replay field reveal
          </button>
        </div>

        <form className={`demo-form ${entryEffect.cssClassName}`} key={entryKey} onSubmit={handleSubmit}>
          <div key={revealKey} className="demo-form__fields">
            {FIELDS.map((field, index) => {
              const hasError = Boolean(errorFields[field.id])
              const isFocused = focusedField === field.id
              const fieldClass = [
                'demo-field',
                'anim-field-reveal',
                hasError ? 'anim-field-error-shake' : '',
              ]
                .filter(Boolean)
                .join(' ')

              const commonProps = {
                id: `demo-field-${field.id}`,
                value: values[field.id],
                onChange: (e) => updateField(field.id, e.target.value),
                onFocus: () => setFocusedField(field.id),
                onBlur: () => setFocusedField(null),
                className: `demo-field__input anim-input-focus-glow ${isFocused ? 'is-previewing' : ''}`,
                placeholder: field.placeholder,
              }

              return (
                <div className={fieldClass} style={{ '--anim-delay': `${index * 110}ms` }} key={field.id}>
                  {field.type === 'textarea' ? (
                    <textarea rows={3} {...commonProps} />
                  ) : (
                    <input type={field.type} {...commonProps} />
                  )}
                  <label
                    htmlFor={`demo-field-${field.id}`}
                    className={`demo-field__label anim-label-float ${isFocused ? 'is-previewing' : ''}`}
                  >
                    {field.label}
                  </label>
                  {submitState === 'success' && (
                    <span className="demo-field__check anim-field-success-check">✓</span>
                  )}
                </div>
              )
            })}
          </div>

          <button
            type="submit"
            className={`demo-submit-btn ${submitState === 'success' ? 'anim-button-success-morph' : ''}`}
            disabled={submitState !== 'idle'}
          >
            {submitState === 'loading' && <span className="demo-spinner anim-submit-button-loading" />}
            {submitState === 'loading' ? 'Sending…' : submitState === 'success' ? '✓ Sent!' : 'Submit'}
          </button>
        </form>
      </section>
    </section>
  )
}
