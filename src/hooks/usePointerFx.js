import { useCallback, useRef } from 'react'

// Pointer effects only on a real mouse/trackpad and only when motion is welcome.
function fxAllowed() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

// Card tilt + cursor spotlight. Spread the returned handlers on any element with the `.fx-tilt`
// class; it writes --mx/--my (spotlight position) and --rx/--ry (tilt in degrees) as CSS vars.
export function useTilt(max = 6) {
  const frame = useRef(0)
  const onPointerMove = useCallback(
    (e) => {
      if (!fxAllowed()) return
      const el = e.currentTarget
      const r = el.getBoundingClientRect()
      const x = (e.clientX - r.left) / r.width
      const y = (e.clientY - r.top) / r.height
      cancelAnimationFrame(frame.current)
      frame.current = requestAnimationFrame(() => {
        el.style.setProperty('--mx', `${x * 100}%`)
        el.style.setProperty('--my', `${y * 100}%`)
        el.style.setProperty('--rx', `${(0.5 - y) * max}deg`)
        el.style.setProperty('--ry', `${(x - 0.5) * max}deg`)
      })
    },
    [max],
  )
  const onPointerLeave = useCallback((e) => {
    cancelAnimationFrame(frame.current)
    const el = e.currentTarget
    el.style.setProperty('--rx', '0deg')
    el.style.setProperty('--ry', '0deg')
  }, [])
  return { onPointerMove, onPointerLeave }
}

// Magnetic pull: the element drifts a few px toward the cursor (uses the `translate` property,
// so it never fights a `transform` set in CSS).
export function useMagnet(strength = 0.25) {
  const onPointerMove = useCallback(
    (e) => {
      if (!fxAllowed()) return
      const el = e.currentTarget
      const r = el.getBoundingClientRect()
      const dx = (e.clientX - (r.left + r.width / 2)) * strength
      const dy = (e.clientY - (r.top + r.height / 2)) * strength
      el.style.translate = `${dx}px ${dy}px`
    },
    [strength],
  )
  const onPointerLeave = useCallback((e) => {
    e.currentTarget.style.translate = ''
  }, [])
  return { onPointerMove, onPointerLeave }
}
