import { FINAL } from '../content'
import { Composer } from '../components/Composer'
import { Nova } from '../components/Nova'
import { Reveal } from '../components/ui'
import './FinalCta.css'

// Closing card: headline + composer left, Nova cheering on a glow right.
export default function FinalCta() {
  return (
    <section className="section final">
      <div className="container">
        <Reveal className="final-card" amount={0.25}>
          <div className="final-copy">
            <h2 className="h-section">{FINAL.title}</h2>
            <p className="lead">{FINAL.sub}</p>
            <div className="final-composer">
              <Composer tag="footer" align="start" />
            </div>
          </div>
          <div className="final-art" aria-hidden="true">
            <span className="glow" />
            <Nova pose="cheer" size={220} beam className="final-mark" />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
