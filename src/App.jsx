import { lazy, Suspense } from 'react'
import { MotionConfig } from 'motion/react'
import { STORIES } from './content'
import Header from './sections/Header'
import Hero from './sections/Hero'
import { BackToTop } from './components/BackToTop'

// First screen ships in the main bundle; everything below the fold is its own chunk.
const Intro = lazy(() => import('./sections/Intro'))
const Story = lazy(() => import('./sections/Story'))
const Why = lazy(() => import('./sections/Why'))
const How = lazy(() => import('./sections/How'))
const Family = lazy(() => import('./sections/Family'))
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
          <Intro />
          {STORIES.map((s) => (
            <Story key={s.id} story={s} />
          ))}
          <Why />
          <How />
          <Family />
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
