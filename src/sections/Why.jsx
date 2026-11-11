import { WHY } from '../content'
import { Mark, Reveal, SectionHead } from '../components/ui'
import { ChatVignette, ConfirmVignette, ProductsVignette, RefundVignette } from '../components/Vignettes'
import './Why.css'

const TINTS = { chat: 'var(--lilac)', confirm: 'var(--sky)', refund: 'var(--gold)' }
const MEDIA = { chat: ChatVignette, confirm: ConfirmVignette, refund: RefundVignette }

// Bento: one tall soft card (the "one chat for everything" point) beside three tinted cards.
export default function Why() {
  const [feature, ...rest] = [
    WHY.points.find((p) => p.kind === 'products'),
    ...WHY.points.filter((p) => p.kind !== 'products'),
  ]
  return (
    <section className="section why">
      <div className="container">
        <SectionHead title={WHY.title} lead={WHY.lead} />
        <div className="why-grid">
          <Reveal className="why-feature" amount={0.2}>
            <div className="why-feature-stage" aria-hidden="true">
              <span className="glow" />
              <Mark size={84} className="why-mark" />
              <ProductsVignette />
            </div>
            <div className="why-feature-copy">
              <h3 className="h-card">{feature.title}</h3>
              <p>{feature.body}</p>
            </div>
          </Reveal>

          <div className="why-stack">
            {rest.map((p, i) => {
              const Media = MEDIA[p.kind]
              return (
                <Reveal key={p.kind} className="why-card" style={{ '--tint': TINTS[p.kind] }} delay={i * 0.08}>
                  <div className="why-card-copy">
                    <h3 className="h-card">{p.title}</h3>
                    <p>{p.body}</p>
                  </div>
                  <div className="why-card-media">
                    <Media />
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
