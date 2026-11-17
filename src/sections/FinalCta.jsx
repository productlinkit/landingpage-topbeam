import { FINAL } from '../content'
import { Composer } from '../components/Composer'
import { Nova } from '../components/Nova'
import { Reveal } from '../components/ui'
import './FinalCta.css'

// Closing card on soft grey: headline + the WhatsApp composer left, a happy Nova right.
export default function FinalCta() {
  return (
    <section className="section final slab-top" data-theme="dark">
      <span className="beam-line" aria-hidden="true" />
      <div className="container">
        <Reveal className="final-card" amount={0.25}>
          <div className="final-copy">
            <h2 className="h-section">{FINAL.title}</h2>
            <p className="lead">{FINAL.sub}</p>
            <div className="final-composer">
              <Composer tag="footer" align="start" />
            </div>
          </div>
          <div className="final-art">
            <Nova pose="thumbsup" hoverPose="wave" halo track size={280} />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
