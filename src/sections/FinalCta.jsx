import { FINAL } from '../content'
import { Composer } from '../components/Composer'
import { Mark, Reveal } from '../components/ui'
import './FinalCta.css'

// Closing card: headline + composer left, the mark floating on a glow right.
export default function FinalCta() {
  return (
    <section className="section final">
      <div className="container">
        <Reveal className="final-card" amount={0.25}>
          <div className="final-copy">
            <h2 className="h-section">{FINAL.title}</h2>
            <p className="lead">{FINAL.sub}</p>
            <div className="final-composer">
              <Composer tag="final" align="start" />
            </div>
          </div>
          <div className="final-art" aria-hidden="true">
            <span className="glow" />
            <Mark size={168} className="final-mark" />
            <span className="final-shadow" />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
