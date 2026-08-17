import { VisualFoundationProvider } from '../../context/VisualFoundationContext.jsx'
import VisualFoundationApp from '../visual-foundation/VisualFoundationApp.jsx'
import '../../styles/visual-foundation/tailwind.css'

/**
 * Standalone "Visual Foundation Gallery" section — a 30-theme visual-style
 * simulator, entirely separate from the existing animation/transition
 * showcase. React + Tailwind CSS only; does not touch any other section.
 */
export default function VisualFoundationGallery() {
  return (
    <VisualFoundationProvider>
      <VisualFoundationApp />
    </VisualFoundationProvider>
  )
}
