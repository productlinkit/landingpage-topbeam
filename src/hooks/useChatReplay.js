import { useEffect, useMemo, useState } from 'react'
import { useReducedMotion } from 'motion/react'
import { timeline } from '../lib/timeline'

const HOLD = 4000 // finished conversation stays on screen before it loops

// Plays `steps` one at a time on the timeline() rhythm and loops.
// Pauses while `active` is false (off screen). Reduced motion shows everything at once.
// Remount (change `key`) to start a different conversation from the top.
export function useChatReplay(steps, active = true) {
  const reduce = useReducedMotion()
  const tl = useMemo(() => timeline(steps), [steps])
  const [shown, setShown] = useState(0)
  const [cycle, setCycle] = useState(0)

  useEffect(() => {
    if (reduce || !active) return
    const prevAt = shown === 0 ? 0 : tl[shown - 1].at
    const wait = shown < tl.length ? tl[shown].at - prevAt : HOLD
    const timer = setTimeout(() => {
      if (shown < tl.length) setShown(shown + 1)
      else {
        setShown(0)
        setCycle((c) => c + 1)
      }
    }, wait)
    return () => clearTimeout(timer)
  }, [shown, active, reduce, tl])

  if (reduce) return { shown: steps.length, typing: false, cycle: 0 }
  const typing = active && shown < tl.length && tl[shown].typingBefore
  return { shown, typing, cycle }
}
