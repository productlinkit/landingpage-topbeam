import { MotionConfig } from 'motion/react'
import Header from './sections/Header'
import Hero from './sections/Hero'

// Task 5 checkpoint: body sections return in Task 6.
export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Header />
      <main>
        <Hero />
      </main>
    </MotionConfig>
  )
}
