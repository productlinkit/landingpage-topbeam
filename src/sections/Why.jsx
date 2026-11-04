import { WHY } from '../content'
import { Icon } from '../components/Icon'
import { Reveal } from '../components/ui'
import './Why.css'

const { demo } = WHY

export default function Why() {
  return (
    <section className="section why">
      <div className="container">
        <Reveal as="h2" className="h-section center why-title">
          {WHY.title}
        </Reveal>
        <div className="why-list">
          {WHY.points.map((p, i) => {
            const Media = MEDIA[p.kind]
            return (
              <Reveal key={p.kind} className="why-block" delay={0.05} amount={0.25}>
                <div className={`why-media why-${p.kind}`} aria-hidden="true">
                  <Media />
                </div>
                <span className="why-num">0{i + 1}</span>
                <h3 className="h-card">{p.title}</h3>
                <p>{p.body}</p>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// Small UI vignettes made of real interface parts, one per point.

function ChatMedia() {
  return (
    <div className="vg-chat">
      <span className="vg-bubble vg-me">{demo.chat.me}</span>
      <span className="vg-bubble vg-nova">{demo.chat.nova}</span>
    </div>
  )
}

function ProductsMedia() {
  return (
    <ul className="vg-products">
      {demo.products.map((item) => (
        <li key={item.label}>
          <span className="vg-ico">
            <Icon name={item.icon} size={18} />
          </span>
          {item.label}
          <Icon name="arrow" size={16} className="vg-go" />
        </li>
      ))}
    </ul>
  )
}

function ConfirmMedia() {
  const { confirm } = demo
  return (
    <div className="vg-sheet">
      <span className="vg-sheet-title">{confirm.title}</span>
      <dl>
        {confirm.rows.map((row) => (
          <div key={row.label}>
            <dt>{row.label}</dt>
            <dd>{row.value}</dd>
          </div>
        ))}
        <div className="vg-total">
          <dt>{confirm.totalLabel}</dt>
          <dd>{demo.total}</dd>
        </div>
      </dl>
      <span className="vg-yes">{confirm.yes}</span>
    </div>
  )
}

function RefundMedia() {
  return (
    <div className="vg-refund">
      <div className="vg-row vg-fail">
        <span className="vg-dot">
          <Icon name="close" size={14} strokeWidth={3} />
        </span>
        {demo.refund.fail}
      </div>
      <span className="vg-line" />
      <div className="vg-row vg-back">
        <span className="vg-dot">
          <Icon name="refund" size={16} strokeWidth={2.6} />
        </span>
        <span>
          {demo.refund.back}
          <strong className="wide">{demo.total}</strong>
        </span>
      </div>
    </div>
  )
}

const MEDIA = {
  chat: ChatMedia,
  products: ProductsMedia,
  confirm: ConfirmMedia,
  refund: RefundMedia,
}
