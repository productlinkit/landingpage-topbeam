import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import { HERO } from '../content'
import { TRANSCRIPTS } from '../data/transcripts'
import { Composer } from '../components/Composer'
import { ChatWindow } from '../components/ChatWindow'
import { Nova } from '../components/Nova'
import { Icon } from '../components/Icon'
import { EASE } from '../components/ease'
import './Hero.css'

const words = HERO.title.split(' ')
const accentFrom = words.length - HERO.titleAccent.split(' ').length
const rise = (delay) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: EASE },
})

// Copy and composer left; on the right a phone replays a real Nova chat on a glow, Nova peeks
// in from its lower left and two facts from that chat float around it. Below 980px the stage follows the copy.
export default function Hero() {
  // Pointer position over the hero, -0.5..0.5 on each axis, smoothed. Drives the aurora and a
  // slight depth shift of the stage. Touch and reduced motion never move it.
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const sx = useSpring(px, { stiffness: 60, damping: 20 })
  const sy = useSpring(py, { stiffness: 60, damping: 20 })
  const auroraX = useTransform(sx, (v) => v * 80)
  const auroraY = useTransform(sy, (v) => v * 60)
  // Phone drifts against the pointer, the floating facts with it: a little depth
  const stageX = useTransform(sx, (v) => v * -14)
  const stageY = useTransform(sy, (v) => v * -10)
  const pillX = useTransform(sx, (v) => v * 22)
  const pillY = useTransform(sy, (v) => v * 16)

  const onPointerMove = (e) => {
    if (e.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const r = e.currentTarget.getBoundingClientRect()
    px.set((e.clientX - r.left) / r.width - 0.5)
    py.set((e.clientY - r.top) / r.height - 0.5)
  }

  return (
    <section className="hero" id="top" onPointerMove={onPointerMove}>
      <motion.div className="hero-aurora" style={{ x: auroraX, y: auroraY }} aria-hidden="true">
        <span className="hero-blob hero-blob-violet" />
        <span className="hero-blob hero-blob-blue" />
        <span className="hero-blob hero-blob-cyan" />
      </motion.div>
      <div className="container hero-grid">
        <div className="hero-copy">
          <h1 className="h-display hero-title">
            {words.map((w, i) => (
              <span key={i}>
                <span className="hero-word">
                  <motion.span
                    className={i >= accentFrom ? 'text-beam' : undefined}
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
          <motion.div className="hero-phone" style={{ x: stageX, y: stageY }}>
            <ChatWindow steps={TRANSCRIPTS.pulsa.steps} label={HERO.chatLabel} />
          </motion.div>
          <div className="hero-nova">
            <Nova pose="wave" size={190} track beam />
          </div>
          {HERO.pills.map((p, i) => (
            <motion.div
              style={{ x: pillX, translateY: pillY }}
              key={p.title}
              className={`hero-pill-wrap hero-pill-${i}`}
            >
              <motion.div
                className="hero-pill"
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
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
