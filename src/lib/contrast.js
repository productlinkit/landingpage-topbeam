// WCAG 2.x contrast math. Pure functions: used by the /design-system page (on live computed
// colors) and by tests/contrast.test.mjs (on the hex values in globals.css).

// Accepts #rgb, #rrggbb, rgb()/rgba() in comma or space syntax, and color(srgb r g b),
// which is what browsers return for color-mix(). Returns [r, g, b] in 0-255, or null.
export function parseColor(input) {
  const s = String(input).trim().toLowerCase()
  let m = s.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/)
  if (m) {
    const h = m[1].length === 3 ? [...m[1]].map((c) => c + c).join('') : m[1]
    return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16))
  }
  m = s.match(/^rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)/)
  if (m) return m.slice(1, 4).map(Number)
  m = s.match(/^color\(srgb\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)/)
  if (m) return m.slice(1, 4).map((v) => Math.round(Number(v) * 255))
  return null
}

export function toHex(rgb) {
  return '#' + rgb.map((v) => Math.round(v).toString(16).padStart(2, '0')).join('').toUpperCase()
}

export function luminance([r, g, b]) {
  const lin = (v) => {
    const c = v / 255
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  }
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b)
}

export function contrastRatio(a, b) {
  const ca = typeof a === 'string' ? parseColor(a) : a
  const cb = typeof b === 'string' ? parseColor(b) : b
  if (!ca || !cb) return NaN
  const [hi, lo] = [luminance(ca), luminance(cb)].sort((x, y) => y - x)
  return (hi + 0.05) / (lo + 0.05)
}

// Mix like CSS color-mix(in srgb, a p%, b)
export function mix(a, b, p) {
  const ca = parseColor(a)
  const cb = parseColor(b)
  return toHex(ca.map((v, i) => v * p + cb[i] * (1 - p)))
}

// AA normal text 4.5, AA large text (>= 24px, or 18.66px bold) 3, AAA 7
export function rating(ratio) {
  if (ratio >= 7) return 'AAA'
  if (ratio >= 4.5) return 'AA'
  if (ratio >= 3) return 'AA Large'
  return 'Fail'
}
