import { test } from 'node:test'
import assert from 'node:assert/strict'
import { timeline, shortList } from '../src/lib/timeline.js'

const steps = [
  { from: 'me', text: 'Halo Nova, saya mau beli pulsa' },
  { from: 'nova', text: 'Baik, untuk pembelian pulsa, apakah nomor tujuan yang digunakan adalah nomor ini, atau nomor lain?' },
  { from: 'me', text: 'nomor ini' },
  { from: 'nova', text: 'Berikut pilihan pulsa', list: ['a', 'b', 'c'] },
  { from: 'card', card: 'qris' },
]

test('timeline times strictly increase and keep the step order', () => {
  const tl = timeline(steps)
  assert.deepEqual(
    tl.map((t) => t.index),
    [0, 1, 2, 3, 4],
  )
  for (let i = 1; i < tl.length; i++) assert.ok(tl[i].at > tl[i - 1].at, `step ${i}`)
})

test('Nova replies are preceded by typing, visitor messages are not', () => {
  const tl = timeline(steps)
  assert.deepEqual(
    tl.map((t) => t.typingBefore),
    [false, true, false, true, false],
  )
})

test('no gap exceeds max plus typing time', () => {
  const opts = { max: 1600, typing: 900 }
  const tl = timeline(steps, opts)
  for (let i = 1; i < tl.length; i++) assert.ok(tl[i].at - tl[i - 1].at <= opts.max + opts.typing)
})

test('reduced motion shows every step at once', () => {
  assert.ok(timeline(steps, { reduce: true }).every((t) => t.at === 0))
})

test('shortList keeps the first rows and marks the rest', () => {
  const twelve = Array.from({ length: 12 }, (_, i) => `row ${i}`)
  assert.deepEqual(shortList(twelve), ['row 0', 'row 1', 'row 2', 'row 3', '…'])
  assert.deepEqual(shortList(['a', 'b']), ['a', 'b'])
})
