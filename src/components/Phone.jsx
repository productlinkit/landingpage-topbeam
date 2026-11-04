import { useRef } from 'react'
import { AnimatePresence, motion, useInView } from 'motion/react'
import { Icon } from './Icon'
import { useChatScript } from '../hooks/useChatScript'
import { PHONE } from '../content'
import { Mark } from './ui'
import { EASE } from './ease'
import './Phone.css'

const bubble = {
  initial: { opacity: 0, y: 14, scale: 0.94 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, transition: { duration: 0.2 } },
  transition: { duration: 0.45, ease: EASE },
}

// A phone frame with a WhatsApp-style chat that plays `script` while it is on screen.
// `replayKey` restarts the script (used by the family picker).
export function ChatPhone({ script, label, replayKey = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { amount: 0.4 })
  return (
    <div ref={ref} className="phone" role="img" aria-label={label}>
      <ChatBody key={replayKey} script={script} active={inView} />
    </div>
  )
}

function ChatBody({ script, active }) {
  const { shown, typing, cycle } = useChatScript(script, active)
  return (
    <div className="phone-screen">
      <div className="phone-island" aria-hidden="true" />
      <div className="phone-head">
        <span className="phone-avatar">
          <Mark size={22} />
        </span>
        <span className="phone-id">
          <span className="phone-name">
            {PHONE.name}
            <Icon name="badge" size={14} strokeWidth={2.4} className="phone-verified" />
          </span>
          <span className="phone-sub">{PHONE.sub}</span>
        </span>
      </div>
      <div className="phone-body">
        <AnimatePresence mode="popLayout">
          {script.slice(0, shown).map((m, i) => (
            <motion.div
              key={`${cycle}-${i}`}
              layout="position"
              {...bubble}
              style={{ originX: m.from === 'me' ? 1 : 0, originY: 1 }}
              className={`bubble bubble-${m.from}`}
            >
              {m.ok && (
                <span className="bubble-ok">
                  <Icon name="check" size={12} strokeWidth={3} /> Berhasil
                </span>
              )}
              {m.text}
              {m.options && (
                <span className="bubble-options">
                  {m.options.map((o) => (
                    <span key={o}>{o}</span>
                  ))}
                </span>
              )}
            </motion.div>
          ))}
          {typing && (
            <motion.div key={`t-${cycle}-${shown}`} layout="position" {...bubble} className="bubble bubble-nova bubble-typing">
              <span />
              <span />
              <span />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="phone-input" aria-hidden="true">
        <span>{PHONE.placeholder}</span>
        <span className="phone-send">
          {/* WhatsApp-style send arrow */}
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <path d="M3.4 20.4l17.45-7.48a1 1 0 0 0 0-1.84L3.4 3.6a.99.99 0 0 0-1.39.91L2 9.12c0 .5.37.93.87.99L17 12 2.87 13.88c-.5.07-.87.5-.87 1l.01 4.61c0 .71.73 1.2 1.39.91z" />
          </svg>
        </span>
      </div>
    </div>
  )
}
