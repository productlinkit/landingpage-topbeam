import { OPERATORS, WALLETS } from '../content'
import { ChatPhone } from '../components/Phone'
import { Reveal, SlotTitle, WaButton } from '../components/ui'
import './Story.css'

const LOGOS = { operators: OPERATORS, wallets: WALLETS }

// Big uppercase slot title, then the phone with one short line on each side.
export default function Story({ story }) {
  const logos = LOGOS[story.logos]
  return (
    <section className="story" id={story.id}>
      <div className="container">
        <Reveal as="p" className="eyebrow center story-label">
          {story.label}
        </Reveal>
        <SlotTitle lines={story.title} slot={story.slot} />

        <div className="story-grid">
          <Reveal className="story-line story-line-a" delay={0.1}>
            <p className="wide">{story.lines[0]}</p>
          </Reveal>
          <div className="story-phone">
            <span className="story-halo" style={{ '--halo': story.slot.color }} aria-hidden="true" />
            <ChatPhone script={story.chat} label={`Contoh chat ${story.label.toLowerCase()} dengan Nova`} />
          </div>
          <Reveal className="story-line story-line-b" delay={0.2}>
            <p className="wide">{story.lines[1]}</p>
          </Reveal>
        </div>

        <Reveal className="story-foot">
          <ul className="story-logos" aria-label={`Didukung: ${logos.map((l) => l.name).join(', ')}`}>
            {logos.map((l) => (
              <li key={l.name}>
                <img src={l.src} alt={l.name} loading="lazy" height="24" />
              </li>
            ))}
          </ul>
          <WaButton cta={story.cta.key}>{story.cta.label}</WaButton>
        </Reveal>
      </div>
    </section>
  )
}
