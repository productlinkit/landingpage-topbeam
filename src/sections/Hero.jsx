import { motion } from 'motion/react'
import { HERO } from '../content'
import { TRANSCRIPTS } from '../data/transcripts'
import { Composer } from '../components/Composer'
import { ChatWindow } from '../components/ChatWindow'
import { Nova } from '../components/Nova'
import { Icon } from '../components/Icon'
import { EASE } from '../components/ease'
import './Hero.css'

const words = HERO.title.split(' ')
const rise = (delay) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: EASE },
})

// Copy and composer left; on the right a phone replays a real Nova chat on a glow, Nova peeks
// in from its lower left and two facts from that chat float around it. Below 980px the stage follows the copy.
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
                    transition={{ duration: 1.1, delay: 0.1 + i * 0.06, ease: EASE }}
                  >
                    {w}
                  </motion.span>
                </span>
                {i < words.length - 1 && ' '}
              </span>
            ))}
          </h1>
          <motion.p className="lead hero-sub" {...rise(0.45)}>
            {HERO.sub}
          </motion.p>
          <motion.div className="hero-composer" {...rise(0.6)}>
            <Composer tag="hero" id="hero-composer" align="start" />
            <p className="hero-note">{HERO.note}</p>
          </motion.div>
        </div>

        <motion.div className="hero-stage" {...rise(0.3)}>
          <span className="glow hero-glow" aria-hidden="true" />
          <div className="hero-phone">
            <ChatWindow steps={TRANSCRIPTS.pulsa.steps} label={HERO.chatLabel} />
          </div>
          <div className="hero-nova">
            <Nova pose="wave" size={190} track beam />
          </div>
          {HERO.pills.map((p, i) => (
            <motion.div
              key={p.title}
              className={`hero-pill hero-pill-${i}`}
              aria-hidden="true"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1, y: [0, -6, 0] }}
              transition={{
                opacity: { duration: 0.6, delay: 0.9 + i * 0.25 },
                scale: { duration: 0.6, delay: 0.9 + i * 0.25, ease: EASE },
                y: { duration: 5 + i, repeat: Infinity, ease: 'easeInOut', delay: i },
              }}
            >
              <span className="hero-pill-icon">
                <Icon name={p.icon} size={18} strokeWidth={2.2} />
              </span>
              <span className="hero-pill-text">
                <strong>{p.title}</strong>
                <span>{p.sub}</span>
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
