import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react'
import { HOW } from '../content'
import { Icon } from '../components/Icon'
import { Reveal, SectionHead } from '../components/ui'
import { EASE } from '../components/ease'
import {
  ApproveVignette,
  ChatVignette,
  ConfirmVignette,
  DoneVignette,
  PayVignette,
} from '../components/Vignettes'
import './How.css'

// One illustration per step, in step order.
const VIGNETTES = [ChatVignette, ConfirmVignette, ApproveVignette, PayVignette, DoneVignette]
const AUTO_MS = 5000

// Timeline of steps (tabs) above one big card that shows the chosen step.
// While on screen it advances by itself until the visitor picks a step.
export default function How() {
  const steps = HOW.steps
  const [active, setActive] = useState(0)
  const [auto, setAuto] = useState(true)
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const inView = useInView(ref, { amount: 0.4 })
  const tabs = useRef([])

  const playing = auto && inView && !reduce

  useEffect(() => {
    if (!playing) return
    const t = setTimeout(() => setActive((a) => (a + 1) % steps.length), AUTO_MS)
    return () => clearTimeout(t)
  }, [playing, active, steps.length])

  const pick = (i) => {
    setAuto(false)
    setActive(i)
  }

  // Arrow keys move between tabs (WAI-ARIA tabs pattern)
  const onKey = (e) => {
    const dir = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0
    if (!dir) return
    e.preventDefault()
    const next = (active + dir + steps.length) % steps.length
    pick(next)
    tabs.current[next]?.focus()
  }

  const step = steps[active]
  const Vignette = VIGNETTES[active]

  return (
    <section className="section section-soft how" id="cara-kerja" ref={ref}>
      <div className="container">
        <SectionHead title={HOW.title} lead={HOW.lead} />

        <Reveal className="how-line" style={{ '--n': steps.length, '--at': active }}>
          <span className="how-track" aria-hidden="true">
            <span className="how-fill" />
          </span>
          <div className="how-tabs" role="tablist" aria-label={HOW.railLabel} onKeyDown={onKey}>
            {steps.map((s, i) => (
              <button
                key={s.title}
                ref={(el) => (tabs.current[i] = el)}
                type="button"
                role="tab"
                id={`how-tab-${i}`}
                aria-selected={active === i}
                aria-controls="how-panel"
                tabIndex={active === i ? 0 : -1}
                className={`how-tab ${i < active ? 'is-done' : ''} ${i === active ? 'is-on' : ''}`}
                onClick={() => pick(i)}
              >
                <span className="how-dot" aria-hidden="true">
                  {i < active && <Icon name="check" size={12} strokeWidth={3} />}
                  {i === active && playing && <span key={active} className="how-ring" />}
                </span>
                <span className="how-tab-title">{s.title}</span>
                <span className="how-tab-sub">{s.short}</span>
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal className="how-card" amount={0.2}>
          <div
            className="how-copy"
            id="how-panel"
            role="tabpanel"
            aria-labelledby={`how-tab-${active}`}
            aria-live={auto ? 'off' : 'polite'}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                <span className="mono how-count">{HOW.count(active + 1, steps.length)}</span>
                <h3 className="h-card">{step.title}</h3>
                <p>{step.body}</p>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="how-media" style={{ '--tint': step.tint }}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active}
                className="how-media-inner"
                initial={{ opacity: 0, y: 20, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -16, scale: 0.98 }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <Vignette />
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
