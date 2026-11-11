import { useState } from 'react'
import { REPLAY } from '../content'
import { TRANSCRIPTS } from '../data/transcripts'
import { ChatWindow } from '../components/ChatWindow'
import { Icon } from '../components/Icon'
import { Reveal, SectionHead } from '../components/ui'
import './Replay.css'

// Dark section: a chat window replays the chosen real conversation; the list on the right
// switches scenario (and restarts the replay from the top).
export default function Replay() {
  const [pick, setPick] = useState(0)
  const sc = REPLAY.scenarios[pick]

  return (
    <section className="section replay">
      <div className="container">
        <SectionHead title={REPLAY.title} lead={REPLAY.lead} className="replay-head" />

        <div className="replay-grid">
          <Reveal className="replay-chat" amount={0.2}>
            <ChatWindow
              dark
              steps={TRANSCRIPTS[sc.id].steps}
              replayKey={sc.id}
              label={`Percakapan asli dengan Nova: ${sc.title}, ${REPLAY.tested(sc.date)}`}
            />
          </Reveal>

          <div className="replay-side">
            <p className="mono replay-pick">{REPLAY.pick}</p>
            <ul className="replay-list">
              {REPLAY.scenarios.map((s, i) => (
                <li key={s.id}>
                  <button
                    type="button"
                    className={`replay-item ${pick === i ? 'is-on' : ''}`}
                    aria-pressed={pick === i}
                    onClick={() => setPick(i)}
                  >
                    <span className="replay-item-text">
                      <span className="replay-tag mono">{s.tag}</span>
                      <strong>{s.title}</strong>
                      <span>
                        {s.sub} · {REPLAY.tested(s.date)}
                      </span>
                    </span>
                    <span className="replay-play" aria-hidden="true">
                      <Icon name={pick === i ? 'chat' : 'arrow'} size={16} />
                    </span>
                  </button>
                </li>
              ))}
            </ul>
            <div className="replay-stats">
              {REPLAY.stats.map((st) => (
                <div key={st.label}>
                  <strong>{st.value}</strong>
                  <span>{st.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
