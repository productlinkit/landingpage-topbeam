import { useEffect, useState } from 'react'

// Id of the section that currently crosses the upper third of the viewport, or ''.
// Sections are lazy-loaded, so ids that are not in the DOM yet are picked up as they mount.
export function useActiveSection(ids) {
  const [active, setActive] = useState('')
  const key = ids.join(',')

  useEffect(() => {
    const list = key.split(',')
    const seen = new Set()
    const visible = new Map()
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) visible.set(e.target.id, e.isIntersecting)
        setActive(list.find((id) => visible.get(id)) ?? '')
      },
      { rootMargin: '-30% 0px -60% 0px' },
    )
    const scan = () => {
      for (const id of list) {
        const el = document.getElementById(id)
        if (el && !seen.has(id)) {
          seen.add(id)
          io.observe(el)
        }
      }
      if (seen.size === list.length) mo.disconnect()
    }
    const mo = new MutationObserver(scan)
    mo.observe(document.body, { childList: true, subtree: true })
    scan()
    return () => {
      io.disconnect()
      mo.disconnect()
    }
  }, [key])

  return active
}
