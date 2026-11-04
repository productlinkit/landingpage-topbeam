import { HEADER, NAV } from '../content'
import { Logo, WaButton } from '../components/ui'
import { useHideOnScroll } from '../hooks/useHideOnScroll'
import { useScrolledPast } from '../hooks/useScrolledPast'
import './Header.css'

// Logo left, a compact WhatsApp pill right. Over the hero the pill stays hidden,
// because the hero composer is the call to action there; it appears once the composer scrolls away.
// The whole bar slides away while scrolling down and comes back on any scroll up.
export default function Header() {
  const { scrolled, hidden } = useHideOnScroll()
  const showCta = useScrolledPast('hero-composer')

  return (
    <header className={`header ${scrolled ? 'is-scrolled' : ''} ${hidden ? 'is-hidden' : ''}`}>
      <div className="header-bar">
        <a href="#top" className="header-logo" aria-label={HEADER.home}>
          <Logo />
        </a>
        <nav className="header-nav" aria-label="Navigasi utama">
          {NAV.map((l) => (
            <a key={l.id} href={`#${l.id}`}>
              {l.label}
            </a>
          ))}
        </nav>
        <div className={`header-cta ${showCta ? 'is-shown' : ''}`} aria-hidden={!showCta}>
          <WaButton cta="nav" size="sm" tabIndex={showCta ? 0 : -1}>
            {HEADER.cta}
          </WaButton>
        </div>
      </div>
    </header>
  )
}
