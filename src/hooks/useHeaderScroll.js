import { useEffect, useState } from 'react'

// Past this offset the header gets its translucent background.
const SCROLLED_AT = 8
// Where the header bar sits (px from the top of the viewport): the section under this line
// decides whether the bar is light or dark.
const PROBE_Y = 40

// The light/dark section the header is floating over. Only whole sections (and the footer)
// count, so a dark card inside a light section does not flip the bar.
function darkUnderHeader() {
  const hits = document.elementsFromPoint(window.innerWidth / 2, PROBE_Y)
  const el = hits.find((n) => !n.closest('.header, .scroll-progress'))
  return el?.closest('section[data-theme], footer[data-theme]')?.dataset.theme === 'dark'
}

// Scroll state for the fixed header: `scrolled` once the page leaves the top (the bar gets its
// background), `overDark` while a dark section is under it (the bar switches to its navy form).
export function useHeaderScroll() {
  // Initial value reads the scroll position directly (e.g. after a reload mid-page).
  const [scrolled, setScrolled] = useState(() => window.scrollY > SCROLLED_AT)
  const [overDark, setOverDark] = useState(true)

  useEffect(() => {
    let ticking = false
    const update = () => {
      ticking = false
      setScrolled(window.scrollY > SCROLLED_AT)
      setOverDark(darkUnderHeader())
    }
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return { scrolled, overDark }
}
