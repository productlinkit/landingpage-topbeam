import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { SIM } from '../content'
import { TRANSCRIPTS } from '../data/transcripts'
import { DECISIONS } from '../data/facts'
import { ChatWindow } from '../components/ChatWindow'
import { Icon } from '../components/Icon'
import { Nova } from '../components/Nova'
import { LiveDot, Reveal, SectionHead } from '../components/ui'
import { useCountUp } from '../hooks/useCountUp'
import { EASE } from '../components/ease'
import './Simulator.css'

// Decision replay: pick a transaction, the real chat replays in the phone (ChatWindow, engine
// untouched) and the log beside it lists, step by step, what Nova checked and why. The
// transaction list and two counters sit in a side column, like a conversation inbox.
export default function Simulator() {
  const [pick, setPick] = useState(0)
  const sc = SIM.scenarios[pick]
  const d = DECISIONS[sc.id]

  return (
    <section className="section sim slab-bottom" data-theme="dark" id="simulasi" aria-labelledby="sim-title">
      <div className="container">
        <SectionHead id="sim-title" title={SIM.title} lead={SIM.lead} />

        <div className="sim-layout">
          <div className="sim-aside">
            <p className="sim-aside-title mono">{SIM.list(SIM.scenarios.length)}</p>
            <div className="sim-picker" role="group" aria-label={SIM.pick}>
              {SIM.scenarios.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  className={`sim-option ${pick === i ? 'is-on' : ''}`}
                  aria-pressed={pick === i}
                  onClick={() => setPick(i)}
                >
                  {pick === i && (
                    <motion.span
                      layoutId="sim-option"
                      className="sim-option-bg"
                      transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                    />
                  )}
                  <span className="sim-option-icon" aria-hidden="true">
                    <Icon name={s.icon} size={18} />
                  </span>
                  <span className="sim-option-text">
                    <strong>{s.title}</strong>
                    <span>{s.sub}</span>
                  </span>
                </button>
              ))}
            </div>
            <div className="sim-stats">
              <SimStat value={d.rows.length} label={SIM.statSteps} id={sc.id} />
              <SimStat value={0} label={SIM.statBills} id={sc.id} accent />
            </div>
          </div>

        <div className="sim-grid">
          <Reveal className="sim-phone" amount={0.15}>
            <ChatWindow
              steps={TRANSCRIPTS[sc.id].steps}
              replayKey={sc.id}
              label={`Percakapan asli dengan Nova: ${sc.title}`}
            />
          </Reveal>

          <Reveal className="card sim-log" delay={0.1} amount={0.15}>
            <div className="sim-log-head">
              <Nova pose="headset" size={44} mood="think" />
              <div className="sim-log-id">
                <span className="mono">{SIM.logTitle}</span>
                <strong>{d.title}</strong>
              </div>
              <span className="pill pill-wait sim-status">
                <LiveDot tone="wait" />
                {d.status.label}
              </span>
            </div>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={sc.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
              >
                <motion.ol
                  className="sim-rows"
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={{ show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } } }}
                >
                  {d.rows.map((r, i) => (
                    <motion.li
                      key={`${sc.id}-${i}`}
                      className={`sim-row is-${r.state}`}
                      variants={{
                        hidden: { opacity: 0, x: -12 },
                        show: { opacity: 1, x: 0, transition: { duration: 0.45, ease: EASE } },
                      }}
                    >
                      <span className="sim-row-mark" aria-hidden="true">
                        {r.state === 'done' ? <Icon name="check" size={13} strokeWidth={2.8} /> : <LiveDot tone="wait" />}
                      </span>
                      <span className="sim-row-text">
                        <span className="mono">{SIM.step(i + 1)}</span>
                        <strong>{r.title}</strong>
                        <span>{r.detail}</span>
                      </span>
                    </motion.li>
                  ))}
                </motion.ol>

                <div className="sim-why">
                  <span className="sim-why-icon" aria-hidden="true">
                    <Icon name="spark" size={16} />
                  </span>
                  <div>
                    <strong>{SIM.why}</strong>
                    <p>{d.why}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <p className="sim-source">
              <Icon name="book" size={14} />
              {SIM.source}
            </p>
          </Reveal>
        </div>
        </div>
      </div>
    </section>
  )
}

function SimStat({ value, label, id, accent = false }) {
  const [ref, n] = useCountUp(value, { key: id, duration: 900 })
  return (
    <div ref={ref} className={`sim-stat ${accent ? 'is-accent' : ''}`}>
      <strong style={{ minWidth: `${String(value).length}ch` }}>{n}</strong>
      <span>{label}</span>
    </div>
  )
}
