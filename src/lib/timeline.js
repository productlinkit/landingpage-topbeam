// Pacing for replayed chats. The real bot takes 30 to 40 s per reply; the page compresses
// that to a readable rhythm and never claims a reply time.
// Pure functions, no imports, so tests run them with plain Node.

const length = (s) => (s.text?.length ?? 0) + (s.list?.join('').length ?? 0) / 3

// Returns when each step appears (ms from start) and whether Nova "types" before it.
export function timeline(steps, { reduce = false, base = 900, perChar = 12, max = 1600, typing = 900 } = {}) {
  let at = 0
  return steps.map((s, index) => {
    const typingBefore = s.from === 'nova'
    if (reduce) return { at: 0, index, typingBefore }
    if (index > 0) {
      // Longer previous message = a little more reading time, capped at `max`.
      at += Math.min(max, base + (perChar * length(steps[index - 1])) / 10)
      if (typingBefore) at += typing
    } else {
      at = base / 2
    }
    return { at, index, typingBefore }
  })
}

// First `n` rows, plus an ellipsis row when the bot sent more.
export function shortList(list, n = 4) {
  return list.length > n ? [...list.slice(0, n), '…'] : list
}
