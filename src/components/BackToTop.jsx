import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Icon } from './Icon'
import { EASE } from './ease'
import './BackToTop.css'

// Round "up" button, shown only once the footer is on screen (the visitor reached the bottom).
// Click scrolls back to the hero.
export function BackToTop() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    let io
    let mo
    const watch = (footer) => {
      io = new IntersectionObserver(([e]) => setShow(e.isIntersecting), { threshold: 0.05 })
      io.observe(footer)
    }
    // The footer is lazy-loaded, so wait for it to mount if it is not there yet.
    const footer = document.querySelector('.footer')
    if (footer) watch(footer)
    else {
      mo = new MutationObserver(() => {
        const f = document.querySelector('.footer')
        if (f) {
          mo.disconnect()
          watch(f)
        }
      })
      mo.observe(document.body, { childList: true, subtree: true })
    }
    return () => {
      io?.disconnect()
      mo?.disconnect()
    }
  }, [])

  const toTop = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
    // Move keyboard focus back to the top of the page too
    document.querySelector('.header-logo')?.focus({ preventScroll: true })
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          type="button"
          className="to-top"
          onClick={toTop}
          aria-label="Kembali ke atas"
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.9 }}
          whileTap={{ scale: 0.94 }}
          transition={{ duration: 0.35, ease: EASE }}
        >
          <Icon name="arrowUp" size={20} strokeWidth={2.4} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
