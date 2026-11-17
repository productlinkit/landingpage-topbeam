import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'motion/react'

// Counts from 0 up to `target` (an integer) once the element scrolls into view, easing out.
// Re-runs when `target` or `key` changes. Reduced motion: shows the final number at once.
export function useCountUp(target, { duration = 1400, key } = {}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reduce = useReducedMotion()
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView || reduce) return
    let frame = 0
    const start = performance.now()
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration)
      setValue(Math.round(target * (1 - Math.pow(1 - t, 3))))
      if (t < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView, target, duration, reduce, key])

  // reduced motion: the final number at once, no counting
  return [ref, reduce ? target : value]
}
