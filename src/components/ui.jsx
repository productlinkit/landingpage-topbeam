import { motion } from 'motion/react'
import { EASE } from './ease'
import { Icon } from './Icon'
import { WhatsAppIcon } from './WhatsAppIcon'
import { trackCta, waLink } from '../config'
import logo from '../assets/brand/topbeam-logo.webp'
import mark from '../assets/brand/topbeam-mark.webp'

// Intrinsic size of the logo artwork, so the browser reserves the right aspect ratio.
const LOGO_W = 1118
const LOGO_H = 303

// Full lockup (mark + wordmark). Its rendered height is set in CSS by the parent (.header-logo, .footer-brand).
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
export function Reveal({ as = 'div', delay = 0, amount = 0.35, children, ...rest }) {
  const Tag = motion[as]
  return (
    <Tag
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.9, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

// Uppercase headline with an inline pastel slot, one block line per entry.
export function SlotTitle({ lines, slot }) {
  return (
    <h2 className="slot-title">
      {lines.map((line, i) => (
        <motion.span
          key={line}
          className="slot-line"
          initial={{ opacity: 0, y: '40%' }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1, delay: i * 0.08, ease: EASE }}
        >
          {line}
          {slot && slot.line === i && (
            <motion.span
              className="slot"
              style={{ '--slot': slot.color }}
              aria-hidden="true"
              initial={{ scaleX: 0.2, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.9, delay: 0.25, ease: EASE }}
            >
              <Icon name={slot.icon} strokeWidth={2.2} />
            </motion.span>
          )}
        </motion.span>
      ))}
    </h2>
  )
}

// Pill button that opens WhatsApp with a pre-filled message from config.CTA.
// variant: "ink" (navy, default) or "line" (white with a hairline border).
export function WaButton({ cta, children, size, variant = 'ink', className = '', ...rest }) {
  return (
    <a
      href={waLink(cta)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackCta(cta)}
      className={`btn btn-${variant} ${size === 'sm' ? 'btn-sm' : ''} ${className}`}
      {...rest}
    >
      <WhatsAppIcon size={size === 'sm' ? 18 : 22} />
      {children}
    </a>
  )
}
