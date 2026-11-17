// Facts shown outside the chat replays: the decision log beside each replay and the price
// examples. Every product, price and count here comes from the 12 Nov 2026 transcripts in
// ./transcripts.js, and tests/facts.test.mjs checks that it still does.
// Keep this file free of imports: tests read it with plain Node.

// Decision log per replay. `state`: done (checked) | wait (Nova is waiting on the user).
// `step` is the index in TRANSCRIPTS[id].steps the row explains.
export const DECISIONS = {
  pulsa: {
    title: 'Pulsa Telkomsel 25.000',
    status: { tone: 'wait', label: 'Menunggu pembayaran QRIS' },
    rows: [
      { step: 0, state: 'done', title: 'Permintaan diterima', detail: '"Halo Nova, saya mau beli pulsa"' },
      { step: 1, state: 'done', title: 'Nomor tujuan ditanyakan', detail: 'Nomor di chat ini atau nomor lain' },
      { step: 3, state: 'done', title: 'Operator terdeteksi', detail: 'Telkomsel, dibaca dari nomor tujuan' },
      { step: 3, state: 'done', title: 'Pilihan dikirim', detail: '12 produk beserta harganya', count: 12 },
      { step: 5, state: 'done', title: 'Rincian dirangkum', detail: 'Rp 25.297, sudah termasuk biaya QRIS', price: 'Rp 25.297' },
      { step: 6, state: 'done', title: 'Persetujuan diterima', detail: 'Pengguna membalas "ya"' },
      { step: 7, state: 'wait', title: 'QRIS dikirim', detail: 'Kode berlaku 15 menit' },
    ],
    why: 'Kode QRIS baru dibuat setelah pengguna membalas "ya". Sebelum itu tidak ada tagihan apa pun.',
  },
  data: {
    title: 'Telkomsel Flash 8GB / 30 Hari',
    status: { tone: 'wait', label: 'Menunggu balasan YA' },
    rows: [
      { step: 0, state: 'done', title: 'Permintaan diterima', detail: '"Halo Nova, saya mau beli paket data"' },
      { step: 1, state: 'done', title: 'Nomor tujuan ditanyakan', detail: 'Nomor di chat ini atau nomor lain' },
      { step: 3, state: 'done', title: 'Operator terdeteksi', detail: 'Telkomsel, dibaca dari nomor tujuan' },
      { step: 3, state: 'done', title: 'Pilihan dikirim', detail: '13 paket data beserta harganya', count: 13 },
      { step: 5, state: 'done', title: 'Rincian dirangkum', detail: 'Rp 44.921, sudah termasuk biaya QRIS', price: 'Rp 44.921' },
      { step: 5, state: 'wait', title: 'Menunggu persetujuan', detail: 'Belum ada QRIS sebelum pengguna membalas YA' },
    ],
    why: 'Nova berhenti di rincian dan menunggu. Produk, nomor, dan harga bisa dikoreksi tanpa ada uang yang keluar.',
  },
  ewallet: {
    title: 'Top up DANA 50.000',
    status: { tone: 'wait', label: 'Menunggu balasan YA' },
    rows: [
      { step: 0, state: 'done', title: 'Permintaan diterima', detail: '"Halo Nova, saya mau top up e-wallet"' },
      { step: 1, state: 'done', title: 'Nomor tujuan ditanyakan', detail: 'Nomor di chat ini atau nomor lain' },
      { step: 3, state: 'done', title: 'Pilihan dikirim', detail: '15 nominal: DANA, GoPay, dan OVO', count: 15 },
      { step: 4, state: 'done', title: 'Produk dipilih', detail: 'DANA 50.000' },
      { step: 5, state: 'done', title: 'Rincian dirangkum', detail: 'Rp 52.061, sudah termasuk biaya QRIS', price: 'Rp 52.061' },
      { step: 5, state: 'wait', title: 'Menunggu persetujuan', detail: 'Belum ada QRIS sebelum pengguna membalas YA' },
    ],
    why: 'Pengguna bertanya e-wallet apa saja yang tersedia, dan Nova menjawab dengan daftar lengkap sebelum meminta pilihan.',
  },
  ebbm: {
    title: 'E-Voucher MyPertamina 50.000',
    status: { tone: 'wait', label: 'Menunggu balasan YA' },
    rows: [
      { step: 0, state: 'done', title: 'Permintaan diterima', detail: '"Halo Nova, saya mau beli e-BBM"' },
      { step: 1, state: 'done', title: 'Nomor tujuan ditanyakan', detail: 'Nomor di chat ini atau nomor lain' },
      { step: 3, state: 'done', title: 'Pilihan dikirim', detail: '4 nominal E-Voucher MyPertamina', count: 4 },
      { step: 4, state: 'done', title: 'Produk dipilih', detail: 'E-Voucher MyPertamina 50.000' },
      { step: 5, state: 'done', title: 'Rincian dirangkum', detail: 'Rp 52.375, sudah termasuk biaya QRIS', price: 'Rp 52.375' },
      { step: 5, state: 'wait', title: 'Menunggu persetujuan', detail: 'Belum ada QRIS sebelum pengguna membalas YA' },
    ],
    why: 'Setiap nominal dikirim beserta harganya, jadi total yang dibayar sudah terlihat sebelum memilih.',
  },
}

// Price examples for the pricing section: one real product per category, as Nova quoted it.
export const PRICES = [
  {
    id: 'pulsa',
    tag: 'Pulsa',
    icon: 'phone',
    product: 'Telkomsel 25.000',
    price: 'Rp 25.297',
    points: ['Operator terdeteksi dari nomor', '8 operator dalam satu chat', 'Alur lengkap sampai kode QRIS'],
    cta: 'pulsa',
    label: 'Beli pulsa',
  },
  {
    id: 'data',
    tag: 'Paket data',
    icon: 'wifi',
    product: 'Telkomsel Flash 8GB / 30 Hari',
    price: 'Rp 44.921',
    points: ['Harian sampai bulanan', 'Pilihan paket dengan harga', 'Konfirmasi sebelum bayar'],
    cta: 'data',
    label: 'Beli paket data',
  },
  {
    id: 'ewallet',
    tag: 'E-wallet',
    icon: 'wallet',
    product: 'DANA 50.000',
    price: 'Rp 52.061',
    points: ['DANA, GoPay, dan OVO', 'Mulai Rp10.000', 'Untuk Anda atau keluarga'],
    cta: 'ewallet',
    label: 'Top up e-wallet',
  },
  {
    id: 'ebbm',
    tag: 'e-BBM',
    icon: 'fuel',
    product: 'E-Voucher MyPertamina 50.000',
    price: 'Rp 52.375',
    points: ['Rp25.000 sampai Rp200.000', '4 pilihan nominal', 'Konfirmasi sebelum bayar'],
    cta: 'ebbm',
    label: 'Beli e-BBM',
  },
]
