import { useEffect, useRef, useState } from 'react'
import { animate, motion, useInView, useReducedMotion } from 'motion/react'
import { FLOW } from '../content'
import { Nova } from '../components/Nova'
import { Reveal, SectionHead } from '../components/ui'
import './Flow.css'

const SPAWN_MS = 1100 // a new pill every ~1s
const LIFE_S = 6.5 // how long one pill takes to rise and fade
// Horizontal lanes (% from centre) so pills spread out instead of stacking
const LANES = [-30, 18, -8, 30, -22, 6, 26, -16]

// After bloop's "A month, in motion": labelled pills rise from Nova, one per finished step,
// over a soft logo-tinted stage. Below it, three count-up facts. Pauses off screen;
// under reduced motion the pills sit still in a scattered cloud.
export default function Flow() {
  return (
    <section className="section flow">
      <div className="container">
        <SectionHead title={FLOW.title} lead={FLOW.lead} />
        <Reveal className="flow-stage" amount={0.2}>
          <Stage />
        </Reveal>
        <ul className="flow-legend" aria-label="Keterangan warna">
          {FLOW.legend.map((l) => (
            <li key={l.kind}>
              <span className={`flow-dot flow-${l.kind}`} aria-hidden="true" />
              {l.label}
            </li>
          ))}
        </ul>
        <ul className="flow-stats">
          {FLOW.stats.map((s, i) => (
            <Reveal as="li" key={s.label} className="flow-stat" style={{ '--tint': s.tint }} delay={i * 0.08}>
              <CountUp to={s.value} />
              <span className="flow-stat-label">{s.label}</span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Stage() {
  const ref = useRef(null)
  const active = useInView(ref, { amount: 0.25 })
  const reduce = useReducedMotion()
  const [pills, setPills] = useState([])
  const next = useRef(0)

  useEffect(() => {
    if (!active || reduce) return
    const spawn = () => {
      const n = next.current++
      setPills((list) => [...list, { id: n, pill: FLOW.pills[n % FLOW.pills.length], lane: LANES[n % LANES.length] }])
    }
    spawn()
    const t = setInterval(spawn, SPAWN_MS)
    return () => clearInterval(t)
  }, [active, reduce])

  const done = (id) => setPills((list) => list.filter((p) => p.id !== id))

  return (
    <div ref={ref} className="flow-canvas" role="img" aria-label={FLOW.label}>
      <span className="flow-glow" aria-hidden="true" />
      {reduce ? (
        <div className="flow-static" aria-hidden="true">
          {FLOW.pills.slice(0, 8).map((p, i) => (
            <span key={i} className={`flow-pill flow-${p.kind}`}>
              <span className="flow-dot" />
              {p.text}
            </span>
          ))}
        </div>
      ) : (
        pills.map(({ id, pill, lane }) => (
          <motion.span
            key={id}
            className={`flow-pill flow-${pill.kind}`}
            aria-hidden="true"
            style={{ left: `calc(50% + ${lane}%)` }}
            initial={{ y: 0, x: '-50%', opacity: 0, scale: 0.7 }}
            animate={{ y: -360, opacity: [0, 1, 1, 0], scale: [0.7, 1, 1, 0.95] }}
            transition={{ duration: LIFE_S, ease: [0.2, 0.7, 0.3, 1], times: [0, 0.12, 0.75, 1] }}
            onAnimationComplete={() => done(id)}
          >
            <span className="flow-dot" />
            {pill.text}
          </motion.span>
        ))
      )}
      <div className="flow-nova" aria-hidden="true">
        <Nova pose="cheer" size={170} beam />
      </div>
    </div>
  )
}

// Counts from a few steps away to the value when it scrolls into view (down for 0).
function CountUp({ to }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reduce = useReducedMotion()
  const [shown, setShown] = useState(to)

  useEffect(() => {
    if (!inView || reduce) return
    const from = to === 0 ? 9 : 0
    const ctl = animate(from, to, { duration: 1.4, ease: [0.23, 1, 0.32, 1], onUpdate: (v) => setShown(Math.round(v)) })
    return () => ctl.stop()
  }, [inView, reduce, to])

  return (
    <span ref={ref} className="flow-stat-value">
      {shown}
    </span>
  )
}
