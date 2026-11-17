import { useEffect, useState } from 'react'

const EVERY = 60_000

// Polls a status endpoint ({ "status": "ok" | "degraded" | "down" }) while the page is visible.
// Returns null when no endpoint is configured, so callers can show nothing rather than a
// status nobody measured. A failed request reports "unknown", never "ok".
export function useServiceStatus(url) {
  const [state, setState] = useState(url ? { status: 'unknown', at: null } : null)

  useEffect(() => {
    if (!url) return
    let alive = true
    let timer
    const check = async () => {
      try {
        const res = await fetch(url, { cache: 'no-store' })
        const body = res.ok ? await res.json() : null
        const status = ['ok', 'degraded', 'down'].includes(body?.status) ? body.status : 'unknown'
        if (alive) setState({ status, at: new Date() })
      } catch {
        if (alive) setState({ status: 'unknown', at: new Date() })
      }
    }
    const loop = () => {
      if (document.visibilityState === 'visible') check()
      timer = setTimeout(loop, EVERY)
    }
    loop()
    return () => {
      alive = false
      clearTimeout(timer)
    }
  }, [url])

  return state
}
