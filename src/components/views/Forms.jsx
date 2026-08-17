import { useState } from 'react'
import AnimationLabel from '../shared/AnimationLabel.jsx'
import EffectShowcasePanel from '../shared/EffectShowcasePanel.jsx'
import SectionTabs from '../shared/SectionTabs.jsx'

const FORM_SECTIONS = [
  { id: 'complete-flow', label: 'Complete form flow' },
  { id: 'field-stagger', label: 'Field stagger', animationId: 'field-reveal', title: 'Staggered field reveal', description: 'Fields arrive in sequence to guide the reading path.' },
  { id: 'floating-label', label: 'Floating label', animationId: 'label-float', title: 'Floating-label interaction', description: 'A field label moves into its focused position.' },
  { id: 'focus-glow', label: 'Focus highlight', animationId: 'input-focus-glow', title: 'Input focus highlight', description: 'The active field gains a clear, local focus treatment.' },
  { id: 'error-feedback', label: 'Error feedback', animationId: 'field-error-shake', title: 'Validation error feedback', description: 'A short shake identifies the field requiring attention.' },
  { id: 'success-feedback', label: 'Success feedback', animationId: 'field-success-check', title: 'Field success confirmation', description: 'A confirmation mark enters after successful validation.' },
  { id: 'submit-loading', label: 'Submit loading', animationId: 'submit-button-loading', title: 'Submit loading state', description: 'The form communicates processing without losing context.' },
  { id: 'fade-entry', label: 'Fade form entry', animationId: 'fade-in-up', title: 'Fade-up form entrance', description: 'The complete form fades and rises into place.' },
  { id: 'scale-entry', label: 'Scale form entry', animationId: 'scale-in', title: 'Scaled form entrance', description: 'The form settles forward from a reduced scale.' },
  { id: 'slide-entry', label: 'Slide form entry', animationId: 'slide-in-right', title: 'Sliding form entrance', description: 'The form enters laterally for a step-to-step workflow.' },
]

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
  const [activeFormSection, setActiveFormSection] = useState(FORM_SECTIONS[0].id)
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

      <SectionTabs items={FORM_SECTIONS} activeId={activeFormSection} onChange={setActiveFormSection} idPrefix="forms" label="Form animation sections" />

      <section
        className="demo-block"
        id="forms-panel-complete-flow"
        role="tabpanel"
        aria-labelledby="forms-tab-complete-flow"
        tabIndex={0}
        hidden={activeFormSection !== 'complete-flow'}
      >
        <div className="demo-block__head">
          <h3>Container entry &amp; field reveal</h3>
          <AnimationLabel
            animationIds={[entryEffect.id, 'field-reveal', 'label-float', 'input-focus-glow', 'field-error-shake', 'field-success-check', 'submit-button-loading', 'button-success-morph']}
            context="Forms → Container entry & field reveal"
          />
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

      {FORM_SECTIONS.slice(1).map((section) => (
        <EffectShowcasePanel
          active={activeFormSection === section.id}
          animationId={section.animationId}
          context={`Forms → ${section.title}`}
          description={section.description}
          id={section.id}
          idPrefix="forms"
          key={section.id}
          kind="form"
          title={section.title}
        />
      ))}
    </section>
  )
}
