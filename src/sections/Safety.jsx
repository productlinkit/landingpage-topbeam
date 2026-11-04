import { SAFETY } from '../content'
import { Icon } from '../components/Icon'
import { Reveal } from '../components/ui'
import './Safety.css'

export default function Safety() {
  return (
    <section className="section safety">
      <div className="container">
        <Reveal as="h2" className="h-section center safety-title">
          {SAFETY.lead}{' '}
          <span className="safety-strong">
            <span className="slot" style={{ '--slot': 'var(--mint)' }} aria-hidden="true">
              <Icon name="lock" strokeWidth={2.2} />
            </span>
            {SAFETY.strong}
          </span>
        </Reveal>
        <ul className="safety-list">
          {SAFETY.points.map((p, i) => (
            <Reveal as="li" key={p.title} delay={i * 0.08}>
              <span className="safety-icon">
                <Icon name={p.icon} size={20} />
              </span>
              <h3 className="h-card">{p.title}</h3>
              <p>{p.body}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
