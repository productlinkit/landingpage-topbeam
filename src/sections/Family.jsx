import { useState } from 'react'
import { FAMILY } from '../content'
import { ChatPhone } from '../components/Phone'
import { Icon } from '../components/Icon'
import { Reveal, SectionHead, WaButton } from '../components/ui'
import './Family.css'

// Contact picker on the left, the phone replays the matching chat on a glow panel right.
export default function Family() {
  const [pick, setPick] = useState(0)
  const c = FAMILY.contacts[pick]

  return (
    <section className="section family" id="keluarga">
      <div className="container">
        <SectionHead title={FAMILY.title.join(' ')} lead={FAMILY.lead} />

        <div className="family-grid">
          <Reveal className="family-side">
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
                  <span className="family-avatar">{p.name[0]}</span>
                  <span className="family-who">
                    <strong>{p.name}</strong>
                    <span>
                      {p.place} · {p.operator} · {p.product}
                    </span>
                  </span>
                  <span className="arrow-chip" aria-hidden="true">
                    <Icon name="arrow" size={16} />
                  </span>
                </button>
              ))}
            </div>
            <WaButton cta="keluarga" className="family-cta">
              {FAMILY.cta}
            </WaButton>
          </Reveal>

          <Reveal className="family-stage" delay={0.08} amount={0.2}>
            <span className="glow" aria-hidden="true" />
            <ChatPhone
              replayKey={c.id}
              script={FAMILY.chat(c)}
              label={`Contoh chat mengirim ${c.product.toLowerCase()} ke ${c.name} lewat Nova`}
            />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
