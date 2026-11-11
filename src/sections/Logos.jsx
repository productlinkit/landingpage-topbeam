import { LOGO_STRIP, OPERATORS, WALLETS } from '../content'
import { Reveal } from '../components/ui'
import './Logos.css'

// Two rows of logo pills drifting in opposite directions inside a soft panel.
// Each row is rendered twice so the loop is seamless; the copy is hidden from screen readers.
export default function Logos() {
  const all = [...OPERATORS, ...WALLETS]
  return (
    <section className="logos" aria-label={LOGO_STRIP.title}>
      <div className="container">
        <Reveal as="p" className="logos-title">
          {LOGO_STRIP.title}
        </Reveal>
        <Reveal className="logos-panel" delay={0.08}>
          <ul className="sr-only">
            {all.map((l) => (
              <li key={l.name}>{l.name}</li>
            ))}
          </ul>
          <Row items={OPERATORS} />
          <Row items={WALLETS} reverse />
        </Reveal>
      </div>
    </section>
  )
}

function Row({ items, reverse = false }) {
  // Repeat short lists so one copy is always wider than the panel
  const base = items.length < 8 ? [...items, ...items] : items
  return (
    <div className={`logos-row ${reverse ? 'is-reverse' : ''}`} aria-hidden="true">
      {[0, 1].map((copy) => (
        <div className="logos-track" key={copy}>
          {base.map((l, i) => (
            <span className="logos-pill" key={`${l.name}-${i}`}>
              <img src={l.src} alt="" loading="lazy" height="26" />
            </span>
          ))}
        </div>
      ))}
    </div>
  )
}
