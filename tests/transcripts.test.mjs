import { test } from 'node:test'
import assert from 'node:assert/strict'
import { TRANSCRIPTS } from '../src/data/transcripts.js'

const texts = (t) => t.steps.flatMap((s) => [s.text ?? '', ...(s.list ?? []), s.tail ?? ''])

test('every replay comes from the 12 Nov live test', () => {
  for (const t of Object.values(TRANSCRIPTS)) assert.equal(t.date, '2026-11-12')
})

test('pulsa replay: confirmation, YA, Nova QRIS message, then the QRIS card', () => {
  const { steps } = TRANSCRIPTS.pulsa
  assert.equal(steps.length, 9)
  assert.match(steps[5].text, /Rp 25\.297 \(sudah termasuk biaya QRIS\)/)
  assert.deepEqual([steps[6].from, steps[6].text], ['me', 'ya'])
  assert.match(steps[7].text, /^Berikut QRIS untuk transaksi pulsa Telkomsel 25\.000/)
  assert.deepEqual([steps[8].from, steps[8].card], ['card', 'qris'])
})

test('only the pulsa replay shows a QRIS card, and no replay shows anything after payment', () => {
  const cards = Object.values(TRANSCRIPTS).flatMap((t) => t.steps.filter((s) => s.from === 'card').map((s) => [t.id, s.card]))
  assert.deepEqual(cards, [['pulsa', 'qris']])
})

test('no replay prints the buggy QRIS expiry line', () => {
  for (const t of Object.values(TRANSCRIPTS)) for (const s of texts(t)) assert.doesNotMatch(s, /Kadaluarsa/i)
})

test('no transcript leaks the tester phone number or transaction ID', () => {
  for (const t of Object.values(TRANSCRIPTS))
    for (const s of texts(t)) assert.doesNotMatch(s, /62851\d{6,}|0851\d{6,}|62812\d{6,}|0812\d{6,}|LINKIT\d+/)
})

test('e-wallet replay lists the DANA, GoPay and OVO rows Nova offered', () => {
  const list = TRANSCRIPTS.ewallet.steps.find((s) => s.list)?.list ?? []
  assert.equal(list.length, 15)
  assert.ok(list.includes('DANA 50.000 - Rp 52.061'))
  assert.deepEqual([...new Set(list.map((r) => r.split(' ')[0]))], ['DANA', 'GOPAY', 'OVO'])
})

test('paket data replay keeps real prices', () => {
  const list = TRANSCRIPTS.data.steps.find((s) => s.list)?.list ?? []
  assert.ok(list.includes('Telkomsel Flash 8GB / 30 Hari - Rp 44.921'))
})

test('e-BBM replay lists the MyPertamina vouchers and ends at the real confirmation', () => {
  const { steps } = TRANSCRIPTS.ebbm
  const list = steps.find((s) => s.list)?.list ?? []
  assert.ok(list.includes('E-Voucher MyPertamina 50.000 - Rp 52.375'))
  assert.match(steps.at(-1).text, /Produk: E-Voucher MyPertamina 50\.000[\s\S]*Harga: Rp 52\.375/)
})
