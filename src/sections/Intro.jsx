import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { INTRO } from '../content'
import './Intro.css'

// Statement that "inks in" word by word as it scrolls through the viewport.
const parts = [
  { text: INTRO.before },
  { text: INTRO.a, mark: 'var(--lilac)' },
  { text: INTRO.mid },
  { text: INTRO.b, mark: 'var(--sky)' },
  { text: INTRO.after },
]
const tokens = parts.flatMap((p) => (p.mark ? [{ text: p.text, mark: p.mark }] : p.text.split(' ').map((t) => ({ text: t }))))

export default function Intro() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] })

  return (
    <section className="intro" ref={ref}>
      <p className="container intro-text wide">
        {tokens.map((t, i) => (
          <Word key={i} t={t} i={i} n={tokens.length} progress={scrollYProgress} />
        ))}
      </p>
    </section>
  )
}

function Word({ t, i, n, progress }) {
  const start = i / n
  const opacity = useTransform(progress, [start, start + 1.5 / n], [0.18, 1])
  return (
    <>
      <motion.span style={t.mark ? { opacity, '--mark': t.mark } : { opacity }} className={t.mark ? 'intro-mark' : undefined}>
        {t.text}
      </motion.span>{' '}
    </>
  )
}
