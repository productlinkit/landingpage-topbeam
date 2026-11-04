import { useEffect, useState } from 'react'

// Distance (px) the page must move before the state flips, so tiny jitters don't toggle it.
const DELTA = 6
// Always visible within this distance from the top of the page.
const TOP_ZONE = 80
// Past this offset the bar gets its translucent background.
const SCROLLED_AT = 8

// Scroll state for a fixed header: `hidden` while scrolling down, back on any scroll up.
export function useHideOnScroll() {
  // Initial value reads the scroll position directly (e.g. after a reload mid-page).
  const [scrolled, setScrolled] = useState(() => window.scrollY > SCROLLED_AT)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    let lastY = window.scrollY
    let ticking = false
    const update = () => {
      ticking = false
      const y = Math.max(0, window.scrollY)
      setScrolled(y > SCROLLED_AT)
      if (y < TOP_ZONE) setHidden(false)
      else if (y - lastY > DELTA) setHidden(true)
      else if (lastY - y > DELTA) setHidden(false)
      else return // movement too small: keep lastY so slow scrolls still add up
      lastY = y
    }
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(update)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return { scrolled, hidden }
}
