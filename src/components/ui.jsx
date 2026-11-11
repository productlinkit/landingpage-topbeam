import { motion } from 'motion/react'
import { EASE } from './ease'
import { WhatsAppIcon } from './WhatsAppIcon'
import { trackCta, waLink } from '../config'
import logo from '../assets/brand/topbeam-logo.webp'
import mark from '../assets/brand/topbeam-mark.webp'

// Intrinsic size of the logo artwork, so the browser reserves the right aspect ratio.
const LOGO_W = 1118
const LOGO_H = 303

// Full lockup (mark + wordmark). Its rendered height is set in CSS by the parent (.header-logo).
export function Logo() {
  return <img src={logo} alt="Topbeam" width={LOGO_W} height={LOGO_H} className="logo" />
}

// Mark only, decorative.
export function Mark({ size = 40, className = '' }) {
  return (
    <img
      src={mark}
      alt=""
      aria-hidden="true"
      width={size}
      height={size}
      className={className}
      style={{ height: size, width: 'auto' }}
    />
  )
}

// Fade-and-rise on first view. Reduced motion is handled by <MotionConfig reducedMotion="user">.
export function Reveal({ as = 'div', delay = 0, amount = 0.3, children, ...rest }) {
  const Tag = motion[as]
  return (
    <Tag
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.9, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

// Section title + optional lead, left aligned like the rest of the page.
export function SectionHead({ title, lead, className = '' }) {
  return (
    <div className={`section-head ${className}`}>
      <Reveal as="h2" className="h-section">
        {title}
      </Reveal>
      {lead && (
        <Reveal as="p" className="lead" delay={0.08}>
          {lead}
        </Reveal>
      )}
    </div>
  )
}

// Pill button that opens WhatsApp with a pre-filled message from config.CTA.
// variant: "ink" (default), "soft", "white" or "accent".
export function WaButton({ cta, children, size, variant = 'ink', icon = true, className = '', ...rest }) {
  return (
    <a
      href={waLink(cta)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackCta(cta)}
      className={`btn btn-${variant} ${size === 'sm' ? 'btn-sm' : ''} ${className}`}
      {...rest}
    >
      {icon && <WhatsAppIcon size={size === 'sm' ? 18 : 20} />}
      {children}
    </a>
  )
}
