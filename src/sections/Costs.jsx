import { motion } from 'motion/react'
import { COSTS } from '../content'
import { Icon } from '../components/Icon'
import { DUR, EASE, RISE } from '../components/ease'
import { Nova } from '../components/Nova'
import { Item, SectionHead, Stagger, WaButton } from '../components/ui'
import './Costs.css'

// What a visitor pays, laid out like a pricing table: three cards (the middle one on ink, with
// Nova peeking over its top edge and the beam CTA), then a "not sure?" callout.
export default function Costs() {
  return (
    <section className="section costs is-alt" id="biaya" aria-labelledby="biaya-title">
      <div className="container">
        <SectionHead id="biaya-title" title={COSTS.title} lead={COSTS.lead} />

        <Stagger className="costs-grid" stagger={0.1}>
          {COSTS.plans.map((p) => (
            <Item as="article" key={p.id} className={`costs-card ${p.featured ? 'is-featured is-ink' : ''}`}>
              {p.featured && (
                <motion.span
                  className="costs-nova"
                  initial={{ y: 40, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, amount: 0.8 }}
                  transition={{ duration: DUR.reveal, ease: EASE, delay: 0.4 }}
                >
                  <Nova pose="thumbsup" size={110} />
                </motion.span>
              )}
              <h3 className="costs-name">{p.name}</h3>
              <p className="costs-sub">{p.sub}</p>
              <div className="costs-figure">
                <strong>{p.figure}</strong>
                {p.unit && <span>/ {p.unit}</span>}
                <p>{p.note}</p>
              </div>
              <ul className="costs-points">
                {p.points.map((pt) => (
                  <li key={pt}>
                    <span className="costs-check">
                      <Icon name="check" size={12} strokeWidth={3} />
                    </span>
                    {pt}
                  </li>
                ))}
              </ul>
              {p.href ? (
                <a href={p.href} className="btn btn-ghost btn-block">
                  {p.cta}
                </a>
              ) : (
                <WaButton cta="biaya" variant={p.featured ? 'primary' : 'ghost'} icon={false} className="btn-block">
                  {p.cta}
                </WaButton>
              )}
            </Item>
          ))}
        </Stagger>

        <motion.div
          className="costs-callout"
          initial={{ opacity: 0, y: RISE }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: DUR.reveal, ease: EASE }}
        >
          <div className="costs-callout-copy">
            <h3>{COSTS.callout.title}</h3>
            <p>{COSTS.callout.body}</p>
          </div>
          <WaButton cta="biaya">{COSTS.callout.cta}</WaButton>
        </motion.div>
      </div>
    </section>
  )
}
