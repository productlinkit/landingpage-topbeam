import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react'
import { STEPS } from '../content'
import { Icon } from '../components/Icon'
import { LiveDot, Reveal, SceneHead, WaButton } from '../components/ui'
import { Nova } from '../components/Nova'
import { EASE } from '../components/ease'
import './Steps.css'

const AUTO = 6000 // ms per step while auto-playing

// Tabbed stepper: four steps on the left (or a scroller on phones), the chosen step's panel on
// the right with what Nova sends at that point. Auto-advances while on screen, stops for good
// as soon as the visitor picks a step, and pauses on hover or focus.
export default function Steps() {
  const [pick, setPick] = useState(0)
  const [auto, setAuto] = useState(true)
  const [paused, setPaused] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { amount: 0.4 })
  const reduce = useReducedMotion()
  const playing = auto && !paused && inView && !reduce
  const total = STEPS.items.length
  const s = STEPS.items[pick]

  useEffect(() => {
    if (!playing) return
    const t = setTimeout(() => setPick((p) => (p + 1) % total), AUTO)
    return () => clearTimeout(t)
  }, [playing, pick, total])

  const choose = (i) => {
    setAuto(false)
    setPick(i)
  }

  // Arrow keys move between tabs (WAI-ARIA tabs pattern)
  const onKey = (e) => {
    const d = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0
    if (!d) return
    e.preventDefault()
    const next = (pick + d + total) % total
    choose(next)
    document.getElementById(`step-tab-${next}`)?.focus()
  }

  return (
    <section className="section steps slab-top" data-theme="dark" id="cara-kerja" aria-labelledby="steps-title">
      <span className="beam-line" aria-hidden="true" />
      <div className="container">
        <SceneHead
          id="steps-title"
          title={STEPS.title}
          lead={STEPS.lead}
          mascot={<Nova pose="crossed" size={200} />}
        />

        <Reveal
          className="steps-grid"
          amount={0.2}
          onPointerEnter={() => setPaused(true)}
          onPointerLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <div ref={ref} className="steps-tabs" role="tablist" aria-label={STEPS.pick} onKeyDown={onKey}>
            {STEPS.items.map((it, i) => {
              const on = pick === i
              return (
                <button
                  key={it.title}
                  id={`step-tab-${i}`}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  aria-controls="step-panel"
                  tabIndex={on ? 0 : -1}
                  className={`steps-tab ${on ? 'is-on' : ''} ${i < pick ? 'is-past' : ''}`}
                  onClick={() => choose(i)}
                >
                  <span className="steps-num mono">{String(i + 1).padStart(2, '0')}</span>
                  <span className="steps-tab-text">
                    <strong>{it.title}</strong>
                    <span>{it.short}</span>
                  </span>
                  <span className="steps-tab-icon" aria-hidden="true">
                    <Icon name={it.icon} size={18} />
                  </span>
                  {on && (
                    <span className="steps-bar" aria-hidden="true">
                      <span key={`${pick}-${playing}`} className={playing ? 'is-playing' : ''} style={{ '--auto': `${AUTO}ms` }} />
                    </span>
                  )}
                </button>
              )
            })}
          </div>

          <div id="step-panel" role="tabpanel" aria-labelledby={`step-tab-${pick}`} className="card steps-panel">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={pick}
                className="steps-panel-inner"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                <div className="steps-panel-copy">
                  <span className="pill pill-accent mono">{STEPS.count(pick + 1, total)}</span>
                  <h3 className="h-card">{s.title}</h3>
                  <p>{s.body}</p>
                  <WaButton cta="steps" size="sm" variant="ghost" arrow className="steps-cta">
                    {STEPS.cta}
                  </WaButton>
                </div>
                <div className="steps-demo" aria-hidden="true">
                  <Demo demo={s.demo} />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

const pop = (i) => ({
  initial: { opacity: 0, y: 12, scale: 0.96 },
  animate: { opacity: 1, y: 0, scale: 1 },
  transition: { duration: 0.45, delay: 0.15 + i * 0.35, ease: EASE },
})

function Demo({ demo }) {
  if (demo.kind === 'chat' || demo.kind === 'approve') {
    const first = demo.kind === 'chat' ? { from: 'me', text: demo.me } : { from: 'nova', text: demo.nova }
    const second = demo.kind === 'chat' ? { from: 'nova', text: demo.nova } : { from: 'me', text: demo.me }
    return (
      <div className="steps-chat">
        {[first, second].map((m, i) => (
          <motion.span key={i} className={`steps-bubble is-${m.from}`} {...pop(i)}>
            {m.text}
          </motion.span>
        ))}
        {demo.kind === 'approve' && (
          <motion.span className="pill pill-ok steps-tag" {...pop(2)}>
            <Icon name="check" size={14} strokeWidth={2.6} />
            {STEPS.approved}
          </motion.span>
        )}
      </div>
    )
  }
  if (demo.kind === 'confirm')
    return (
      <motion.dl className="steps-receipt" {...pop(0)}>
        {demo.rows.map((r) => (
          <div key={r.label}>
            <dt>{r.label}</dt>
            <dd>{r.value}</dd>
          </div>
        ))}
        <p className="mono">{demo.note}</p>
      </motion.dl>
    )
  return (
    <motion.div className="steps-pay" {...pop(0)}>
      <span className="steps-qr">
        <Icon name="qr" size={44} strokeWidth={1.6} />
      </span>
      <strong>{demo.title}</strong>
      <span className="steps-amount">{demo.amount}</span>
      <span className="pill pill-wait">
        <LiveDot tone="wait" />
        {demo.sub}
      </span>
    </motion.div>
  )
}
