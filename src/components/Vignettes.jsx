import { HERO, HOW, WALLETS, WHY } from '../content'
import { Icon } from './Icon'
import './Vignettes.css'

// Small UI illustrations made of real interface parts. All decorative: the text
// around them carries the meaning, so the wrappers set aria-hidden.

const { demo } = WHY
const qris = WALLETS.find((w) => w.name === 'QRIS')

export function ChatVignette({ me = HERO.chat[0].text, nova = HERO.chat[1].text }) {
  return (
    <div className="vg-chat" aria-hidden="true">
      <span className="vg-bubble vg-me">{me}</span>
      <span className="vg-bubble vg-nova">{nova}</span>
    </div>
  )
}

export function ProductsVignette() {
  return (
    <ul className="vg-products" aria-hidden="true">
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

export function ConfirmVignette() {
  const { confirm } = demo
  return (
    <div className="vg-sheet" aria-hidden="true">
      <span className="vg-sheet-title mono">{confirm.title}</span>
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
    </div>
  )
}

export function ApproveVignette() {
  const { approve } = HOW.demo
  return (
    <div className="vg-chat" aria-hidden="true">
      <span className="vg-bubble vg-me">{approve.me}</span>
      <span className="vg-status">
        <span className="vg-dot vg-dot-ok">
          <Icon name="check" size={14} strokeWidth={3} />
        </span>
        {approve.status}
      </span>
    </div>
  )
}

export function PayVignette() {
  const { pay } = HOW.demo
  return (
    <div className="vg-sheet vg-pay" aria-hidden="true">
      <span className="vg-pay-head">
        <span className="vg-sheet-title mono">{pay.title}</span>
        <img src={qris.src} alt="" height="18" loading="lazy" />
      </span>
      <span className="vg-qr">
        <Icon name="qr" size={88} strokeWidth={1.4} />
      </span>
      <span className="vg-pay-foot">
        <strong>{demo.total}</strong>
        <span>{pay.expires}</span>
      </span>
    </div>
  )
}

export function DoneVignette() {
  const { done } = HOW.demo
  return (
    <div className="vg-refund" aria-hidden="true">
      <div className="vg-row">
        <span className="vg-dot vg-dot-ok">
          <Icon name="check" size={14} strokeWidth={3} />
        </span>
        <span>
          {done.title}
          <strong>{demo.total}</strong>
        </span>
      </div>
      <span className="vg-line" />
      <div className="vg-row vg-row-sub">
        <span className="vg-dot">
          <Icon name="receipt" size={14} strokeWidth={2.4} />
        </span>
        {done.sub}
      </div>
    </div>
  )
}

export function RefundVignette() {
  return (
    <div className="vg-refund" aria-hidden="true">
      <div className="vg-row vg-row-sub">
        <span className="vg-dot vg-dot-fail">
          <Icon name="close" size={14} strokeWidth={3} />
        </span>
        {demo.refund.fail}
      </div>
      <span className="vg-line" />
      <div className="vg-row">
        <span className="vg-dot vg-dot-ok">
          <Icon name="refund" size={16} strokeWidth={2.6} />
        </span>
        <span>
          {demo.refund.back}
          <strong>{demo.total}</strong>
        </span>
      </div>
    </div>
  )
}
