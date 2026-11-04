import { useEffect, useState } from 'react'

// True once the element with `id` has scrolled up out of view (not while it is still below the fold).
// If the element doesn't exist, it counts as passed.
export function useScrolledPast(id) {
  const [past, setPast] = useState(() => !document.getElementById(id))

  useEffect(() => {
    const el = document.getElementById(id)
    if (!el) return
    const io = new IntersectionObserver(([e]) => setPast(!e.isIntersecting && e.boundingClientRect.top < 0))
    io.observe(el)
    return () => io.disconnect()
  }, [id])

  return past
}
