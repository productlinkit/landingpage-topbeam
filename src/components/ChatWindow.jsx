import { useRef } from 'react'
import { AnimatePresence, motion, useInView } from 'motion/react'
import { Icon } from './Icon'
import { Mark } from './ui'
import { useChatReplay } from '../hooks/useChatReplay'
import { shortList } from '../lib/timeline'
import { CHAT } from '../content'
import { EASE } from './ease'
import './ChatWindow.css'

const enter = {
  initial: { opacity: 0, y: 14, scale: 0.94 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, transition: { duration: 0.2 } },
  transition: { duration: 0.45, ease: EASE },
}

// A phone with a WhatsApp chat that replays `steps` (from data/transcripts.js) while on screen.
// Change `replayKey` to restart from the top with a different conversation.
export function ChatWindow({ steps, label, replayKey = '', className = '' }) {
  const ref = useRef(null)
  const active = useInView(ref, { amount: 0.2 })
  return (
    <div ref={ref} className={`phone ${className}`} role="img" aria-label={label}>
      <div className="phone-bezel">
        <div className="phone-screen">
          <span className="phone-island" aria-hidden="true" />
          <div className="phone-head">
            <span className="phone-avatar">
              <Mark size={24} />
            </span>
            <span className="phone-id">
              <span className="phone-name">{CHAT.name}</span>
              <span className="phone-sub">{CHAT.sub}</span>
            </span>
          </div>
          <ChatBody key={replayKey} steps={steps} active={active} />
          <div className="phone-input" aria-hidden="true">
            <span>{CHAT.placeholder}</span>
            <span className="phone-send">
              {/* WhatsApp-style send arrow */}
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M3.4 20.4l17.45-7.48a1 1 0 0 0 0-1.84L3.4 3.6a.99.99 0 0 0-1.39.91L2 9.12c0 .5.37.93.87.99L17 12 2.87 13.88c-.5.07-.87.5-.87 1l.01 4.61c0 .71.73 1.2 1.39.91z" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

function ChatBody({ steps, active }) {
  const { shown, typing, cycle } = useChatReplay(steps, active)
  return (
    <div className="chat-body">
      <AnimatePresence mode="popLayout">
        {steps.slice(0, shown).map((s, i) => (
          <motion.div
            key={`${cycle}-${i}`}
            layout="position"
            {...enter}
            style={{ originX: s.from === 'me' ? 1 : 0, originY: 1 }}
            className={s.from === 'card' ? 'chat-card-wrap' : `bubble bubble-${s.from}`}
          >
            {s.from === 'card' ? <StepCard step={s} /> : <Message step={s} />}
          </motion.div>
        ))}
        {typing && (
          <motion.div
            key={`t-${cycle}-${shown}`}
            layout="position"
            {...enter}
            className="bubble bubble-nova bubble-typing"
          >
            <span />
            <span />
            <span />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function Message({ step }) {
  return (
    <>
      {step.text}
      {step.list && (
        <ul className="bubble-list">
          {shortList(step.list).map((row) => (
            <li key={row}>{row}</li>
          ))}
        </ul>
      )}
      {step.tail && <span className="bubble-tail">{step.tail}</span>}
    </>
  )
}

// What happens after Nova's confirmation, drawn as UI rather than as a Nova message.
function StepCard({ step }) {
  const c = CHAT.cards[step.card]
  return (
    <div className={`step-card step-card-${step.card}`}>
      <span className="step-card-icon">
        <Icon name={step.card === 'qris' ? 'qr' : 'check'} size={16} strokeWidth={2.4} />
      </span>
      <span className="step-card-text">
        <span className="mono step-card-kicker">{c.kicker}</span>
        <span className="step-card-title">{c.title}</span>
        <span className="step-card-sub">{step.amount ? `${step.amount} · ${c.sub}` : c.sub}</span>
      </span>
    </div>
  )
}
