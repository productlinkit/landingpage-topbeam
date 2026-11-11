import { lazy, Suspense } from 'react'
import { MotionConfig } from 'motion/react'
import Header from './sections/Header'
import Hero from './sections/Hero'
import { BackToTop } from './components/BackToTop'
import { SectionBoundary } from './components/SectionBoundary'

// First screen ships in the main bundle; everything below the fold is its own chunk.
const Logos = lazy(() => import('./sections/Logos'))
const Products = lazy(() => import('./sections/Products'))
const How = lazy(() => import('./sections/How'))
const Replay = lazy(() => import('./sections/Replay'))
const Why = lazy(() => import('./sections/Why'))
const Safety = lazy(() => import('./sections/Safety'))
const Faq = lazy(() => import('./sections/Faq'))
const FinalCta = lazy(() => import('./sections/FinalCta'))
const Footer = lazy(() => import('./sections/Footer'))

const BODY = [Logos, Products, How, Replay, Why, Safety, Faq, FinalCta]

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
