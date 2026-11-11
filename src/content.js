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
  menuOpen: 'Buka menu',
  menuClose: 'Tutup menu',
}

// Fixed parts of the chat card (header, live label, the UI cards after Nova's confirmation)
export const CHAT = {
  name: 'Topbeam',
  sub: 'Nova · akun bisnis WhatsApp',
  live: 'online',
  cards: {
    qris: { kicker: 'Langkah berikutnya', title: 'Bayar dengan QRIS', sub: 'tautan berlaku 15 menit' },
    receipt: { kicker: 'Setelah bayar', title: 'Isi ulang diproses', sub: 'status dan bukti transaksi dikirim di chat yang sama' },
  },
}

// Temporary: still used by the old Phone mockup until Task 6 removes it.
export const PHONE = { name: 'Topbeam', sub: 'Nova · akun bisnis WhatsApp', placeholder: 'Ketik pesan' }

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
  title: 'Isi pulsa & kuota, cukup chat Nova.',
  sub: 'Tanpa unduh aplikasi baru. Ketik kebutuhan Anda di WhatsApp, Nova siapkan pesanannya, Anda tinggal bayar pakai QRIS.',
  note: 'Gratis chat. Anda hanya bayar produknya.',
  chatLabel: 'Percakapan asli dengan Nova: membeli pulsa Telkomsel Rp25.000 untuk nomor sendiri',
  // Floating facts around Nova, taken from the 11 Nov 2026 test chat
  pills: [
    { icon: 'phone', title: 'Telkomsel terdeteksi', sub: 'otomatis dari nomor Anda' },
    { icon: 'receipt', title: 'Rp 25.297', sub: 'sudah termasuk biaya QRIS' },
  ],
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
      { from: 'me', text: 'Halo Nova, saya mau beli pulsa' },
      { from: 'nova', text: 'Tentu. Apakah Anda ingin menggunakan nomor di chat ini, atau nomor lain?' },
      { from: 'me', text: 'Nomor ini saja' },
      {
        from: 'nova',
        text: 'Nomor Anda terdeteksi Telkomsel. Silakan pilih nominal pulsa:',
        options: ['25rb', '50rb', '100rb'],
      },
      { from: 'me', text: 'Telkomsel 50.000' },
      { from: 'nova', text: 'Konfirmasi: Telkomsel Rp50.000, harga Rp52.061 (sudah termasuk biaya QRIS). Apakah sudah benar?' },
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
      { from: 'me', text: 'Halo Nova, saya mau top up e-wallet' },
      { from: 'nova', text: 'Untuk top up e-wallet, apakah Anda ingin menggunakan nomor di chat ini, atau nomor lain?' },
      { from: 'me', text: 'Nomor ini' },
      {
        from: 'nova',
        text: 'Berikut e-wallet yang tersedia: DANA, GoPay, OVO, ShopeePay, LinkAja. Silakan pilih e-wallet yang ingin di-top up.',
      },
    ],
  },
]

export const WHY = {
  title: 'Kenapa orang memilih Topbeam',
  lead: 'Dibuat supaya isi ulang terasa seperti chat biasa: jelas, cepat, dan tanpa kejutan.',
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
  count: (n, total) => `Langkah ${n} dari ${total}`,
  // Copy inside the illustration panel of steps 3 to 5 (steps 1 and 2 reuse HERO.chat and WHY.demo.confirm)
  demo: {
    approve: { me: 'Ya, sudah benar', status: 'Pesanan disetujui. Lanjut ke pembayaran.' },
    pay: { title: 'Bayar dengan QRIS', expires: 'Tautan berlaku 15 menit', alt: 'atau virtual account bank' },
    done: { title: 'Transaksi berhasil', sub: 'Bukti transaksi dikirim di chat yang sama' },
  },
  steps: [
    { icon: 'chat', tint: 'var(--lilac)', title: 'Chat Nova', short: 'Tulis seperti biasa', body: 'Tulis seperti biasa, misalnya "pulsa 50 ribu ke nomor adik".' },
    { icon: 'receipt', tint: 'var(--sky)', title: 'Cek rincian', short: 'Produk dan total', body: 'Nova menampilkan produk, nomor tujuan, operator, dan total harga.' },
    { icon: 'check', tint: 'var(--gold)', title: 'Balas YA', short: 'Setujui pesanan', body: 'Pesanan baru diproses setelah Anda menyetujui. Salah nomor? Tinggal koreksi.' },
    { icon: 'qr', tint: 'var(--mint)', title: 'Bayar', short: 'QRIS atau VA', body: 'Pakai QRIS dari bank atau e-wallet apa pun, atau virtual account. Tautan berlaku 15 menit.' },
    { icon: 'badge', tint: 'var(--lilac)', title: 'Selesai', short: 'Bukti di chat', body: 'Isi ulang masuk dan bukti transaksi dikirim di chat yang sama.' },
  ],
}

export const FAMILY = {
  title: ['Kirim ke', 'keluarga'],
  slot: { line: 0, icon: 'users', color: 'var(--gold)' },
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
    { from: 'nova', text: `Baik. Apakah nomor tujuannya nomor di chat ini, atau nomor lain untuk ${c.name}?` },
    { from: 'me', text: `Nomor lain, ${c.number}` },
    { from: 'nova', text: `Konfirmasi: ${c.product} ke ${c.number} (${c.operator}). Harga sudah termasuk biaya QRIS. Apakah sudah benar?` },
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
  lead: 'Pertanyaan yang paling sering kami terima. Pilih satu, Nova yang menjawab.',
  pick: 'Daftar pertanyaan',
  agent: 'Nova',
  agentSub: 'Menjawab dari panduan resmi Topbeam',
  status: 'online',
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
  brand: 'Topbeam',
  wordmark: 'topbeam',
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

export const LOGO_STRIP = {
  title: 'Untuk semua operator seluler dan dompet digital',
}

// Three tinted product cards. `demo` picks the small illustration inside the card.
export const PRODUCTS = {
  title: 'Satu chat, semua kebutuhan',
  lead: 'Pulsa, paket data, e-wallet, dan e-BBM tersedia dalam satu percakapan WhatsApp. Sebut yang Anda perlu, Nova siapkan sisanya.',
  items: [
    {
      id: 'pulsa',
      tint: 'var(--lilac)',
      title: 'Pulsa & paket data',
      body: 'Sebut nominal atau kuota. Operator terdeteksi otomatis dari nomor.',
      figure: '8',
      caption: 'operator seluler',
      demo: 'options',
      cta: { key: 'pulsa', label: 'Beli pulsa' },
    },
    {
      id: 'ewallet',
      tint: 'var(--sky)',
      title: 'E-wallet',
      body: 'GoPay, OVO, DANA, dan ShopeePay. Untuk Anda atau keluarga.',
      figure: '4',
      caption: 'dompet digital',
      demo: 'wallets',
      cta: { key: 'ewallet', label: 'Top up e-wallet' },
    },
    {
      id: 'ebbm',
      tint: 'var(--gold)',
      title: 'e-BBM',
      body: 'Saldo e-BBM digital, siap dipakai di SPBU yang menerima.',
      figure: '1 chat',
      caption: 'dari pesan sampai saldo masuk',
      demo: 'fuel',
      cta: { key: 'ebbm', label: 'Beli e-BBM' },
    },
  ],
  options: { note: 'Nomor Anda terdeteksi Telkomsel', values: ['25rb', '50rb', '100rb'] },
  fuel: { title: 'Saldo e-BBM', sub: 'Siap dipakai di SPBU' },
}

// Dark "replay" section: pick a conversation, watch Nova answer it.
export const REPLAY = {
  title: 'Lihat sendiri cara Nova bekerja',
  lead: 'Setiap pesanan dimulai dengan pertanyaan yang jelas dan berakhir dengan rincian lengkap sebelum Anda bayar. Pilih percakapan, lalu lihat Nova menjawab.',
  pick: 'Pilih percakapan',
  agent: 'Nova',
  scenarios: [
    { id: 'pulsa', tag: 'Pulsa', title: 'Beli pulsa', sub: 'Nomor sendiri · Telkomsel', chat: STORIES[0].chat },
    { id: 'kuota', tag: 'Paket data', title: 'Kuota untuk Ibu', sub: 'Nomor lain · Telkomsel', chat: HERO.chat },
    { id: 'ewallet', tag: 'E-wallet', title: 'Top up e-wallet', sub: 'Nomor sendiri · pilih dompet', chat: STORIES[1].chat },
  ],
  stats: [
    { value: '0', label: 'PIN atau OTP yang diminta' },
    { value: '15 mnt', label: 'batas waktu tautan bayar' },
  ],
}
