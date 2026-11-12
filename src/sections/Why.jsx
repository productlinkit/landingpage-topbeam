import { WHY } from '../content'
import { Icon } from '../components/Icon'
import { Reveal, SectionHead, WaButton } from '../components/ui'
import { useTilt } from '../hooks/usePointerFx'
import './Why.css'

// Three tinted pillars from the product plan. Each carries a small proof drawn from a real Nova chat.
export default function Why() {
  const tilt = useTilt(4)
  return (
    <section className="section why">
      <div className="container">
        <SectionHead title={WHY.title} lead={WHY.lead} />
        <ul className="why-grid">
          {WHY.points.map((p, i) => (
            <Reveal as="li" key={p.kind} className="why-item" delay={i * 0.08} amount={0.2}>
              {/* Tilt lives on the inner card: Reveal owns the li's transform */}
              <div {...tilt} className="why-card fx-tilt" style={{ '--tint': p.tint }}>
                <div className="why-proof" aria-hidden="true">
                  <Proof proof={p.proof} />
                </div>
                <h3 className="h-card">{p.title}</h3>
                <p>{p.body}</p>
              </div>
            </Reveal>
          ))}
        </ul>
        <Reveal className="why-cta" delay={0.1}>
          <WaButton cta={WHY.cta.key}>{WHY.cta.label}</WaButton>
        </Reveal>
      </div>
    </section>
  )
}

function Proof({ proof }) {
  if (proof.rows) {
    return (
      <ul className="why-rows">
        {proof.rows.map((r) => (
          <li key={r}>
            <span className="why-check">
              <Icon name="check" size={14} strokeWidth={3} />
            </span>
            {r}
          </li>
        ))}
      </ul>
    )
  }
  // Keep the order the chat happened in: whoever has the first key in the object spoke first.
  return (
    <div className="why-chat">
      {Object.keys(proof).map((who) => (
        <span key={who} className={`why-bubble why-bubble-${who}`}>
          {proof[who]}
        </span>
      ))}
    </div>
  )
}
