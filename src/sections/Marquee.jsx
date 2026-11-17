import { MARQUEE, OPERATORS, WALLETS } from '../content'
import { Icon } from '../components/Icon'
import { Reveal } from '../components/ui'
import './Marquee.css'

// A soft grey panel with two endless rows drifting in opposite directions: brand logos, then the services Nova handles.
// Each row is rendered twice so the loop is seamless; it slows down on hover and the visual
// copy is hidden from screen readers (a plain list carries the names).
export default function Marquee() {
  const logos = [...OPERATORS, ...WALLETS]
  return (
    <section className="marquee slab-bottom" data-theme="dark" aria-label={MARQUEE.title}>
      <div className="container">
        <Reveal as="p" className="marquee-title">
          {MARQUEE.title}
        </Reveal>
      </div>
      <ul className="sr-only">
        {logos.map((l) => (
          <li key={l.name}>{l.name}</li>
        ))}
        {MARQUEE.services.map((s) => (
          <li key={s.label}>{s.label}</li>
        ))}
      </ul>
      <div className="container">
      <Reveal className="marquee-rows" delay={0.1}>
        <Row speed={46}>
          {logos.map((l) => (
            <span className="marquee-logo" key={l.name}>
              <img src={l.src} alt="" loading="lazy" height="24" />
            </span>
          ))}
        </Row>
        <Row reverse speed={40}>
          {MARQUEE.services.map((s) => (
            <span className="marquee-service" key={s.label}>
              <span className="marquee-service-icon">
                <Icon name={s.icon} size={16} />
              </span>
              {s.label}
            </span>
          ))}
        </Row>
      </Reveal>
      </div>
    </section>
  )
}

function Row({ children, reverse = false, speed = 40 }) {
  return (
    <div className={`marquee-row ${reverse ? 'is-reverse' : ''}`} style={{ '--dur': `${speed}s` }} aria-hidden="true">
      {[0, 1].map((copy) => (
        <div className="marquee-track" key={copy}>
          {children}
          {/* Second copy keeps the track wider than large screens; dropped in the static layout */}
          <span className="marquee-dup">{children}</span>
        </div>
      ))}
    </div>
  )
}
