// Reads the real token values from src/styles/globals.css and fails if any text/background pair
// the site uses drops below WCAG AA, if a button is filled with a gradient, or if
// the page drifts into decorative noise: hardcoded colors, any gradient other than the beam,
// glass blur outside the header, colored glow tokens.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { extname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { contrastRatio, parseColor } from '../src/lib/contrast.js'

const css = readFileSync(new URL('../src/styles/globals.css', import.meta.url), 'utf8')

function block(selector) {
  const start = css.indexOf(selector)
  assert.ok(start >= 0, `missing ${selector} in globals.css`)
  const open = css.indexOf('{', start)
  return css.slice(open + 1, css.indexOf('\n}', open))
}

// token -> hex, following var() chains (semantic -> scale)
const raw = {}
for (const [, name, value] of block(':root {').matchAll(/(--[\w-]+):\s*([^;]+);/g)) raw[name] = value.trim()
const t = (name, depth = 0) => {
  const v = raw[name]
  assert.ok(v !== undefined, `token ${name} is not defined`)
  const m = v.match(/^var\((--[\w-]+)\)$/)
  return m && depth < 5 ? t(m[1], depth + 1) : v
}

const LIGHT_BG = [
  '--color-bg',
  '--color-bg-alt',
  '--color-surface',
  '--color-surface-sunken',
  '--color-surface-brand',
  '--color-surface-brand-strong',
  '--color-surface-highlight',
]
const LIGHT_TEXT = [
  '--color-text',
  '--color-text-muted',
  '--color-text-brand',
  '--color-link',
  '--color-success',
  '--color-warning',
  '--color-error',
  '--color-highlight-text',
  '--color-violet-text',
]
const INK_BG = ['--color-ink', '--color-ink-surface', '--color-ink-raised']
const INK_TEXT = [
  '--color-on-ink',
  '--color-on-ink-muted',
  '--color-accent-on-ink',
  '--color-success-on-ink',
  '--color-warning-on-ink',
  '--color-highlight',
]

test('every semantic color resolves to a real color', () => {
  const all = [...LIGHT_BG, ...LIGHT_TEXT, ...INK_BG, ...INK_TEXT]
  for (const k of [...all, '--color-accent', '--color-accent-hover', '--color-on-accent', '--color-on-highlight'])
    assert.ok(parseColor(t(k)), `${k} = ${t(k)}`)
})

for (const fg of LIGHT_TEXT)
  for (const bg of LIGHT_BG)
    test(`${fg} on ${bg} >= 4.5`, () => {
      const r = contrastRatio(t(fg), t(bg))
      assert.ok(r >= 4.5, `${fg} ${t(fg)} on ${bg} ${t(bg)} is ${r.toFixed(2)}:1`)
    })

for (const fg of INK_TEXT)
  for (const bg of INK_BG)
    test(`${fg} on ${bg} >= 4.5`, () => {
      const r = contrastRatio(t(fg), t(bg))
      assert.ok(r >= 4.5, `${fg} ${t(fg)} on ${bg} ${t(bg)} is ${r.toFixed(2)}:1`)
    })

test('CTA text on the accent (and its hover) >= 4.5', () => {
  for (const bg of ['--color-accent', '--color-accent-hover']) {
    const r = contrastRatio(t('--color-on-accent'), t(bg))
    assert.ok(r >= 4.5, `${bg} is ${r.toFixed(2)}:1`)
  }
  assert.ok(contrastRatio(t('--color-on-highlight'), t('--color-highlight')) >= 4.5)
})

test('the CTA stands out as a component on every background (>= 3:1, WCAG 1.4.11)', () => {
  for (const bg of ['--color-bg', '--color-bg-alt', '--color-surface', '--color-surface-brand', '--color-ink']) {
    const r = contrastRatio(t('--color-accent'), t(bg))
    assert.ok(r >= 3, `accent on ${bg} is ${r.toFixed(2)}:1`)
  }
})

// cards may be pure white (pearl-0); page backgrounds and text never are raw black/white
test('no raw black or white as page background or text', () => {
  for (const k of ['--color-bg', '--color-bg-alt', '--color-text', '--color-on-ink', '--color-ink'])
    assert.ok(!['#000000', '#ffffff', '#000', '#fff'].includes(t(k).toLowerCase()), `${k} is ${t(k)}`)
})

test("action blue is the mascot's ear-cup blue (sampled from the artwork)", () => {
  assert.equal(t('--color-accent'), '#0f5bea')
})

// buttons are one solid colour: the beam never fills a button
test('no button uses a gradient', () => {
  for (const [f, src] of sources) {
    const rules = src.match(/[^{}]*(btn|composer-send)[^{}]*\{[^}]*\}/g) || []
    for (const r of rules) assert.doesNotMatch(r, /gradient/, `${f}: ${r.trim().split('\n')[0]}`)
    if (f.replace(/\\/g, '/').endsWith('ds/Button.jsx')) assert.doesNotMatch(src, /bg-beam/, f)
  }
})

// ---- anti-noise rules, checked over the source ----
const SRC = fileURLToPath(new URL('../src/', import.meta.url))
const files = []
const walk = (d) => {
  for (const n of readdirSync(d)) {
    const p = join(d, n)
    if (statSync(p).isDirectory()) walk(p)
    else if (['.css', '.jsx', '.js'].includes(extname(p))) files.push(p)
  }
}
walk(SRC)
const sources = files
  .filter((f) => !f.replace(/\\/g, '/').endsWith('styles/globals.css'))
  .map((f) => [f, readFileSync(f, 'utf8')])

test('no hardcoded colors outside the token file', () => {
  for (const [f, s] of sources) {
    const hits = (s.match(/#[0-9a-fA-F]{6}\b|#[0-9a-fA-F]{3}\b|rgba?\(\s*\d/g) || []).filter((h) => h !== '#000')
    assert.deepEqual(hits, [], f)
  }
})

test('the beam is the only gradient token, and components never invent their own', () => {
  // the phone mock (device-*) copies real hardware; everything else may only use the beam
  const grads = [...css.matchAll(/(--[\w-]+):\s*[^;]*-gradient\(/g)].map((m) => m[1]).filter((n) => !/^--device-/.test(n))
  assert.deepEqual(grads, ['--beam-gradient'])
  for (const [f, s] of sources) {
    // allowed: alpha masks (black/transparent stops only), the phone mock (device tokens),
    // and Nova's neutral floor shadow
    const isMask = (x) => !/var\(--color|var\(--blue|var\(--gold/.test(x) && /#000|transparent/.test(x) && !/rgb/.test(x)
    const g = (s.match(/(linear|radial)-gradient\([^;]*/g) || []).filter(
      (x) => !isMask(x) && !/device-lens|shadow-rgb/.test(x),
    )
    assert.deepEqual(g, [], f)
  }
})

test('glass blur only on the scrolled header, no glow tokens', () => {
  for (const [f, s] of sources) {
    if (!f.replace(/\\/g, '/').endsWith('sections/Header.css')) assert.doesNotMatch(s, /backdrop-filter|backdrop-blur/, f)
    assert.doesNotMatch(s, /shadow-glow|--glow-/, f)
  }
})
