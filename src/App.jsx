import { lazy, Suspense } from 'react'
import { MotionConfig } from 'motion/react'
import Header from './sections/Header'
import Hero from './sections/Hero'
import { BackToTop } from './components/BackToTop'
import { SectionBoundary } from './components/SectionBoundary'

// First screen ships in the main bundle; everything below the fold is its own chunk.
const Marquee = lazy(() => import('./sections/Marquee'))
const Stats = lazy(() => import('./sections/Stats'))
const Costs = lazy(() => import('./sections/Costs'))
const Steps = lazy(() => import('./sections/Steps'))
const Simulator = lazy(() => import('./sections/Simulator'))
const Pricing = lazy(() => import('./sections/Pricing'))
const Faq = lazy(() => import('./sections/Faq'))
const FinalCta = lazy(() => import('./sections/FinalCta'))
const Footer = lazy(() => import('./sections/Footer'))

// Page order. Light/dark rhythm: hero + marquee (navy), products (light), how it works +
// replay (navy slab), checks, costs, FAQ (light), closing CTA + footer (navy)
const BODY = [Marquee, Pricing, Steps, Simulator, Stats, Costs, Faq, FinalCta]

// Each lazy section loads and fails on its own, so one broken chunk never blanks the page.
function Lazy({ section: Section }) {
  return (
    <SectionBoundary>
      <Suspense fallback={null}>
        <Section />
      </Suspense>
    </SectionBoundary>
  )
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Header />
      <main>
        <Hero />
        {BODY.map((S, i) => (
          <Lazy key={i} section={S} />
        ))}
      </main>
      <Lazy section={Footer} />
      <BackToTop />
    </MotionConfig>
  )
}
