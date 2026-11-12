import { test } from 'node:test'
import assert from 'node:assert/strict'
import { CTA, waLink, waText } from '../src/config.js'

const BASE = 'https://wa.me/6285187976622?text='
const decode = (href) => decodeURIComponent(href.slice(BASE.length))

test('every fixed CTA link opens the official number with exactly its message, no bracket tag', () => {
  for (const key of Object.keys(CTA)) {
    const href = waLink(key)
    assert.ok(href.startsWith(BASE), `${key}: ${href}`)
    assert.equal(decode(href), CTA[key], key)
    assert.doesNotMatch(decode(href), /\[.*\]/, key)
  }
})

test('free-text composer link sends the text as typed', () => {
  assert.equal(decode(waText('Halo Nova, saya mau beli pulsa')), 'Halo Nova, saya mau beli pulsa')
})

test('CTA keys cover every button on the page', () => {
  for (const key of ['nav', 'hero', 'pulsa', 'data', 'ewallet', 'ebbm', 'keluarga', 'faq', 'footer']) {
    assert.ok(key in CTA, key)
  }
})
