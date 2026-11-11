import { SAFETY } from '../content'
import { Icon } from '../components/Icon'
import { Nova } from '../components/Nova'
import { Reveal } from '../components/ui'
import './Safety.css'

// One white panel: Nova with her shield and the promise, then three ways to stay safe.
export default function Safety() {
  return (
    <section className="safety" aria-labelledby="safety-title">
      <div className="container">
        <Reveal className="safety-panel" amount={0.25}>
          <div className="safety-head">
            <span className="safety-nova" aria-hidden="true">
              <Nova pose="shield" size={120} />
            </span>
            <h2 id="safety-title" className="h-card">
              {SAFETY.lead} <strong>{SAFETY.strong}</strong>
            </h2>
          </div>
          <ul className="safety-points">
            {SAFETY.points.map((p) => (
              <li key={p.title}>
                <span className="safety-icon">
                  <Icon name={p.icon} size={20} />
                </span>
                <span>
                  <strong>{p.title}</strong>
                  {p.body}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
