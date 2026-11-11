import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react'
import { HOW } from '../content'
import { Icon } from '../components/Icon'
import { Nova } from '../components/Nova'
import { SectionHead } from '../components/ui'
import { EASE } from '../components/ease'
import './How.css'

const AUTO_MS = 4500
const TINTS = ['var(--lilac)', 'var(--sky)', 'var(--gold)', 'var(--aqua)']
const POSES = ['wave', 'think', 'cheer', 'phone']

// Four steps on a rail with a beam progress line. While on screen the steps advance on their own
// until the visitor taps one; then the choice stays.
export default function How() {
  const [step, setStep] = useState(0)
  const [manual, setManual] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { amount: 0.4 })
  const reduce = useReducedMotion()
  const total = HOW.steps.length
  const s = HOW.steps[step]

  useEffect(() => {
    if (manual || reduce || !inView) return
    const t = setTimeout(() => setStep((n) => (n + 1) % total), AUTO_MS)
    return () => clearTimeout(t)
  }, [step, manual, reduce, inView, total])

  const pick = (i) => {
    setManual(true)
    setStep(i)
  }

  return (
    <section className="section section-soft how" id="cara-kerja" ref={ref}>
      <div className="container">
        <SectionHead title={HOW.title} lead={HOW.lead} />

        <div className="how-rail" role="tablist" aria-label={HOW.pick}>
          <span className="how-track" aria-hidden="true">
            <motion.span
              className="how-beam"
              initial={false}
              animate={{ scaleX: step / (total - 1) }}
              transition={{ duration: 0.7, ease: EASE }}
            />
          </span>
          {HOW.steps.map((st, i) => (
            <button
              key={st.title}
              type="button"
              role="tab"
              id={`how-tab-${i}`}
              aria-selected={step === i}
              aria-controls="how-panel"
              className={`how-tab ${step === i ? 'is-on' : ''} ${i < step ? 'is-done' : ''}`}
              onClick={() => pick(i)}
            >
              <span className="how-dot" aria-hidden="true">
                {i < step ? <Icon name="check" size={14} strokeWidth={3} /> : i + 1}
              </span>
              <span className="how-tab-title">{st.title}</span>
              <span className="how-tab-short">{st.short}</span>
            </button>
          ))}
        </div>

        <div className="how-card" id="how-panel" role="tabpanel" aria-labelledby={`how-tab-${step}`}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={step}
              className="how-copy"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              <span className="mono how-count">{HOW.count(step + 1, total)}</span>
              <h3 className="h-card">{s.title}</h3>
              <p>{s.body}</p>
            </motion.div>
          </AnimatePresence>

          <div className="how-panel" style={{ '--tint': TINTS[step] }} aria-hidden="true">
            <span className="how-nova">
              <Nova pose={POSES[step]} size={92} />
            </span>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={step}
                className="how-demo"
                initial={{ opacity: 0, scale: 0.96, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.45, ease: EASE }}
              >
                <Demo demo={s.demo} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}

function Demo({ demo }) {
  if (demo.kind === 'chat' || demo.kind === 'approve') {
    const order = demo.kind === 'chat' ? ['me', 'nova'] : ['nova', 'me']
    return (
      <div className="how-chat">
        {order.map((who, i) => (
          <motion.span
            key={who}
            className={`bubble bubble-${who}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25 + i * 0.5, ease: EASE }}
          >
            {demo[who]}
          </motion.span>
        ))}
      </div>
    )
  }
  if (demo.kind === 'confirm') {
    return (
      <dl className="how-confirm">
        {demo.rows.map((r, i) => (
          <motion.div
            key={r.label}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, delay: 0.2 + i * 0.12 }}
          >
            <dt>{r.label}</dt>
            <dd>{r.value}</dd>
          </motion.div>
        ))}
        <p className="mono">{demo.note}</p>
      </dl>
    )
  }
  return (
    <div className="how-pay">
      <span className="how-qr">
        <Icon name="qr" size={64} strokeWidth={1.6} />
      </span>
      <strong>{demo.title}</strong>
      <span className="mono">{demo.sub}</span>
    </div>
  )
}
