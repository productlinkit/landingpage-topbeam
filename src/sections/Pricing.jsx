import { PRICING } from '../content'
import { PRICES } from '../data/facts'
import { Icon } from '../components/Icon'
import { Nova } from '../components/Nova'
import { Item, SceneHead, Stagger, WaButton } from '../components/ui'
import './Pricing.css'

// No plans to sell: Topbeam is free to chat and the visitor pays the product only. So the
// cards are one real price example per product (as Nova quoted it). Nova stands by the head,
// pointing (mirrored) at the heading and the cards below it.
export default function Pricing() {
  return (
    <section className="section pricing is-plain" id="produk" aria-labelledby="produk-title">
      <div className="container">
        <SceneHead
          id="produk-title"
          title={PRICING.title}
          lead={PRICING.lead}
          mascot={<Nova pose="point" flip size={200} />}
        />

        <Stagger className="pricing-grid" stagger={0.08}>
          {PRICES.map((p) => (
            <Item as="article" key={p.id} className={`price-card is-${p.id}`}>
              <span className="price-icon" aria-hidden="true">
                <Icon name={p.icon} size={20} />
              </span>
              <h3 className="h-card">{p.tag}</h3>
              <p className="price-product">{p.product}</p>
              <div className="price-figure">
                <strong>{p.price}</strong>
                <span>{PRICING.fee}</span>
              </div>
              <ul className="price-points">
                {p.points.map((pt) => (
                  <li key={pt}>
                    <Icon name="check" size={15} strokeWidth={2.6} />
                    {pt}
                  </li>
                ))}
              </ul>
              <div className="price-foot">
                <WaButton cta={p.cta} size="sm" variant="white" icon={false} arrow>
                  {p.label}
                </WaButton>
              </div>
            </Item>
          ))}
        </Stagger>

        <p className="pricing-note">{PRICING.note}</p>
      </div>
    </section>
  )
}
