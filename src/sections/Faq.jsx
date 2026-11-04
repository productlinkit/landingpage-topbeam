import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { FAQ, FAQS } from '../content'
import { Icon } from '../components/Icon'
import { Reveal, WaButton } from '../components/ui'
import { EASE } from '../components/ease'
import './Faq.css'

export default function Faq() {
  const [open, setOpen] = useState(0)
  return (
    <section className="section faq" id="faq">
      <div className="container">
        <Reveal as="h2" className="h-section center">
          {FAQ.title}
        </Reveal>
        <ul className="faq-list">
          {FAQS.map((f, i) => {
            const isOpen = open === i
            return (
              <li key={f.q} className={`faq-item ${isOpen ? 'is-open' : ''}`}>
                <h3>
                  <button
                    type="button"
                    id={`faq-q-${i}`}
                    className="faq-q wide"
                    aria-expanded={isOpen}
                    aria-controls={`faq-a-${i}`}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                  >
                    <span>{f.q}</span>
                    <span className="faq-sign" aria-hidden="true">
                      <Icon name="plus" size={18} strokeWidth={2.4} />
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-a-${i}`}
                      role="region"
                      aria-labelledby={`faq-q-${i}`}
                      className="faq-a"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: EASE }}
                    >
                      <p>{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            )
          })}
        </ul>
        <div className="faq-more">
          <p>{FAQ.more}</p>
          <WaButton cta="faq" variant="line" size="sm">
            {FAQ.cta}
          </WaButton>
        </div>
      </div>
    </section>
  )
}
