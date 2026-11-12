import { PRODUCTS } from '../content'
import { trackCta, waLink } from '../config'
import { Icon } from '../components/Icon'
import { Nova } from '../components/Nova'
import { Reveal, SectionHead } from '../components/ui'
import { useTilt } from '../hooks/usePointerFx'
import './Products.css'

// Four tinted cards, each with Nova holding the product and a link that opens WhatsApp
// with the product's pre-filled message. The whole card is the link.
export default function Products() {
  const tilt = useTilt()
  return (
    <section className="section products" id="produk">
      <div className="container">
        <SectionHead title={PRODUCTS.title} lead={PRODUCTS.lead} />
        <ul className="products-grid">
          {PRODUCTS.items.map((p, i) => (
            <Reveal as="li" key={p.id} delay={i * 0.08} amount={0.2}>
              <a
                {...tilt}
                className="product-card fx-tilt"
                style={{ '--tint': p.tint }}
                href={waLink(p.cta.key)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackCta(p.cta.key)}
              >
                <h3 className="h-card">{p.title}</h3>
                <p className="product-body">{p.body}</p>
                <span className="product-link">
                  {p.cta.label}
                  <span className="arrow-chip" aria-hidden="true">
                    <Icon name="arrow" size={16} />
                  </span>
                </span>
                <span className="product-nova" aria-hidden="true">
                  <Nova pose={p.pose} size={118} />
                </span>
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
