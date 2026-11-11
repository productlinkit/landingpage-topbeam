import { useEffect, useId, useRef } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react'
import { Icon } from './Icon'
import './Nova.css'

// Nova, Topbeam's mascot: the gold four-point star from the logo, softened and given a face.
// The left and right points are her arms, so she can wave, point and hold things.
// A short light trail in the logo gradient (the "beam") follows her when `beam` is on.
//
// pose: idle | wave | phone | wifi | wallet | fuel | shield | think | cheer
// Decorative only: the text around her carries the meaning.

const PROPS = { phone: 'phone', wifi: 'wifi', wallet: 'wallet', fuel: 'fuel', shield: 'shield' }
const EASE_IO = 'easeInOut'

// Angle of each arm per pose (deg), [left, right]. Positive lifts the left arm, negative lifts the right.
const ARMS = {
  idle: [-8, 8],
  wave: [-8, -30],
  think: [-8, 8],
  cheer: [34, -34],
}
const HOLD_ARMS = [-8, -22]

export function Nova({ pose = 'idle', size = 160, track = false, beam = false, className = '' }) {
  const reduce = useReducedMotion()
  const uid = useId().replace(/:/g, '')
  const ref = useRef(null)
  const holding = PROPS[pose]
  const [leftRest, rightRest] = ARMS[pose] ?? (holding ? HOLD_ARMS : ARMS.idle)
  const loop = !reduce

  // Eyes drift toward the pointer (desktop only), springy so they never snap.
  const lookX = useSpring(useMotionValue(0), { stiffness: 120, damping: 14 })
  const lookY = useSpring(useMotionValue(0), { stiffness: 120, damping: 14 })
  useEffect(() => {
    if (!track || reduce || !window.matchMedia('(hover: hover)').matches) return
    let frame = 0
    const onMove = (e) => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const r = ref.current?.getBoundingClientRect()
        if (!r) return
        const dx = (e.clientX - (r.left + r.width / 2)) / (window.innerWidth / 2)
        const dy = (e.clientY - (r.top + r.height / 2)) / (window.innerHeight / 2)
        lookX.set(Math.max(-1, Math.min(1, dx)) * 4)
        lookY.set(Math.max(-1, Math.min(1, dy)) * 3)
      })
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onMove)
    }
  }, [track, reduce, lookX, lookY])

  const g = (name) => `${name}-${uid}`

  return (
    <svg
      ref={ref}
      className={`nova ${className}`}
      width={size}
      height={size}
      viewBox="0 0 200 200"
      aria-hidden="true"
      overflow="visible"
    >
      <defs>
        <radialGradient id={g('body')} cx="0.38" cy="0.32" r="0.75">
          <stop offset="0" stopColor="#ffe59a" />
          <stop offset="0.5" stopColor="#f6bf47" />
          <stop offset="1" stopColor="#e3922a" />
        </radialGradient>
        <linearGradient id={g('beam')} x1="72" y1="146" x2="0" y2="196" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#21c7d9" />
          <stop offset="0.5" stopColor="#2d4fe0" stopOpacity="0.7" />
          <stop offset="1" stopColor="#6a28c6" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Floor shadow: shrinks as she floats up */}
      <motion.ellipse
        cx="100"
        cy="194"
        rx="40"
        ry="5"
        className="nova-shadow"
        animate={loop ? { scaleX: [1, 0.82, 1], opacity: [0.16, 0.09, 0.16] } : undefined}
        transition={{ duration: 4, repeat: Infinity, ease: EASE_IO }}
      />

      <motion.g
        animate={loop ? { y: [0, -8, 0] } : undefined}
        transition={{ duration: 4, repeat: Infinity, ease: EASE_IO }}
        whileHover={loop ? { y: -16, transition: { type: 'spring', stiffness: 400, damping: 10 } } : undefined}
      >
        {beam && (
          <motion.g
            className="nova-beam"
            animate={loop ? { opacity: [0.55, 1, 0.55] } : undefined}
            transition={{ duration: 2.4, repeat: Infinity, ease: EASE_IO }}
          >
            <path d="M72 146 Q42 172 4 192" stroke={`url(#${g('beam')})`} strokeWidth="14" />
            <path d="M86 160 Q64 180 36 198" stroke={`url(#${g('beam')})`} strokeWidth="7" />
            <path d="M60 132 Q32 150 2 160" stroke={`url(#${g('beam')})`} strokeWidth="5" />
          </motion.g>
        )}

        {/* Arms: the left and right star points, pivoting at the body */}
        <motion.path
          d="M66 94 Q46 102 26 108 Q46 114 66 122 Z"
          className="nova-skin"
          fill={`url(#${g('body')})`}
          stroke={`url(#${g('body')})`}
          style={{ originX: 1, originY: 0.5 }}
          initial={{ rotate: leftRest }}
          animate={{ rotate: pose === 'cheer' && loop ? [leftRest, leftRest + 10, leftRest] : leftRest }}
          transition={pose === 'cheer' ? { duration: 0.8, repeat: Infinity, ease: EASE_IO } : { type: 'spring', stiffness: 220, damping: 16 }}
        />
        <motion.path
          d="M134 94 Q154 102 174 108 Q154 114 134 122 Z"
          className="nova-skin"
          fill={`url(#${g('body')})`}
          stroke={`url(#${g('body')})`}
          style={{ originX: 0, originY: 0.5 }}
          initial={{ rotate: rightRest }}
          animate={{
            rotate:
              pose === 'wave' && loop
                ? [rightRest, rightRest - 22, rightRest + 6, rightRest - 18, rightRest]
                : pose === 'cheer' && loop
                  ? [rightRest, rightRest - 10, rightRest]
                  : rightRest,
          }}
          transition={
            pose === 'wave'
              ? { duration: 1.6, repeat: Infinity, repeatDelay: 1.4, ease: EASE_IO }
              : pose === 'cheer'
                ? { duration: 0.8, repeat: Infinity, ease: EASE_IO }
                : { type: 'spring', stiffness: 220, damping: 16 }
          }
        />

        {/* Body: top and bottom points with soft bulging sides */}
        <path
          d="M100 34 Q118 80 150 108 Q118 136 100 182 Q82 136 50 108 Q82 80 100 34 Z"
          className="nova-skin"
          fill={`url(#${g('body')})`}
          stroke={`url(#${g('body')})`}
        />
        {/* Signature twinkle on the top point: the "beam" light */}
        <motion.circle
          cx="100"
          cy="30"
          r="5"
          className="nova-twinkle"
          animate={loop ? { scale: [1, 1.5, 1], opacity: [0.9, 0.5, 0.9] } : undefined}
          transition={{ duration: 2.2, repeat: Infinity, ease: EASE_IO }}
          style={{ originX: 0.5, originY: 0.5 }}
        />
        {/* Soft highlight on the upper body */}
        <path d="M101 52 Q108 74 122 90" className="nova-shine" />

        {/* Face */}
        <ellipse cx="80" cy="124" rx="9" ry="5.5" className="nova-cheek" />
        <ellipse cx="120" cy="124" rx="9" ry="5.5" className="nova-cheek" />
        <motion.g style={{ x: lookX, y: lookY }}>
          <motion.g
            style={{ originY: 0.5 }}
            animate={loop ? { scaleY: [1, 1, 0.1, 1] } : undefined}
            transition={{ duration: 4.5, repeat: Infinity, times: [0, 0.92, 0.95, 1] }}
          >
            <ellipse cx="88" cy="108" rx="8" ry="10" className="nova-eye" />
            <ellipse cx="112" cy="108" rx="8" ry="10" className="nova-eye" />
            <circle cx="91" cy="104" r="3" fill="#fff" />
            <circle cx="115" cy="104" r="3" fill="#fff" />
          </motion.g>
          <path d={pose === 'cheer' ? 'M91 124 Q100 136 109 124 Z' : 'M93 125 Q100 131 107 125'} className="nova-mouth" />
        </motion.g>

        {/* Held item: a white sticker with a line icon, at the raised right hand */}
        {holding && (
          <motion.g
            key={pose}
            initial={reduce ? false : { scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 18 }}
            style={{ originX: 0.5, originY: 0.5 }}
          >
            <circle cx="170" cy="64" r="24" className="nova-sticker" />
            <g transform="translate(155 49)" className="nova-prop">
              <Icon name={holding} size={30} strokeWidth={2.2} />
            </g>
          </motion.g>
        )}

        {pose === 'think' && (
          <g className="nova-dots">
            {[0, 1, 2].map((i) => (
              <motion.circle
                key={i}
                cx={84 + i * 16}
                cy="-2"
                r="5"
                animate={loop ? { y: [0, -6, 0], opacity: [0.4, 1, 0.4] } : undefined}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.16 }}
              />
            ))}
          </g>
        )}

        {pose === 'cheer' &&
          [
            [36, 40, 0],
            [168, 30, 0.3],
            [178, 150, 0.6],
          ].map(([x, y, d]) => (
            <motion.path
              key={x}
              d={`M${x} ${y - 9} Q${x + 2} ${y - 2} ${x + 9} ${y} Q${x + 2} ${y + 2} ${x} ${y + 9} Q${x - 2} ${y + 2} ${x - 9} ${y} Q${x - 2} ${y - 2} ${x} ${y - 9} Z`}
              className="nova-spark"
              style={{ originX: 0.5, originY: 0.5 }}
              animate={loop ? { scale: [0.6, 1.15, 0.6], rotate: [0, 45, 0] } : undefined}
              transition={{ duration: 1.6, repeat: Infinity, delay: d }}
            />
          ))}
      </motion.g>
    </svg>
  )
}
