import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'motion/react'
import wave1 from '../assets/brand/topbeam-wave@1x.webp'
import wave2 from '../assets/brand/topbeam-wave@2x.webp'
import thumbs1 from '../assets/brand/topbeam-thumbsup@1x.webp'
import thumbs2 from '../assets/brand/topbeam-thumbsup@2x.webp'
import point1 from '../assets/brand/topbeam-point@1x.webp'
import point2 from '../assets/brand/topbeam-point@2x.webp'
import crossed1 from '../assets/brand/topbeam-crossed@1x.webp'
import crossed2 from '../assets/brand/topbeam-crossed@2x.webp'
import headset1 from '../assets/brand/topbeam-headset@1x.webp'
import headset2 from '../assets/brand/topbeam-headset@2x.webp'
import sit1 from '../assets/brand/topbeam-sit@1x.webp'
import sit2 from '../assets/brand/topbeam-sit@2x.webp'
import { Icon } from './Icon'
import './Nova.css'

// Nova, TopBeam's assistant: the white robot from the character sheet, always shown whole.
// Each pose is its own artwork (1x + 2x), picked for what Nova is doing in that section:
//
// pose:  wave     - waving hello (hero: she greets; hover swaps to the thumbs-up wink)
//        point    - points at something (products: at the cards)
//        crossed  - arms folded, confident (how it works)
//        headset  - support agent (decision log, FAQ)
//        sit      - sitting on the floor (the pill pile)
//        thumbsup - thumbs-up + wink (closing CTA, the chosen-product card)
// hoverPose: a second pose crossfaded in while the pointer is on her (desktop)
// halo:  a soft beam-gradient glow behind her that breathes slowly (dark sections)
// flip:  mirror the pose (so a pointing hand faces the content)
// mood:  idle - float · happy - float + cyan sparks · think - dots bubble
// prop:  an icon chip by her hand
// track: she leans toward the pointer, max +-6deg with damping (desktop, no reduced motion)
// `size` is her height in px. Decorative: alt is empty, the text around her carries the meaning.
const POSES = {
  wave: { src: wave1, src2: wave2, ratio: 319 / 455 },
  thumbsup: { src: thumbs1, src2: thumbs2, ratio: 706 / 997 },
  point: { src: point1, src2: point2, ratio: 320 / 462 },
  crossed: { src: crossed1, src2: crossed2, ratio: 284 / 458 },
  headset: { src: headset1, src2: headset2, ratio: 284 / 454 },
  sit: { src: sit1, src2: sit2, ratio: 329 / 403 },
}

function Art({ pose, width, height, className }) {
  const a = POSES[pose] ?? POSES.thumbsup
  return (
    <img
      className={className}
      src={a.src}
      srcSet={`${a.src} 1x, ${a.src2} 2x`}
      alt=""
      width={width}
      height={height}
      draggable="false"
      decoding="async"
    />
  )
}

export function Nova({
  pose = 'thumbsup',
  hoverPose,
  halo = false,
  flip = false,
  mood = 'idle',
  size = 160,
  track = false,
  prop,
  className = '',
}) {
  const reduce = useReducedMotion()
  const root = useRef(null)
  const art = POSES[pose] ?? POSES.thumbsup
  const width = Math.round(size * art.ratio)
  const small = size < 70 // avatar size: no bubbles, barely any float

  useEffect(() => {
    if (!track || reduce) return
    if (!window.matchMedia('(pointer: fine)').matches) return
    let frame = 0
    const onMove = (e) => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const el = root.current
        if (!el) return
        const r = el.getBoundingClientRect()
        const dx = Math.max(-1, Math.min(1, ((e.clientX - (r.left + r.width / 2)) / window.innerWidth) * 2.4))
        const dy = Math.max(-1, Math.min(1, ((e.clientY - (r.top + r.height / 2)) / window.innerHeight) * 2))
        el.style.setProperty('--lean-x', dx.toFixed(3))
        el.style.setProperty('--lean-y', dy.toFixed(3))
      })
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onMove)
    }
  }, [track, reduce])

  return (
    <span
      ref={root}
      className={`nova nova-${mood} nova-pose-${pose} ${flip ? 'is-flipped' : ''} ${hoverPose ? 'has-swap' : ''} ${prop ? 'is-holding' : ''} ${className}`}
      style={{ width, height: size, '--ratio': art.ratio, '--float-amp': `${small ? 2 : Math.min(10, Math.round(size * 0.04))}px` }}
      aria-hidden="true"
    >
      {halo && <span className="nova-halo" />}
      <span className="nova-shadow" />
      <span className="nova-float">
        <span className="nova-lean">
          <span className="nova-face">
            <Art pose={pose} width={width} height={size} className="nova-img" />
            {hoverPose && <Art pose={hoverPose} width={width} height={size} className="nova-img nova-img-alt" />}
          </span>
        </span>
      </span>

      {mood === 'think' && !small && (
        <span className="nova-dots">
          <i />
          <i />
          <i />
        </span>
      )}
      {mood === 'happy' && !small && (
        <span className="nova-sparks">
          <i />
          <i />
          <i />
        </span>
      )}
      {prop && (
        <span className="nova-prop" style={{ width: Math.max(26, size * 0.3), height: Math.max(26, size * 0.3) }}>
          <Icon name={prop} size={Math.max(13, Math.round(size * 0.15))} />
        </span>
      )}
    </span>
  )
}
