import { test } from 'node:test'
import assert from 'node:assert/strict'
import { TRANSCRIPTS } from '../src/data/transcripts.js'
import { DECISIONS, PRICES } from '../src/data/facts.js'

const allText = (t) => t.steps.flatMap((s) => [s.text ?? '', ...(s.list ?? []), s.tail ?? '']).join('\n')

test('every decision log belongs to a real replay and points at existing steps', () => {
  for (const [id, d] of Object.entries(DECISIONS)) {
    const t = TRANSCRIPTS[id]
    assert.ok(t, id)
    for (const r of d.rows) assert.ok(r.step >= 0 && r.step < t.steps.length, `${id}: step ${r.step}`)
  }
  assert.deepEqual(Object.keys(DECISIONS).sort(), Object.keys(TRANSCRIPTS).sort())
})

test('log counts match the number of options Nova actually sent', () => {
  for (const [id, d] of Object.entries(DECISIONS))
    for (const r of d.rows.filter((r) => r.count))
      assert.equal(TRANSCRIPTS[id].steps[r.step].list.length, r.count, `${id}: ${r.title}`)
})

test('log prices are the ones in Nova confirmation messages', () => {
  for (const [id, d] of Object.entries(DECISIONS))
    for (const r of d.rows.filter((r) => r.price))
      assert.ok(
        TRANSCRIPTS[id].steps[r.step].text.includes(`Harga: ${r.price} (sudah termasuk biaya QRIS)`),
        `${id}: ${r.price}`,
      )
})

test('only the pulsa log claims a QRIS was sent, matching the only replay that reached it', () => {
  const sent = Object.entries(DECISIONS).filter(([, d]) => d.rows.some((r) => /QRIS dikirim/.test(r.title))).map(([id]) => id)
  assert.deepEqual(sent, ['pulsa'])
})

test('every price example is a product and price Nova quoted in the replays', () => {
  for (const p of PRICES) {
    const text = allText(TRANSCRIPTS[p.id])
    assert.ok(text.includes(`Produk: ${p.product}`), `${p.id}: ${p.product}`)
    assert.ok(text.includes(`Harga: ${p.price} (sudah termasuk biaya QRIS)`), `${p.id}: ${p.price}`)
  }
})
