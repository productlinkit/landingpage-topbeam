import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { HERO } from '../content'
import { TRANSCRIPTS } from '../data/transcripts'
import { ChatWindow } from '../components/ChatWindow'
import { Nova } from '../components/Nova'
import { Icon } from '../components/Icon'
import { LiveDot, WaButton } from '../components/ui'
import { DUR, EASE, RISE } from '../components/ease'
import './Hero.css'

const words = HERO.title.split(' ')
const accentFrom = words.length - HERO.titleAccent.split(' ').length
const rise = (delay, go = true) => ({
  initial: { opacity: 0, y: RISE },
  animate: go ? { opacity: 1, y: 0 } : undefined,
  transition: { duration: DUR.reveal, delay, ease: EASE },
})

// Left: big headline (its last words in the brand colour, the key word underlined with the
// beam), lead and two pill buttons. Right: the real chat replay in a phone (ChatWindow),
// notification chips that pop out of its side with what Nova checked, and Nova waving in her
// halo beside it. Phone and chips drift with the pointer; Nova leans toward it. Below 1024px
// the stage follows the copy.
// Resolves once the web fonts are in (or after 500ms), so the headline reveals in its final
// font instead of reflowing mid-animation.
function useFontsReady(timeout = 500) {
  const [ready, setReady] = useState(() => typeof document === 'undefined' || document.fonts?.status === 'loaded')
  useEffect(() => {
    if (ready) return
    const done = () => setReady(true)
    const t = setTimeout(done, timeout)
    document.fonts?.ready.then(done)
    return () => clearTimeout(t)
  }, [ready, timeout])
  return ready
}

export default function Hero() {
  const stage = useRef(null)
  const reduce = useReducedMotion()
  const go = useFontsReady()

  // Pointer parallax: layers read --px/--py (-1..1) and move at different depths (CSS)
  const onMove = (e) => {
    if (reduce || e.pointerType !== 'mouse' || !stage.current) return
    const r = stage.current.getBoundingClientRect()
    stage.current.style.setProperty('--px', (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3))
    stage.current.style.setProperty('--py', (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(3))
  }
  const onLeave = () => {
    stage.current?.style.setProperty('--px', 0)
    stage.current?.style.setProperty('--py', 0)
  }

  return (
    <section className="hero" data-theme="dark" id="top">
      <div className="container hero-grid">
        <div className="hero-copy">
          <h1 className="h-display hero-title">
            {words.map((w, i) => (
              <span key={i}>
                <span className="hero-word">
                  <motion.span
                    className={i >= accentFrom ? `hero-accent${i === words.length - 1 ? ' is-key' : ''}` : undefined}
                    initial={{ y: '110%' }}
                    animate={go ? { y: 0 } : undefined}
                    transition={{ duration: DUR.reveal, delay: 0.3 + i * 0.06, ease: EASE }}
                  >
                    {w}
                  </motion.span>
                </span>
                {i < words.length - 1 && ' '}
              </span>
            ))}
          </h1>

          <motion.p className="lead hero-sub" {...rise(0.55, go)}>
            {HERO.sub}
          </motion.p>

          <motion.div className="hero-actions" {...rise(0.65, go)}>
            <WaButton cta="hero">{HERO.primary}</WaButton>
            <a href="#simulasi" className="btn btn-ghost">
              {HERO.secondary}
            </a>
          </motion.div>

          <motion.ul className="hero-chips" {...rise(0.72, go)}>
            {HERO.chips.map((c) => (
              <li key={c}>
                <Icon name="check" size={15} strokeWidth={2.4} />
                {c}
              </li>
            ))}
          </motion.ul>
        </div>

        <motion.div ref={stage} className="hero-stage" onPointerMove={onMove} onPointerLeave={onLeave} {...rise(0, go)}>
          <div className="hero-phone">
            <ChatWindow steps={TRANSCRIPTS.pulsa.steps} label={HERO.chatLabel} />
          </div>

          {/* entrance order: her halo + Nova first, then the headline, subtext and CTA */}
          <motion.div
            className="hero-nova"
            initial={{ opacity: 0, y: 24, scale: 0.92 }}
            animate={go ? { opacity: 1, y: 0, scale: 1 } : undefined}
            transition={{ duration: DUR.reveal, delay: 0.1, ease: EASE }}
          >
            <Nova pose="wave" hoverPose="thumbsup" halo track size={300} />
          </motion.div>

          <ol className="hero-log" aria-label="Contoh log langkah Nova">
            {HERO.log.map((l, i) => (
              // three layers, three transforms: the entrance (motion) pops the chip out of the
              // phone's side, the pointer parallax moves it at its own depth, and the pill
              // floats on its own tempo with its own tilt (CSS)
              <motion.li
                key={l.text}
                className={`hero-log-item is-${l.tone}`}
                initial={{ opacity: 0, x: 28, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.55, delay: 0.9 + i * 0.1, ease: EASE }}
              >
                <span className="hero-log-depth">
                  <span className="hero-log-pill">
                    <span className="hero-log-icon">
                      {l.tone === 'ok' ? <Icon name="check" size={14} strokeWidth={2.8} /> : <LiveDot tone="wait" />}
                    </span>
                    <span className="hero-log-text">
                      <strong>{l.text}</strong>
                      <span>{l.kicker}</span>
                    </span>
                  </span>
                </span>
              </motion.li>
            ))}
          </ol>

        </motion.div>
      </div>
    </section>
  )
}
