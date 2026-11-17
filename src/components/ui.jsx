import { Fragment, useId } from 'react'
import { motion } from 'motion/react'
import { DUR, EASE, RISE, STAGGER } from './ease'
import { WhatsAppIcon } from './WhatsAppIcon'
import { Icon } from './Icon'
import { TopbeamMark } from './ds/TopbeamMark'
import { trackCta, waLink } from '../config'

// TopBeam logo: the white thumbs-up robot (whole, never cropped) + the wordmark.
export function Logo({ size = 44 }) {
  return (
    <span className="logo">
      <TopbeamMark height={size} />
      <span className="logo-word">topbeam</span>
    </span>
  )
}

// Fade-and-rise on first view. Reduced motion is handled by <MotionConfig reducedMotion="user">.
export function Reveal({ as = 'div', delay = 0, amount = 0.25, y = RISE, children, ...rest }) {
  const Tag = motion[as]
  return (
    <Tag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: DUR.reveal, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

// Parent that reveals its <Item> children one after another when it scrolls into view.
const groupVariants = (stagger, delay) => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren: delay } },
})
const itemVariants = {
  hidden: { opacity: 0, y: RISE },
  show: { opacity: 1, y: 0, transition: { duration: DUR.reveal, ease: EASE } },
}

export function Stagger({ as = 'div', stagger = STAGGER, delay = 0, amount = 0.2, children, ...rest }) {
  const Tag = motion[as]
  return (
    <Tag
      variants={groupVariants(stagger, delay)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

export function Item({ as = 'div', children, ...rest }) {
  const Tag = motion[as]
  return (
    <Tag variants={itemVariants} {...rest}>
      {children}
    </Tag>
  )
}

// Big left-aligned title + optional lead, no eyebrow label (the headline does the work).
// The title's words rise one by one from behind a mask as the head scrolls into view.
// title words 60ms apart, then the lead follows the last word
const titleVariants = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } }
const wordVariants = {
  hidden: { y: '110%' },
  show: { y: 0, transition: { duration: DUR.reveal, ease: EASE } },
}
const headVariants = { hidden: {}, show: { transition: { staggerChildren: 0.2 } } }

export function SectionHead({ title, lead, center = false, id }) {
  const fallback = useId()
  const words = String(title).split(' ')
  return (
    <motion.div
      className={`section-head ${center ? 'is-center' : ''}`}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      variants={headVariants}
    >
      <motion.h2 className="h-section" id={id ?? fallback} variants={titleVariants} aria-label={title}>
        {words.map((w, i) => (
          <Fragment key={i}>
            <span className="word-mask" aria-hidden="true">
              <motion.span variants={wordVariants}>{w}</motion.span>
            </span>
            {i < words.length - 1 && ' '}
          </Fragment>
        ))}
      </motion.h2>
      {lead && (
        <motion.p className="lead" variants={itemVariants}>
          {lead}
        </motion.p>
      )}
    </motion.div>
  )
}

// Section head with the section's mascot pose beside it. The mascot enters once, after the
// title, with a fade + rise + slight grow (the "pose change" between sections).
export function SceneHead({ id, title, lead, mascot }) {
  return (
    <div className="scene-head">
      <SectionHead id={id} title={title} lead={lead} />
      <motion.div
        className="scene-mascot"
        initial={{ opacity: 0, y: 24, scale: 0.94 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: DUR.reveal, delay: 0.25, ease: EASE }}
      >
        {mascot}
      </motion.div>
    </div>
  )
}

// Pill button that opens WhatsApp with a pre-filled message from config.CTA.
// variant: primary (the beam, default) | ghost (grey) | white
export function WaButton({ cta, children, size, variant = 'primary', icon = true, arrow = false, className = '', ...rest }) {
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
      {arrow && <Icon name="arrow" size={18} className="btn-arrow" />}
    </a>
  )
}

export function LiveDot({ tone = 'ok' }) {
  return <span className={`live-dot ${tone === 'ok' ? '' : `is-${tone}`}`} aria-hidden="true" />
}
