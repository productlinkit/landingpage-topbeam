import { test } from 'node:test'
import assert from 'node:assert/strict'
import { TRANSCRIPTS } from '../src/data/transcripts.js'

const texts = (t) => t.steps.flatMap((s) => [s.text ?? '', ...(s.list ?? []), s.tail ?? ''])

test('pulsa replay ends with the real confirmation, then QRIS and receipt cards', () => {
  const { steps, date } = TRANSCRIPTS.pulsa
  assert.equal(date, '2026-11-11')
  assert.equal(steps.length, 8)
  assert.equal(steps[5].from, 'nova')
  assert.match(steps[5].text, /Rp 25\.297 \(sudah termasuk biaya QRIS\)/)
  assert.deepEqual(
    steps.slice(6).map((s) => [s.from, s.card]),
    [
      ['card', 'qris'],
      ['card', 'receipt'],
    ],
  )
})

test('no transcript leaks the tester phone number', () => {
  for (const t of Object.values(TRANSCRIPTS)) for (const s of texts(t)) assert.doesNotMatch(s, /62812\d{6,}|0812\d{6,}/)
})

test('e-wallet replay lists the wallets Nova offered on 9 Nov', () => {
  const list = TRANSCRIPTS.ewallet.steps.find((s) => s.list)?.list
  assert.deepEqual(list, ['DANA', 'GoPay', 'OVO', 'ShopeePay', 'LinkAja'])
  assert.equal(TRANSCRIPTS.ewallet.date, '2026-11-09')
})

test('paket data replay keeps real prices', () => {
  const list = TRANSCRIPTS.data.steps.find((s) => s.list)?.list ?? []
  assert.ok(list.includes('Telkomsel Flash 8GB / 30 Hari - Rp 44.921'))
})
