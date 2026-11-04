import { useCallback, useEffect, useState } from 'react'

// How close (px) to an end of the rail still counts as "at the end".
const EDGE = 8
// Mouse movement (px) before a press turns into a drag (and its click is swallowed).
const DRAG_THRESHOLD = 4

// Horizontal scroll rail helpers for `ref` (a scroll container whose children are the cards):
// - `atStart` / `atEnd` for disabling the arrow buttons
// - `step(dir)` scrolls by one card plus the CSS gap
// - mouse drag to scroll on desktop (touch already scrolls natively)
export function useRail(ref) {
  const [edges, setEdges] = useState({ atStart: true, atEnd: false })

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const update = () =>
      setEdges({
        atStart: el.scrollLeft < EDGE,
        atEnd: el.scrollLeft + el.clientWidth > el.scrollWidth - EDGE,
      })

    let dragging = false
    let moved = false
    let startX = 0
    let startLeft = 0
    const onDown = (e) => {
      if (e.pointerType !== 'mouse') return
      dragging = true
      moved = false
      startX = e.clientX
      startLeft = el.scrollLeft
    }
    const onMove = (e) => {
      if (!dragging) return
      const dx = e.clientX - startX
      if (Math.abs(dx) > DRAG_THRESHOLD) {
        moved = true
        el.classList.add('is-dragging')
      }
      el.scrollLeft = startLeft - dx
    }
    const onUp = () => {
      dragging = false
      el.classList.remove('is-dragging')
    }
    const swallowClickAfterDrag = (e) => moved && e.preventDefault()

    // ResizeObserver also fires once right away, which sets the initial edges
    const ro = new ResizeObserver(update)
    ro.observe(el)
    el.addEventListener('scroll', update, { passive: true })
    el.addEventListener('pointerdown', onDown)
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    el.addEventListener('click', swallowClickAfterDrag, true)
    return () => {
      ro.disconnect()
      el.removeEventListener('scroll', update)
      el.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      el.removeEventListener('click', swallowClickAfterDrag, true)
    }
  }, [ref])

  const step = useCallback(
    (dir) => {
      const el = ref.current
      const card = el?.firstElementChild
      if (!card) return
      const gap = parseFloat(getComputedStyle(el).columnGap) || 0
      el.scrollBy({ left: dir * (card.offsetWidth + gap), behavior: 'smooth' })
    },
    [ref],
  )

  return { ...edges, step }
}
