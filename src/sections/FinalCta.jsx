import { FINAL } from '../content'
import { Composer } from '../components/Composer'
import { Mark, Reveal } from '../components/ui'
import './FinalCta.css'

export default function FinalCta() {
  return (
    <section className="final">
      <div className="container final-inner">
        <Reveal>
          <Mark size={56} className="final-mark" />
        </Reveal>
        <Reveal as="h2" className="h-section center final-title" delay={0.05}>
          {FINAL.title}
        </Reveal>
        <Reveal as="p" className="lead center final-sub" delay={0.1}>
          {FINAL.sub}
        </Reveal>
        <Reveal className="final-composer" delay={0.15}>
          <Composer tag="final" />
        </Reveal>
      </div>
    </section>
  )
}
