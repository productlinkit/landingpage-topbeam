import { useEffect, useState } from 'react'
import { useReducedMotion } from 'motion/react'

// Timing of the scripted chat (ms)
const FIRST_DELAY = 700 // before the first message
const STEP = 1500 // between messages
const NOVA_EXTRA = 300 // Nova "types" a little longer than the visitor
const HOLD = 3800 // full conversation stays on screen before it loops

// Steps through a scripted chat one message at a time and loops.
// While `active` is false (phone off screen) the script pauses.
// With reduced motion, the whole conversation is shown at once.
export function useChatScript(script, active = true) {
  const reduce = useReducedMotion()
  const [count, setCount] = useState(0)
  const [cycle, setCycle] = useState(0)

  useEffect(() => {
    if (reduce || !active) return
    let timer
    if (count < script.length) {
      const wait = count === 0 ? FIRST_DELAY : script[count].from === 'nova' ? STEP + NOVA_EXTRA : STEP
      timer = setTimeout(() => setCount((c) => c + 1), wait)
    } else {
      timer = setTimeout(() => {
        setCount(0)
        setCycle((c) => c + 1)
      }, HOLD)
    }
    return () => clearTimeout(timer)
  }, [count, active, script, reduce])

  const shown = reduce ? script.length : count
  // Typing dots appear before each of Nova's replies (not before the very first message)
  const typing = !reduce && active && shown > 0 && shown < script.length && script[shown].from === 'nova'
  return { shown, typing, cycle }
}
