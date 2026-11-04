import { motion } from 'motion/react'
import { HERO } from '../content'
import { Composer } from '../components/Composer'
import { ChatPhone } from '../components/Phone'
import { EASE } from '../components/ease'
import './Hero.css'

const words = HERO.title.split(' ')

// Two columns on desktop: headline + composer left, live chat phone right.
// Phones and tablets stack them, copy first.
export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="container hero-grid">
        <div className="hero-copy">
          <h1 className="h-display hero-title">
            {words.map((w, i) => (
              <span key={i}>
                <span className="hero-word">
                  <motion.span
                    initial={{ y: '110%' }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1.1, delay: 0.1 + i * 0.07, ease: EASE }}
                  >
                    {w}
                  </motion.span>
                </span>
                {i < words.length - 1 && ' '}
              </span>
            ))}
          </h1>
          <motion.p
            className="lead hero-sub"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.45, ease: EASE }}
          >
            {HERO.sub}
          </motion.p>
          <motion.div
            className="hero-composer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6, ease: EASE }}
          >
            <Composer tag="hero" id="hero-composer" />
          </motion.div>
        </div>

        <motion.div
          className="hero-phone"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.35, ease: EASE }}
        >
          <span className="story-halo" style={{ '--halo': 'var(--lilac)' }} aria-hidden="true" />
          <ChatPhone script={HERO.chat} label={HERO.phoneLabel} />
        </motion.div>
      </div>
    </section>
  )
}
