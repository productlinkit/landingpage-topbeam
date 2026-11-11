import { FOOTER, WALLETS } from '../content'
import { trackCta, waLink } from '../config'
import { Icon } from '../components/Icon'
import { Mark, WaButton } from '../components/ui'
import './Footer.css'

const qris = WALLETS.find((w) => w.name === 'QRIS')

function FooterLink({ l }) {
  if (l.cta)
    return (
      <a href={waLink(l.cta)} target="_blank" rel="noopener noreferrer" onClick={() => trackCta(`footer-${l.cta}`)}>
        {l.label}
      </a>
    )
  return <a href={l.href}>{l.label}</a>
}

// Dark rounded panel: brand + CTA, link columns, trust notes, a giant wordmark, legal bar.
export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-panel">
          <div className="footer-top">
            <div className="footer-brand">
              <span className="footer-lockup">
                <Mark size={36} />
                {FOOTER.brand}
              </span>
              <p>{FOOTER.tagline}</p>
              <WaButton cta="footer" size="sm" variant="accent">
                {FOOTER.cta}
              </WaButton>
            </div>

            <nav className="footer-cols" aria-label="Tautan footer">
              {FOOTER.cols.map((col) => (
                <div key={col.title}>
                  <h4>{col.title}</h4>
                  <ul>
                    {col.links.map((l) => (
                      <li key={l.label}>
                        <FooterLink l={l} />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </div>

          <div className="footer-trust">
            <ul className="footer-notes">
              {FOOTER.notes.map((n) => (
                <li key={n.text}>
                  <span className="footer-note-icon">
                    <Icon name={n.icon} size={16} strokeWidth={2.2} />
                  </span>
                  {n.text}
                </li>
              ))}
            </ul>
            <div className="footer-pay">
              <span>{FOOTER.pay}</span>
              <span className="footer-pay-logo">
                <img src={qris.src} alt="QRIS" height="16" loading="lazy" />
              </span>
              <span className="footer-pay-va">{FOOTER.payVa}</span>
            </div>
          </div>

          <p className="footer-wordmark" aria-hidden="true">
            {FOOTER.wordmark}
          </p>

          <div className="footer-bar">
            <span>{FOOTER.legal}</span>
            <nav aria-label="Informasi legal">
              {FOOTER.legalLinks.map((l) => (
                <a key={l.label} href={l.href}>
                  {l.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  )
}
