import { useRef, useState } from 'react'
import { AnimatePresence, motion, useInView } from 'motion/react'
import { REPLAY, SAFETY } from '../content'
import { Icon } from '../components/Icon'
import { Reveal } from '../components/ui'
import { EASE } from '../components/ease'
import { useChatScript } from '../hooks/useChatScript'
import './Replay.css'

const bubble = {
  initial: { opacity: 0, y: 14, scale: 0.96 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, transition: { duration: 0.2 } },
  transition: { duration: 0.45, ease: EASE },
}

// The one dark section: a conversation that replays itself, a picker beside it,
// two trust figures, then the safety promises.
export default function Replay() {
  const [pick, setPick] = useState(0)
  const s = REPLAY.scenarios[pick]
  const stage = useRef(null)
  const inView = useInView(stage, { amount: 0.35 })

  return (
    <section className="section replay" id="keamanan">
      <div className="container">
        <div className="section-head">
          <Reveal as="h2" className="h-section">
            {REPLAY.title}
          </Reveal>
          <Reveal as="p" className="lead" delay={0.08}>
            {REPLAY.lead}
          </Reveal>
        </div>

        <div className="replay-grid">
          <Reveal className="replay-stage" amount={0.2}>
            <div className="replay-head mono">
              <span>
                {s.tag} · {s.title}
              </span>
              <span className="replay-live">
                <span aria-hidden="true" />
                {REPLAY.agent}
              </span>
            </div>
            <div
              ref={stage}
              className="replay-body"
              role="img"
              aria-label={`Contoh percakapan: ${s.title}. ${s.chat.map((m) => m.text).join(' ')}`}
            >
              <Conversation key={s.id} script={s.chat} active={inView} />
            </div>
          </Reveal>

          <div className="replay-side">
            <div className="replay-picks" role="radiogroup" aria-label={REPLAY.pick}>
              {REPLAY.scenarios.map((sc, i) => (
                <button
                  key={sc.id}
                  type="button"
                  role="radio"
                  aria-checked={pick === i}
                  className={`replay-pick ${pick === i ? 'is-on' : ''}`}
                  onClick={() => setPick(i)}
                >
                  <strong>{sc.title}</strong>
                  <span>{sc.sub}</span>
                </button>
              ))}
            </div>
            <Reveal className="replay-stats" delay={0.1}>
              {REPLAY.stats.map((st, i) => (
                <div key={st.label}>
                  <strong className={i === 0 ? 'is-accent' : undefined}>{st.value}</strong>
                  <span>{st.label}</span>
                </div>
              ))}
            </Reveal>
          </div>
        </div>

        <div className="replay-safety">
          <Reveal as="h3" className="h-card replay-safety-title">
            {SAFETY.lead} <span>{SAFETY.strong}</span>
          </Reveal>
          <ul className="replay-safety-list">
            {SAFETY.points.map((p, i) => (
              <Reveal as="li" key={p.title} delay={i * 0.08}>
                <span className="replay-safety-icon">
                  <Icon name={p.icon} size={20} />
                </span>
                <strong>{p.title}</strong>
                <p>{p.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

function Conversation({ script, active }) {
  const { shown, typing, cycle } = useChatScript(script, active)
  return (
    <AnimatePresence mode="popLayout">
      {script.slice(0, shown).map((m, i) => (
        <motion.div
          key={`${cycle}-${i}`}
          layout="position"
          {...bubble}
          className={`rp-bubble rp-${m.from}`}
          aria-hidden="true"
        >
          {m.text}
          {m.options && (
            <span className="rp-options">
              {m.options.map((o) => (
                <span key={o}>{o}</span>
              ))}
            </span>
          )}
        </motion.div>
      ))}
      {typing && (
        <motion.div key={`t-${cycle}-${shown}`} layout="position" {...bubble} className="rp-bubble rp-nova rp-typing">
          <span />
          <span />
          <span />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
