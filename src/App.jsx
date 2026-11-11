import { lazy, Suspense } from 'react'
import { MotionConfig } from 'motion/react'
import Header from './sections/Header'
import Hero from './sections/Hero'
import { BackToTop } from './components/BackToTop'

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

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Header />
      <main>
        <Hero />
        <Suspense fallback={null}>
          <Logos />
          <Products />
          <How />
          <Replay />
          <Why />
          <Safety />
          <Faq />
          <FinalCta />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
      <BackToTop />
    </MotionConfig>
  )
}
