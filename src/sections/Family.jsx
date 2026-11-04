import { useState } from 'react'
import { motion } from 'motion/react'
import { FAMILY } from '../content'
import { ChatPhone } from '../components/Phone'
import { Reveal, SlotTitle, WaButton } from '../components/ui'
import './Family.css'

export default function Family() {
  const [pick, setPick] = useState(0)
  const c = FAMILY.contacts[pick]

  return (
    <section className="section family">
      <div className="container">
        <SlotTitle lines={FAMILY.title} slot={FAMILY.slot} />
        <Reveal as="p" className="lead center family-lead">
          {FAMILY.lead}
        </Reveal>

        <div className="family-grid">
          <Reveal className="family-side">
            <p className="eyebrow">{FAMILY.pick}</p>
            <div className="family-picks" role="radiogroup" aria-label={FAMILY.pick}>
              {FAMILY.contacts.map((p, i) => (
                <button
                  key={p.id}
                  type="button"
                  role="radio"
                  aria-checked={pick === i}
                  className={`family-pick ${pick === i ? 'is-on' : ''}`}
                  onClick={() => setPick(i)}
                >
                  {pick === i && (
                    <motion.span
                      layoutId="family-pick"
                      className="family-pick-bg"
                      transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                    />
                  )}
                  <span className="family-avatar wide">{p.name[0]}</span>
                  <span className="family-who">
                    <strong>{p.name}</strong>
                    <span>
                      {p.place} · {p.operator}
                    </span>
                  </span>
                  <span className="family-product">{p.product}</span>
                </button>
              ))}
            </div>
            <WaButton cta="keluarga" className="family-cta">
              {FAMILY.cta}
            </WaButton>
          </Reveal>

          <div className="family-phone">
            <span className="story-halo" style={{ '--halo': 'var(--sand)' }} aria-hidden="true" />
            <ChatPhone
              replayKey={c.id}
              script={FAMILY.chat(c)}
              label={`Contoh chat mengirim ${c.product.toLowerCase()} ke ${c.name} lewat Nova`}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
