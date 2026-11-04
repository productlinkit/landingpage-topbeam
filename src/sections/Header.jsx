import { useEffect, useState } from 'react'
import { HEADER, NAV } from '../content'
import { Logo, WaButton } from '../components/ui'
import { Icon } from '../components/Icon'
import { useHideOnScroll } from '../hooks/useHideOnScroll'
import { useScrolledPast } from '../hooks/useScrolledPast'
import './Header.css'

// Matches the CSS breakpoint where the inline nav takes over from the mobile menu.
const DESKTOP = '(min-width: 960px)'

// Logo left, a compact WhatsApp pill right. Over the hero the pill stays hidden,
// because the hero composer is the call to action there; it appears once the composer scrolls away.
// The whole bar slides away while scrolling down and comes back on any scroll up.
// Below 960px the nav links move into a menu panel opened by the toggle button.
export default function Header() {
  const { scrolled, hidden } = useHideOnScroll()
  const showCta = useScrolledPast('hero-composer')
  const [open, setOpen] = useState(false)

  // Close on Escape and when the viewport grows to desktop width.
  useEffect(() => {
    if (!open) return
    const mq = window.matchMedia(DESKTOP)
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    const onMq = (e) => e.matches && setOpen(false)
    window.addEventListener('keydown', onKey)
    mq.addEventListener('change', onMq)
    return () => {
      window.removeEventListener('keydown', onKey)
      mq.removeEventListener('change', onMq)
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <header
      className={`header ${scrolled || open ? 'is-scrolled' : ''} ${hidden && !open ? 'is-hidden' : ''} ${open ? 'is-open' : ''}`}
    >
      <div className="header-bar">
        <a href="#top" className="header-logo" aria-label={HEADER.home} onClick={close}>
          <Logo />
        </a>
        <nav className="header-nav" aria-label="Navigasi utama">
          {NAV.map((l) => (
            <a key={l.id} href={`#${l.id}`}>
              {l.label}
            </a>
          ))}
        </nav>
        <div className="header-end">
          <div className={`header-cta ${showCta && !open ? 'is-shown' : ''}`} aria-hidden={!showCta || open}>
            <WaButton cta="nav" size="sm" tabIndex={showCta && !open ? 0 : -1}>
              {HEADER.cta}
            </WaButton>
          </div>
          <button
            type="button"
            className="header-toggle"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? HEADER.menuClose : HEADER.menuOpen}
            onClick={() => setOpen((o) => !o)}
          >
            <Icon name={open ? 'close' : 'menu'} size={22} />
          </button>
        </div>
      </div>

      <div id="mobile-menu" className="header-menu" hidden={!open}>
        <nav aria-label="Navigasi utama (mobile)">
          {NAV.map((l) => (
            <a key={l.id} href={`#${l.id}`} onClick={close}>
              {l.label}
              <Icon name="arrow" size={18} />
            </a>
          ))}
        </nav>
        {/* Click handler on the wrapper: WaButton's own onClick does the CTA tracking. */}
        <div className="header-menu-cta" onClick={close}>
          <WaButton cta="nav">{HEADER.cta}</WaButton>
        </div>
      </div>
    </header>
  )
}
