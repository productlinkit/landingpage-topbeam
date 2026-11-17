import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { CAPS } from '../content'
import { Nova } from '../components/Nova'
import { Icon } from '../components/Icon'
import { SectionHead } from '../components/ui'
import { useCountUp } from '../hooks/useCountUp'
import { DUR, EASE, RISE } from '../components/ease'
import './Stats.css'

// Final resting spot of each pill in the pile around Nova: side, % from that side, px from the
// bottom, tilt. Pills drop in with a spring when the card scrolls into view.
const PILE = [
  ['l', 2, 10, -4],
  ['r', 2, 10, 5],
  ['l', 8, 56, 6],
  ['r', 6, 56, -6],
  ['l', 1, 102, -8],
  ['r', 1, 102, 7],
  ['l', 12, 148, 3],
  ['r', 10, 148, -3],
  ['l', 4, 194, -5],
  ['r', 4, 194, 6],
  ['l', 22, 246, -10],
  ['r', 20, 262, 9],
]

// Three checks Nova runs before any payment, laid out like a stats board: a card where every
// step Nova sends falls in as a pill (drag them around), and three tinted
// cards whose figures count up. A navy band below carries the safety rule.
export default function Stats() {
  return (
    <section className="section stats is-plain" id="fitur" aria-labelledby="fitur-title">
      <div className="container">
        <SectionHead id="fitur-title" title={CAPS.title} lead={CAPS.lead} />

        <div className="stats-grid">
          <PillPile />
          <div className="stats-cards">
            {CAPS.items.map((c, i) => (
              <StatCard key={c.id} item={c} tone={['brand', 'brand', 'highlight'][i]} />
            ))}
          </div>
        </div>

        <motion.div
          className="stats-safety"
          initial={{ opacity: 0, y: RISE }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: DUR.reveal, ease: EASE }}
        >
          <span className="stats-safety-icon" aria-hidden="true">
            <Icon name="shield" size={26} />
          </span>
          <div>
            <strong>{CAPS.safety.title}</strong>
            <p>{CAPS.safety.body}</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function PillPile() {
  const box = useRef(null)
  const inView = useInView(box, { once: true, amount: 0.35 })

  return (
    <div className="stats-pile-wrap">
      <div ref={box} className="stats-pile" aria-hidden="true">
        <div className="stats-pile-nova">
          <Nova pose="sit" size={170} mood={inView ? 'happy' : 'idle'} />
        </div>
        {inView &&
          CAPS.pills.map((p, i) => {
            const [side, x, bottom, rot] = PILE[i % PILE.length]
            return (
              <motion.span
                key={i}
                className={`stats-pill is-${p.tone}`}
                style={{ [side === 'l' ? 'left' : 'right']: `${x}%`, bottom }}
                initial={{ y: -560, opacity: 0, rotate: rot * 1.5 }}
                animate={{ y: 0, opacity: 1, rotate: rot }}
                // near-critically damped: the pills land, they don't bounce
                transition={{ type: 'spring', stiffness: 200, damping: 26, mass: 0.9, delay: 0.15 + i * 0.08 }}
                drag
                dragConstraints={box}
                dragElastic={0.15}
                whileDrag={{ scale: 1.08, rotate: 0, zIndex: 5 }}
                whileHover={{ y: -3 }}
              >
                <span className="stats-pill-dot" />
                {p.text}
              </motion.span>
            )
          })}
      </div>
      <div className="stats-pile-foot">
        <p>{CAPS.pillsHint}</p>
      </div>
    </div>
  )
}

function StatCard({ item, tone }) {
  const [ref, n] = useCountUp(Number(item.metric))
  return (
    <motion.article
      ref={ref}
      className={`stats-card is-${tone}`}
      initial={{ opacity: 0, y: RISE }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: DUR.reveal, ease: EASE }}
      whileHover={{ y: -4 }}
    >
      <p className="stats-figure">
        {/* width reserved for the final digits, so counting never shifts the unit */}
        <strong style={{ minWidth: `${String(item.metric).length}ch` }}>{n}</strong>
        <span>{item.unit}</span>
      </p>
      <h3>{item.title}</h3>
      <p className="stats-body">{item.body}</p>
    </motion.article>
  )
}
