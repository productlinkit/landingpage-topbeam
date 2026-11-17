import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { FAQ, FAQS } from '../content'
import { Icon } from '../components/Icon'
import { Nova } from '../components/Nova'
import { LiveDot, Reveal, SceneHead, WaButton } from '../components/ui'
import { TopbeamMark } from '../components/ds/TopbeamMark'
import { DUR, EASE } from '../components/ease'
import './Faq.css'

const TOPICS = [FAQ.all, ...new Set(FAQS.map((f) => f.topic))]

// Topic chips filter the questions. Desktop: list left, Nova "answers" the chosen one in a chat
// card right, with the rule the answer comes from. Below 960px the card is hidden and the answer
// opens under its question instead (that inline copy is the accessible one at every width).
export default function Faq() {
  const [topic, setTopic] = useState(FAQ.all)
  const [open, setOpen] = useState(0)
  const [typing, setTyping] = useState(false)
  const reduce = useReducedMotion()
  const list = useMemo(
    () => FAQS.map((f, i) => ({ ...f, i })).filter((f) => topic === FAQ.all || f.topic === topic),
    [topic],
  )
  const f = FAQS[open]

  useEffect(() => {
    if (!typing) return
    const t = setTimeout(() => setTyping(false), 700)
    return () => clearTimeout(t)
  }, [typing, open])

  const choose = (i) => {
    if (i === open) return
    setOpen(i)
    setTyping(!reduce)
  }
  const pickTopic = (t) => {
    setTopic(t)
    const first = FAQS.findIndex((q) => t === FAQ.all || q.topic === t)
    if (first !== -1) choose(first)
  }

  return (
    <section className="section faq is-plain" id="faq" aria-labelledby="faq-title">
      <div className="container">
        <SceneHead id="faq-title" title={FAQ.title} lead={FAQ.lead} mascot={<Nova pose="headset" size={180} />} />

        <Reveal className="faq-topics" role="group" aria-label={FAQ.topics}>
          {TOPICS.map((t) => (
            <button
              key={t}
              type="button"
              className={`faq-topic ${topic === t ? 'is-on' : ''}`}
              aria-pressed={topic === t}
              onClick={() => pickTopic(t)}
            >
              {t}
            </button>
          ))}
        </Reveal>

        <div className="faq-grid">
          <ul className="faq-list" aria-label={FAQ.pick}>
            <AnimatePresence initial={false} mode="popLayout">
              {list.map((q) => {
                const isOpen = open === q.i
                return (
                  <motion.li
                    key={q.q}
                    layout="position"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, transition: { duration: 0.15 } }}
                    transition={{ duration: 0.35, ease: EASE }}
                    className={`faq-item ${isOpen ? 'is-open' : ''}`}
                  >
                    <h3>
                      <button
                        type="button"
                        id={`faq-q-${q.i}`}
                        className="faq-q"
                        aria-expanded={isOpen}
                        aria-controls={`faq-a-${q.i}`}
                        onClick={() => choose(q.i)}
                      >
                        <span className="faq-q-topic mono">{q.topic}</span>
                        <span className="faq-q-text">{q.q}</span>
                        <span className="faq-chip" aria-hidden="true">
                          <Icon name="arrow" size={15} />
                        </span>
                      </button>
                    </h3>
                    {/* Inline answer: the one screen readers use; shown visually on small screens.
                        It opens by growing to its height while fading in, and closes the same way. */}
                    <div id={`faq-a-${q.i}`}>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            key="a"
                            role="region"
                            aria-labelledby={`faq-q-${q.i}`}
                            className="faq-a"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: reduce ? 0 : DUR.base, ease: EASE }}
                          >
                            <div className="faq-a-inner">
                              <p>{q.a}</p>
                              <p className="faq-source">
                                {FAQ.sourceLabel}: {q.source}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.li>
                )
              })}
            </AnimatePresence>
          </ul>

          <Reveal className="card faq-card" data-theme="dark" amount={0.2}>
            <div className="faq-card-head">
              <span className="faq-avatar">
                <TopbeamMark height={30} />
              </span>
              <span className="faq-agent">
                <strong>{FAQ.agent}</strong>
                <span>{FAQ.agentSub}</span>
              </span>
              <span className="pill pill-ok faq-status mono">
                <LiveDot />
                {FAQ.status}
              </span>
            </div>
            {/* Visual duplicate of the inline answer, hidden from screen readers */}
            <div className="faq-chat" aria-hidden="true">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={open}
                  className="faq-chat-inner"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, ease: EASE }}
                >
                  <span className="faq-ask">{f.q}</span>
                  {typing ? (
                    <span className="faq-typing">
                      <span />
                      <span />
                      <span />
                    </span>
                  ) : (
                    <motion.div
                      className="faq-answer"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, ease: EASE }}
                    >
                      <p>{f.a}</p>
                      <span className="faq-cite">
                        <Icon name="book" size={13} />
                        <span>
                          {FAQ.sourceLabel}: {f.source}
                        </span>
                      </span>
                    </motion.div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="faq-more">
              <p>{FAQ.more}</p>
              <WaButton cta="faq" size="sm">
                {FAQ.cta}
              </WaButton>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
