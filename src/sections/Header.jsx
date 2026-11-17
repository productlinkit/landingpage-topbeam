import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'motion/react'
import { HEADER, NAV } from '../content'
import { Logo, WaButton } from '../components/ui'
import { Icon } from '../components/Icon'
import { useHeaderScroll } from '../hooks/useHeaderScroll'
import { useActiveSection } from '../hooks/useActiveSection'
import './Header.css'

// Matches the CSS breakpoint where the inline nav takes over from the mobile menu.
const DESKTOP = '(min-width: 960px)'

// Sticky glass bar: logo left, section links in a pill in the middle (the one on screen is
// highlighted), WhatsApp button right at every width. Always visible; its theme follows the
// section underneath.
// Below 960px the links move into a menu panel.
export default function Header() {
  const { scrolled, overDark } = useHeaderScroll()
  const active = useActiveSection(NAV.map((n) => n.id))
  const [open, setOpen] = useState(false)

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
        className={`header ${scrolled || open ? 'is-scrolled' : ''} ${open ? 'is-open' : ''}`}
        // follows the section underneath: navy over dark sections, pearl over light ones;
        // the open mobile menu is always light
        data-theme={overDark && !open ? 'dark' : undefined}
      >
        <div className="header-bar">
          <a href="#top" className="header-logo" aria-label={HEADER.home} onClick={close}>
            <Logo />
          </a>
          <nav className="header-nav" aria-label="Navigasi utama">
            {NAV.map((l) => (
              <a key={l.id} href={`#${l.id}`} aria-current={active === l.id ? 'true' : undefined}>
                {active === l.id && (
                  <motion.span
                    layoutId="nav-active"
                    className="header-nav-bg"
                    transition={{ type: 'spring', stiffness: 420, damping: 38 }}
                  />
                )}
                <span>{l.label}</span>
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
        </div>
      </header>
    </>
  )
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 })
  return <motion.div className="scroll-progress" style={{ scaleX }} aria-hidden="true" />
}
