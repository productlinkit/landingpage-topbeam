// All landing page copy lives here so sections stay layout-only.
// Values in [brackets] are placeholders the team fills before launch.
import telkomsel from './assets/logos/telkomsel.webp'
import byu from './assets/logos/byu.webp'
import indosat from './assets/logos/indosat.webp'
import im3 from './assets/logos/im3.webp'
import tri from './assets/logos/tri.webp'
import xl from './assets/logos/xl.webp'
import axis from './assets/logos/axis.webp'
import smartfren from './assets/logos/smartfren.webp'
import gopay from './assets/logos/gopay.webp'
import ovo from './assets/logos/ovo.webp'
import dana from './assets/logos/dana.webp'
import shopeepay from './assets/logos/shopeepay.webp'
import qris from './assets/logos/qris.webp'
import ebbm from './assets/logos/ebbm.webp'

export const NAV = [
  { id: 'produk', label: 'Produk' },
  { id: 'cara-kerja', label: 'Cara kerja' },
  { id: 'faq', label: 'Tanya jawab' },
]

export const HEADER = {
  home: 'Topbeam, kembali ke atas',
  cta: 'Chat Nova',
}

// Fixed parts of the WhatsApp-style phone mockup
export const PHONE = {
  name: 'Topbeam',
  sub: 'Nova · akun bisnis resmi',
  placeholder: 'Ketik pesan',
}

export const COMPOSER = {
  pick: 'Pilih kebutuhan',
  send: 'Kirim di WhatsApp',
  sendLabel: (text) => `Kirim pesan "${text}" ke Nova di WhatsApp`,
}

// Composer chips in the hero and final CTA. `cta` is the key in config.CTA,
// `text` is what the visitor sees typed in the pill.
export const INTENTS = [
  { id: 'pulsa', label: 'Pulsa', cta: 'pulsa', text: 'Halo Nova, saya mau beli pulsa' },
  { id: 'data', label: 'Paket data', cta: 'data', text: 'Halo Nova, saya mau beli paket data' },
  { id: 'ewallet', label: 'E-wallet', cta: 'ewallet', text: 'Halo Nova, saya mau top up e-wallet' },
  { id: 'ebbm', label: 'e-BBM', cta: 'ebbm', text: 'Halo Nova, saya mau beli e-BBM' },
]

export const HERO = {
  title: 'Isi ulang, semudah chat.',
  sub: 'Pulsa, kuota, e-wallet, dan e-BBM. Semua lewat WhatsApp.',
  phoneLabel: 'Contoh chat membeli kuota untuk ibu lewat Nova di WhatsApp',
  chat: [
    { from: 'me', text: 'Nova, kuota 10GB buat nomor ibu ya' },
    {
      from: 'nova',
      text: 'Baik, Kak Rina. Paket 10GB untuk 0812-xxxx-7890 (Telkomsel). Total tampil sebelum bayar. Balas YA untuk lanjut.',
    },
    { from: 'me', text: 'YA' },
    { from: 'nova', text: 'Pembayaran berhasil. Kuota sudah masuk ke nomor Ibu.', ok: true },
  ],
}

export const INTRO = {
  before: 'Tanpa unduh aplikasi. Topbeam menyatukan',
  a: 'pulsa & kuota',
  mid: 'untuk HP dan',
  b: 'e-wallet & e-BBM',
  after: 'untuk dompet dalam satu chat. Anda tinggal sebut, Nova yang siapkan.',
}

export const OPERATORS = [
  { name: 'Telkomsel', src: telkomsel },
  { name: 'by.U', src: byu },
  { name: 'Indosat', src: indosat },
  { name: 'IM3', src: im3 },
  { name: 'Tri', src: tri },
  { name: 'XL', src: xl },
  { name: 'AXIS', src: axis },
  { name: 'Smartfren', src: smartfren },
]

export const WALLETS = [
  { name: 'GoPay', src: gopay },
  { name: 'OVO', src: ovo },
  { name: 'DANA', src: dana },
  { name: 'ShopeePay', src: shopeepay },
  { name: 'QRIS', src: qris },
  { name: 'e-BBM', src: ebbm },
]

// The two "story" blocks: a big uppercase title with a slot, a phone, and short lines around it.
export const STORIES = [
  {
    id: 'produk',
    title: ['Isi ulang', 'semua nomor'],
    slot: { line: 0, icon: 'phone', color: 'var(--lilac)' },
    label: 'Pulsa & paket data',
    lines: [
      'Sebut nominal atau kuota. Operator terdeteksi otomatis dari nomor.',
      'Harian, mingguan, bulanan. Sebut budget, Nova carikan yang pas.',
    ],
    logos: 'operators',
    cta: { key: 'pulsa', label: 'Beli pulsa' },
    chat: [
      { from: 'me', text: 'Kuota buat seminggu, budget 30 ribu' },
      {
        from: 'nova',
        text: 'Ada 3 paket mingguan Telkomsel di bawah Rp30.000 untuk nomor Anda. Balas angka untuk memilih.',
        options: ['1', '2', '3'],
      },
      { from: 'me', text: '2' },
      { from: 'nova', text: 'Paket 7GB · 7 hari, Rp27.500. Balas YA untuk lanjut.' },
    ],
  },
  {
    id: 'ewallet',
    title: ['Top up', 'semua dompet'],
    slot: { line: 0, icon: 'wallet', color: 'var(--sky)' },
    label: 'E-wallet & e-BBM',
    lines: [
      'GoPay, OVO, DANA, dan ShopeePay. Untuk Anda atau keluarga.',
      'Saldo e-BBM digital, siap dipakai di SPBU yang menerima.',
    ],
    logos: 'wallets',
    cta: { key: 'ewallet', label: 'Top up e-wallet' },
    chat: [
      { from: 'me', text: 'Top up GoPay 100rb ke nomor saya' },
      {
        from: 'nova',
        text: 'Top up GoPay Rp100.000 ke 0812-xxxx-7890. Total tampil sebelum bayar. Balas YA untuk lanjut.',
      },
      { from: 'me', text: 'YA' },
      { from: 'nova', text: 'Saldo GoPay sudah masuk. Bukti transaksi terlampir.', ok: true },
    ],
  },
]

export const WHY = {
  title: 'Kenapa orang memilih Topbeam',
  points: [
    {
      kind: 'chat',
      title: 'Chat seperti biasa.',
      body: 'Ceritakan kebutuhan dengan bahasa sehari-hari. Tidak perlu hafal kode atau menu.',
    },
    {
      kind: 'products',
      title: 'Satu chat, semua kebutuhan.',
      body: 'Pulsa, paket data, e-wallet, dan e-BBM tersedia dalam satu percakapan WhatsApp.',
    },
    {
      kind: 'confirm',
      title: 'Cek dulu, baru setuju.',
      body: 'Produk, nomor tujuan, dan total tampil lebih dulu. Tidak ada pembayaran sebelum Anda membalas YA.',
    },
    {
      kind: 'refund',
      title: 'Gagal? Dana kembali.',
      body: 'Jika transaksi gagal, dana dikembalikan otomatis dan Nova langsung mengabari di chat.',
    },
  ],
  // Copy inside the small illustrations, one entry per point `kind`. The total is an example price.
  demo: {
    total: 'Rp51.500',
    chat: {
      me: 'pulsa 50 ribu ke nomor adik',
      nova: 'Siap, Kak. Pulsa Rp50.000 untuk Adik (Telkomsel). Balas YA untuk lanjut.',
    },
    products: [
      { icon: 'phone', label: 'Pulsa' },
      { icon: 'wifi', label: 'Paket data' },
      { icon: 'wallet', label: 'E-wallet' },
      { icon: 'fuel', label: 'e-BBM' },
    ],
    confirm: {
      title: 'Rincian pesanan',
      rows: [
        { label: 'Produk', value: 'Pulsa Rp50.000' },
        { label: 'Nomor', value: '0813-xxxx-4521' },
        { label: 'Operator', value: 'Telkomsel' },
      ],
      totalLabel: 'Total',
      yes: 'Balas YA untuk lanjut',
    },
    refund: { fail: 'Transaksi gagal', back: 'Dana kembali' },
  },
}

export const HOW = {
  title: 'Cara kerjanya',
  lead: 'Lima langkah, semuanya di satu chat.',
  step: (n) => `Langkah ${n}`,
  railLabel: 'Langkah cara kerja',
  prev: 'Langkah sebelumnya',
  next: 'Langkah berikutnya',
  steps: [
    { icon: 'chat', tint: 'var(--lilac)', title: 'Chat Nova', body: 'Tulis seperti biasa, misalnya "pulsa 50 ribu ke nomor adik".' },
    { icon: 'receipt', tint: 'var(--sky)', title: 'Cek rincian', body: 'Nova menampilkan produk, nomor tujuan, operator, dan total harga.' },
    { icon: 'check', tint: 'var(--sand)', title: 'Balas YA', body: 'Pesanan baru diproses setelah Anda menyetujui. Salah nomor? Tinggal koreksi.' },
    { icon: 'qr', tint: 'var(--mint)', title: 'Bayar', body: 'Pakai QRIS dari bank atau e-wallet apa pun, atau virtual account. Tautan berlaku 15 menit.' },
    { icon: 'badge', tint: 'var(--lilac)', title: 'Selesai', body: 'Isi ulang masuk dan bukti transaksi dikirim di chat yang sama.' },
  ],
}

export const FAMILY = {
  title: ['Kirim ke', 'keluarga'],
  slot: { line: 0, icon: 'users', color: 'var(--sand)' },
  lead: 'Beda kota, tetap bisa bantu. Sebut nama seperti "Ibu" atau "Adik", Nova ingat nomornya.',
  pick: 'Pilih anggota keluarga',
  cta: 'Isi ulang untuk keluarga',
  contacts: [
    { id: 'ibu', name: 'Ibu', place: 'Solo', number: '0812-xxxx-7890', operator: 'Telkomsel', product: 'Pulsa Rp50.000', ask: 'Nova, pulsa 50 ribu ke Ibu ya' },
    { id: 'adik', name: 'Adik', place: 'Bandung', number: '0857-xxxx-3312', operator: 'Indosat', product: 'Kuota 10GB', ask: 'Kuota 10GB buat Adik' },
    { id: 'ayah', name: 'Ayah', place: 'Medan', number: '0819-xxxx-5521', operator: 'XL', product: 'Pulsa Rp25.000', ask: 'Pulsa 25 ribu ke Ayah' },
  ],
  chat: (c) => [
    { from: 'me', text: c.ask },
    { from: 'nova', text: `${c.product} untuk ${c.name} (${c.number}, ${c.operator}). Total tampil sebelum bayar. Balas YA untuk lanjut.` },
    { from: 'me', text: 'YA' },
    { from: 'nova', text: `${c.product} sudah masuk ke nomor ${c.name}.`, ok: true },
  ],
}

export const SAFETY = {
  lead: 'Nova tidak pernah meminta',
  strong: 'PIN, OTP, atau kata sandi.',
  points: [
    { icon: 'badge', title: 'Akun resmi', body: 'Pastikan nama akun yang Anda hubungi adalah Topbeam dengan tanda centang terverifikasi.' },
    { icon: 'shield', title: 'Rincian di depan', body: 'Periksa produk, nomor tujuan, dan total sebelum mengonfirmasi pembayaran.' },
    { icon: 'building', title: 'Perusahaan terdaftar', body: 'Topbeam dikelola oleh PT LinkIT360, Jakarta, sesuai UU Perlindungan Data Pribadi.' },
  ],
}

export const FAQ = {
  title: 'Tanya jawab',
  more: 'Belum terjawab? Tanyakan langsung ke Nova.',
  cta: 'Chat Nova',
}

export const FAQS = [
  { q: 'Apakah saya perlu mengunduh aplikasi?', a: 'Tidak. Topbeam berjalan sepenuhnya di WhatsApp. Cukup klik tombol Chat Nova atau simpan nomor resmi kami.' },
  { q: 'Metode pembayaran apa saja yang tersedia?', a: 'QRIS dari aplikasi bank atau e-wallet apa pun, serta virtual account bank. Tautan pembayaran berlaku 15 menit.' },
  { q: 'Berapa lama pulsa atau kuota masuk?', a: 'Setelah pembayaran berhasil, Nova mengirimkan status transaksi di chat. Lama proses dapat bergantung pada operator.' },
  { q: 'Bagaimana jika transaksi gagal?', a: 'Dana dikembalikan otomatis dan Nova mengirim kabar di chat yang sama. Ketik "status" kapan saja untuk cek pesanan.' },
  { q: 'Bisakah membeli untuk nomor orang lain?', a: 'Bisa. Sebutkan nomor tujuannya, atau simpan dengan nama seperti "Ibu" agar pesanan berikutnya lebih cepat.' },
  { q: 'Apakah ada biaya tambahan?', a: 'Tidak ada biaya chat. Harga yang Nova tampilkan sebelum pembayaran adalah total yang Anda bayar.' },
  { q: 'Apakah data saya aman?', a: 'Kami hanya menyimpan nomor WhatsApp, nomor tujuan yang Anda simpan, dan riwayat pesanan, sesuai Kebijakan Privasi dan UU PDP. Anda bisa meminta penghapusan data kapan saja.' },
  { q: 'Bagaimana cara membedakan akun resmi Topbeam?', a: 'Akun resmi bernama "Topbeam" dengan tanda centang terverifikasi. Nova tidak pernah meminta PIN, OTP, atau kata sandi.' },
]

export const FINAL = {
  title: 'Kuota menipis? Chat Nova sekarang.',
  sub: 'Buka WhatsApp, pilih kebutuhan, selesai dalam satu chat.',
}

export const FOOTER = {
  tagline: 'Isi ulang pulsa, kuota, e-wallet, dan e-BBM. Cukup lewat chat WhatsApp.',
  cta: 'Chat Nova',
  cols: [
    {
      title: 'Produk',
      links: [
        { label: 'Pulsa', cta: 'pulsa' },
        { label: 'Paket data', cta: 'data' },
        { label: 'E-wallet', cta: 'ewallet' },
        { label: 'e-BBM', cta: 'ebbm' },
      ],
    },
    {
      title: 'Bantuan',
      links: [
        { label: 'Cara kerja', href: '#cara-kerja' },
        { label: 'Tanya jawab', href: '#faq' },
        { label: 'Layanan pengaduan', href: '#pengaduan' },
      ],
    },
  ],
  notes: [
    { icon: 'lock', text: 'Nova tidak pernah meminta PIN, OTP, atau kata sandi.' },
    { icon: 'badge', text: 'Akun resmi: Topbeam dengan centang terverifikasi.' },
  ],
  pay: 'Bayar dengan',
  payVa: 'Virtual account',
  legalLinks: [
    { label: 'Kebijakan privasi', href: '#privasi' },
    { label: 'Syarat & ketentuan', href: '#syarat' },
    { label: 'Pengembalian dana', href: '#refund' },
  ],
  legal: '© 2026 PT LinkIT360, Jakarta. Topbeam adalah layanan milik PT LinkIT360.',
}
