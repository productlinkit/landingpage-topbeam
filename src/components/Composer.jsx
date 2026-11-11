import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { WhatsAppIcon } from './WhatsAppIcon'
import { COMPOSER, INTENTS } from '../content'
import { trackCta, waText } from '../config'
import { EASE } from './ease'
import './Composer.css'

// The hero call to action, shaped like a WhatsApp message composer:
// pick a need, the message is "typed" in the pill, the button opens WhatsApp with it.
export function Composer({ tag, id, align = 'center' }) {
  const [pick, setPick] = useState(0)
  const intent = INTENTS[pick]

  return (
    <div className={`composer composer-${align}`} id={id}>
      <div className="composer-chips" role="radiogroup" aria-label={COMPOSER.pick}>
        {INTENTS.map((it, i) => (
          <button
            key={it.id}
            type="button"
            role="radio"
            aria-checked={pick === i}
            className={`composer-chip ${pick === i ? 'is-on' : ''}`}
            onClick={() => setPick(i)}
          >
            {pick === i && (
              <motion.span
                layoutId={`chip-${tag}`}
                className="composer-chip-bg"
                transition={{ type: 'spring', stiffness: 420, damping: 36 }}
              />
            )}
            <span className="composer-chip-label">{it.label}</span>
          </button>
        ))}
      </div>

      <a
        className="composer-pill"
        href={waText(intent.text, tag)}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackCta(`${tag}-${intent.id}`)}
      >
        <span className="composer-text" aria-hidden="true">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={intent.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              {intent.text}
            </motion.span>
          </AnimatePresence>
          <span className="composer-caret" />
        </span>
        <span className="sr-only">{COMPOSER.sendLabel(intent.text)}</span>
        <span className="composer-send">
          <WhatsAppIcon size={20} variant="color" />
          <span className="composer-send-label">{COMPOSER.send}</span>
        </span>
      </a>
    </div>
  )
}
