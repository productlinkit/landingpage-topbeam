import { useRef } from 'react'
import { motion } from 'motion/react'
import { HOW } from '../content'
import { Icon } from '../components/Icon'
import { Reveal } from '../components/ui'
import { EASE } from '../components/ease'
import { useRail } from '../hooks/useRail'
import './How.css'

// Cards slide in one after another when the rail enters the viewport.
const railMotion = { show: { transition: { staggerChildren: 0.07 } } }
const cardMotion = {
  hidden: { opacity: 0, x: 60 },
  show: { opacity: 1, x: 0, transition: { duration: 0.9, ease: EASE } },
}

// Horizontal card rail: native scroll + snap, mouse drag on desktop, arrow buttons for everyone.
export default function How() {
  const rail = useRef(null)
  const { atStart, atEnd, step } = useRail(rail)

  return (
    <section className="section how" id="cara-kerja">
      <div className="container how-head">
        <div>
          <Reveal as="h2" className="h-section">
            {HOW.title}
          </Reveal>
          <Reveal as="p" className="lead" delay={0.1}>
            {HOW.lead}
          </Reveal>
        </div>
        <div className="how-arrows">
          <button type="button" className="how-arrow" onClick={() => step(-1)} disabled={atStart} aria-label={HOW.prev}>
            <Icon name="arrowLeft" size={18} />
          </button>
          <button type="button" className="how-arrow" onClick={() => step(1)} disabled={atEnd} aria-label={HOW.next}>
            <Icon name="arrow" size={18} />
          </button>
        </div>
      </div>

      <motion.ol
        className="how-rail"
        ref={rail}
        tabIndex={0}
        aria-label={HOW.railLabel}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={railMotion}
      >
        {HOW.steps.map((s, i) => (
          <motion.li key={s.title} className="how-card" variants={cardMotion}>
            <span className="how-step">{HOW.step(i + 1)}</span>
            <span className="how-icon" style={{ background: s.tint }}>
              <Icon name={s.icon} size={20} />
            </span>
            <h3 className="h-card">{s.title}</h3>
            <p>{s.body}</p>
          </motion.li>
        ))}
      </motion.ol>
    </section>
  )
}
