import { PRODUCTS, WALLETS } from '../content'
import { trackCta, waLink } from '../config'
import { Icon } from '../components/Icon'
import { Mark, Reveal, SectionHead } from '../components/ui'
import './Products.css'

const ebbm = WALLETS.find((w) => w.name === 'e-BBM')
const wallets = WALLETS.filter((w) => w.name !== 'QRIS' && w.name !== 'e-BBM')

// Three tinted cards, one per product family. The whole card links to WhatsApp.
export default function Products() {
  return (
    <section className="section products" id="produk">
      <div className="container">
        <SectionHead title={PRODUCTS.title} lead={PRODUCTS.lead} />
        <div className="products-grid">
          {PRODUCTS.items.map((p, i) => {
            const Demo = DEMOS[p.demo]
            return (
              <Reveal key={p.id} delay={i * 0.08} amount={0.2}>
                <a
                  className="product-card"
                  style={{ '--tint': p.tint }}
                  href={waLink(p.cta.key)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackCta(`produk-${p.cta.key}`)}
                >
                  <h3 className="h-card">{p.title}</h3>
                  <p className="product-body">{p.body}</p>
                  <p className="product-figure">
                    <strong>{p.figure}</strong>
                    <span>{p.caption}</span>
                  </p>
                  <div className="product-demo" aria-hidden="true">
                    <Demo />
                  </div>
                  <span className="product-link">
                    {p.cta.label}
                    <Icon name="arrow" size={16} />
                  </span>
                  <Mark size={64} className="product-mark" />
                </a>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function OptionsDemo() {
  const { note, values } = PRODUCTS.options
  return (
    <div className="pd-box">
      <span>{note}</span>
      <span className="pd-options">
        {values.map((v, i) => (
          <span key={v} className={i === 1 ? 'is-on' : undefined}>
            {v}
          </span>
        ))}
      </span>
    </div>
  )
}

function WalletsDemo() {
  return (
    <div className="pd-wallets">
      {wallets.map((w) => (
        <span key={w.name}>
          <img src={w.src} alt="" height="18" loading="lazy" />
        </span>
      ))}
    </div>
  )
}

function FuelDemo() {
  const { title, sub } = PRODUCTS.fuel
  return (
    <div className="pd-box pd-fuel">
      <span className="pd-fuel-ico">
        <Icon name="fuel" size={20} />
      </span>
      <span className="pd-fuel-text">
        <strong>{title}</strong>
        <span>{sub}</span>
      </span>
      <img src={ebbm.src} alt="" height="20" loading="lazy" />
    </div>
  )
}

const DEMOS = { options: OptionsDemo, wallets: WalletsDemo, fuel: FuelDemo }
