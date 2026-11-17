import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/globals.css'
import './index.css'
import App from './App.jsx'

// One extra route, no router needed: /design-system previews the color system and components.
// It is its own chunk, so the landing page never downloads it.
// oxlint-disable-next-line react/only-export-components -- the entry file exports nothing by design
const DesignSystem = lazy(() => import('./pages/DesignSystem.jsx'))
const isDesignSystem = window.location.pathname.replace(/\/+$/, '') === '/design-system'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {isDesignSystem ? (
      <Suspense fallback={null}>
        <DesignSystem />
      </Suspense>
    ) : (
      <App />
    )}
  </StrictMode>,
)
