import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'motion/react'
import { HEADER, NAV } from '../content'
import { Logo, WaButton } from '../components/ui'
import { Icon } from '../components/Icon'
import { useHideOnScroll } from '../hooks/useHideOnScroll'
import './Header.css'

// Matches the CSS breakpoint where the inline nav takes over from the mobile menu.
const DESKTOP = '(min-width: 960px)'

// Logo left, nav links in a soft pill in the middle, the WhatsApp button right.
// The whole bar slides away while scrolling down and comes back on any scroll up.
// Below 960px the nav links move into a menu panel opened by the toggle button.
export default function Header() {
  const { scrolled, hidden } = useHideOnScroll()
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
    <>
      <ScrollProgress />
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
            <div className="header-cta">
              <WaButton cta="nav" size="sm">
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
    </>
  )
}

// Logo-gradient bar along the very top that fills with the page scroll.
function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  })
  return <motion.div className="scroll-progress" style={{ scaleX }} aria-hidden="true" />
}
