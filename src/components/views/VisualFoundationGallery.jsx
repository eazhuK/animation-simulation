import { VisualFoundationProvider } from '../../context/VisualFoundationContext.jsx'
import VisualFoundationApp from '../visual-foundation/VisualFoundationApp.jsx'
import '../../styles/visual-foundation/tailwind.css'

/**
 * 30-theme visual-style simulator. Theme selections and control overrides are
 * scoped to the active client configuration; rendering remains isolated from
 * the plain-CSS animation showcase.
 */
export default function VisualFoundationGallery() {
  return (
    <VisualFoundationProvider>
      <VisualFoundationApp />
    </VisualFoundationProvider>
  )
}
