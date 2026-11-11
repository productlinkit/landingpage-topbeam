import { test } from 'node:test'
import assert from 'node:assert/strict'
import { CTA, waLink, waText } from '../src/config.js'

const BASE = 'https://wa.me/6285187976622?text='
const decode = (href) => decodeURIComponent(href.slice(BASE.length))

test('every fixed CTA link carries its own [LP-key] tag', () => {
  for (const key of Object.keys(CTA)) {
    const href = waLink(key)
    assert.ok(href.startsWith(BASE), `${key}: ${href}`)
    assert.ok(decode(href).endsWith(`[LP-${key}]`), `${key}: ${decode(href)}`)
  }
})

test('free-text composer link appends the given tag', () => {
  assert.equal(decode(waText('Halo Nova, saya mau beli pulsa', 'hero')), 'Halo Nova, saya mau beli pulsa [LP-hero]')
})

test('CTA keys cover the plan tag list', () => {
  for (const key of ['nav', 'hero', 'pulsa', 'data', 'ewallet', 'ebbm', 'keluarga', 'faq', 'footer']) {
    assert.ok(key in CTA, key)
  }
})
