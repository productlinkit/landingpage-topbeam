import { FOOTER } from '../content'
import { STATUS_URL, trackCta, waLink } from '../config'
import { Icon } from '../components/Icon'
import { LiveDot, Logo, WaButton } from '../components/ui'
import { useServiceStatus } from '../hooks/useServiceStatus'
import './Footer.css'

function FooterLink({ l }) {
  if (l.cta)
    return (
      <a href={waLink(l.cta)} target="_blank" rel="noopener noreferrer" onClick={() => trackCta(`footer-${l.cta}`)} className="u-link">
        {l.label}
      </a>
    )
  return (
    <a href={l.href} className="u-link">
      {l.label}
    </a>
  )
}

const TONE = { ok: 'ok', degraded: 'wait', down: 'wait', unknown: 'off' }

// Live service status, only when a status endpoint is configured in config.STATUS_URL.
function Status() {
  const s = useServiceStatus(STATUS_URL)
  if (!s) return null
  const time = s.at?.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
  return (
    <p className="pill footer-status" role="status">
      <LiveDot tone={TONE[s.status]} />
      {FOOTER.status[s.status]}
      {time && <span className="footer-status-time">· {FOOTER.status.checked(time)}</span>}
    </p>
  )
}

// Minimal footer: brand + CTA, three link columns, status and official number, legal line.
export default function Footer() {
  return (
    <footer className="footer" data-theme="dark">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <Logo />
            <p>{FOOTER.tagline}</p>
            <WaButton cta="footer" size="sm">
              {FOOTER.cta}
            </WaButton>
          </div>

          <nav className="footer-cols" aria-label="Tautan footer">
            {FOOTER.cols.map((col) => (
              <div key={col.title}>
                <h2>{col.title}</h2>
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

        <div className="footer-bar">
          <div className="footer-meta">
            <Status />
            <span className="footer-official">
              <Icon name="lock" size={14} />
              {FOOTER.official}
            </span>
          </div>
          <p>{FOOTER.legal}</p>
        </div>
      </div>
    </footer>
  )
}
