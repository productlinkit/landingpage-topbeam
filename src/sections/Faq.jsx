import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { FAQ, FAQS } from '../content'
import { Icon } from '../components/Icon'
import { Mark, Reveal, SectionHead, WaButton } from '../components/ui'
import { EASE } from '../components/ease'
import './Faq.css'

// Desktop: question list left, Nova "answers" the chosen one in a chat card right.
// Below 960px the card is hidden and the answer opens under its question instead.
export default function Faq() {
  const [open, setOpen] = useState(0)
  const f = FAQS[open]

  return (
    <section className="section section-soft faq" id="faq">
      <div className="container">
        <SectionHead title={FAQ.title} lead={FAQ.lead} />

        <div className="faq-grid">
          <ul className="faq-list" aria-label={FAQ.pick}>
            {FAQS.map((q, i) => {
              const isOpen = open === i
              return (
                <li key={q.q} className={`faq-item ${isOpen ? 'is-open' : ''}`}>
                  <h3>
                    <button
                      type="button"
                      id={`faq-q-${i}`}
                      className="faq-q"
                      aria-expanded={isOpen}
                      aria-controls={`faq-a-${i}`}
                      onClick={() => setOpen(i)}
                    >
                      <span>{q.q}</span>
                      <span className="arrow-chip" aria-hidden="true">
                        <Icon name="arrow" size={16} />
                      </span>
                    </button>
                  </h3>
                  {/* Inline answer, only displayed on small screens */}
                  <div id={`faq-a-${i}`} role="region" aria-labelledby={`faq-q-${i}`} className="faq-a" hidden={!isOpen}>
                    <p>{q.a}</p>
                  </div>
                </li>
              )
            })}
          </ul>

          <Reveal className="faq-card" amount={0.2}>
            <div className="faq-card-head">
              <span className="faq-avatar">
                <Mark size={30} />
              </span>
              <span className="faq-agent">
                <strong>{FAQ.agent}</strong>
                <span>{FAQ.agentSub}</span>
              </span>
              <span className="faq-status mono">
                <span aria-hidden="true" />
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
                  transition={{ duration: 0.4, ease: EASE }}
                >
                  <span className="faq-ask">{f.q}</span>
                  <span className="faq-answer">{f.a}</span>
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
