// All landing page copy lives here so sections stay layout-only.
// Values in [brackets] are placeholders the team fills before launch.
// Rules (product plan): formal "Anda", no em dashes, no emoji, no claims without evidence.
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
import qris from './assets/logos/qris.webp'
import ebbm from './assets/logos/ebbm.webp'

export const NAV = [
  { id: 'produk', label: 'Produk' },
  { id: 'cara-kerja', label: 'Cara kerja' },
  { id: 'simulasi', label: 'Simulasi' },
  { id: 'biaya', label: 'Biaya' },
  { id: 'faq', label: 'Tanya jawab' },
]

export const HEADER = {
  home: 'Topbeam, kembali ke atas',
  cta: 'Chat Nova',
  menuOpen: 'Buka menu',
  menuClose: 'Tutup menu',
}

// ---- Chat replay (used by ChatWindow and Composer: keep keys and wording as they are) ----
export const CHAT = {
  name: 'Topbeam',
  sub: 'Nova · akun bisnis resmi',
  placeholder: 'Ketik pesan',
  cards: {
    qris: { kicker: 'Langkah berikutnya', title: 'Bayar dengan QRIS', sub: 'kode berlaku 15 menit' },
    receipt: {
      kicker: 'Setelah bayar',
      title: 'Isi ulang diproses',
      sub: 'status dan bukti transaksi dikirim di chat yang sama',
    },
  },
}

export const COMPOSER = {
  pick: 'Pilih kebutuhan',
  send: 'Kirim di WhatsApp',
  sendLabel: (text) => `Kirim pesan "${text}" ke Nova di WhatsApp`,
}

export const INTENTS = [
  { id: 'pulsa', label: 'Pulsa', cta: 'pulsa', text: 'Halo Nova, saya mau beli pulsa' },
  { id: 'data', label: 'Paket data', cta: 'data', text: 'Halo Nova, saya mau beli paket data' },
  { id: 'ewallet', label: 'E-wallet', cta: 'ewallet', text: 'Halo Nova, saya mau top up e-wallet' },
  { id: 'ebbm', label: 'e-BBM', cta: 'ebbm', text: 'Halo Nova, saya mau beli e-BBM' },
]

// ---- 1. Hero ----
export const HERO = {
  title: 'Isi ulang lewat satu chat. Setiap langkahnya terlihat.',
  // Trailing words of the title drawn in the accent colour
  titleAccent: 'Setiap langkahnya terlihat.',
  sub: 'Pulsa, paket data, e-wallet, dan e-BBM cukup lewat WhatsApp. Nova menampilkan produk, nomor tujuan, dan total harga lebih dulu. Tidak ada pembayaran sebelum Anda membalas YA.',
  primary: 'Mulai Sekarang',
  secondary: 'Lihat Simulasi Chat',
  chips: ['Tanpa aplikasi', 'Bayar pakai QRIS', 'Tidak pernah minta PIN atau OTP'],
  chatLabel: 'Percakapan asli dengan Nova: membeli pulsa Telkomsel Rp25.000 untuk nomor sendiri',
  // Log pills beside the phone, facts from the 12 Nov 2026 pulsa chat
  log: [
    { tone: 'ok', kicker: 'Cek nomor', text: 'Telkomsel terdeteksi' },
    { tone: 'ok', kicker: 'Rincian', text: 'Rp 25.297 termasuk biaya QRIS' },
    { tone: 'wait', kicker: 'Konfirmasi', text: 'Menunggu YA Anda' },
  ],
}

// ---- 2. Ecosystem marquee (only what works today) ----
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
  { name: 'QRIS', src: qris },
  { name: 'MyPertamina e-BBM', src: ebbm },
]

export const MARQUEE = {
  title: 'Satu chat untuk semua operator seluler, dompet digital, dan e-BBM',
  services: [
    { icon: 'phone', label: 'Pulsa semua operator' },
    { icon: 'wifi', label: 'Paket data harian sampai bulanan' },
    { icon: 'wallet', label: 'Top up DANA, GoPay, OVO' },
    { icon: 'fuel', label: 'E-Voucher MyPertamina' },
    { icon: 'qr', label: 'Bayar pakai QRIS' },
    { icon: 'chat', label: 'Langsung di WhatsApp' },
  ],
}

// ---- 3. Core capabilities ----
export const CAPS = {
  title: 'Tiga pemeriksaan sebelum Anda membayar.',
  lead: 'Nova tidak langsung menagih. Setiap pesanan melewati cek nomor, rangkuman rincian, dan persetujuan Anda.',
  items: [
    {
      id: 'detect',
      icon: 'search',
      kicker: 'Deteksi otomatis',
      metric: '8',
      unit: 'operator',
      title: 'Operator dibaca dari nomor.',
      body: 'Telkomsel, by.U, Indosat, IM3, Tri, XL, Axis, dan Smartfren. Nova langsung menampilkan pilihan dari operator yang tepat.',
      demo: { kind: 'detect', input: '6285-xxxx-5221', output: 'Telkomsel' },
    },
    {
      id: 'confirm',
      icon: 'check',
      kicker: 'Validasi sebelum bayar',
      metric: '0',
      unit: 'tagihan sebelum YA',
      title: 'Konfirmasi dulu, baru QRIS.',
      body: 'Produk, nomor tujuan, dan harga dirangkum lebih dulu. Salah pilih? Koreksi di chat, belum ada uang yang keluar.',
      demo: {
        kind: 'confirm',
        rows: [
          { label: 'Produk', value: 'Telkomsel 25.000' },
          { label: 'Nomor', value: '6285-xxxx-5221' },
          { label: 'Harga', value: 'Rp 25.297' },
        ],
      },
    },
    {
      id: 'log',
      icon: 'list',
      kicker: 'Transparansi log',
      metric: '15',
      unit: 'menit masa berlaku QRIS',
      title: 'Setiap langkah tercatat di chat.',
      body: 'Pilihan, rincian, kode QRIS, dan status transaksi dikirim di percakapan yang sama. Riwayatnya tetap ada di WhatsApp Anda.',
      demo: {
        kind: 'log',
        rows: [
          { state: 'done', text: 'Pilihan dikirim' },
          { state: 'done', text: 'Rincian dikonfirmasi' },
          { state: 'wait', text: 'QRIS menunggu pembayaran' },
        ],
      },
    },
  ],
  // Pills that drop into the card: each one is a step Nova sends in a real chat
  pillsHint: 'Setiap pill adalah satu langkah yang Nova kirim di chat. Geser untuk memindahkannya.',
  pills: [
    { text: 'Nomor terdeteksi', tone: 'aqua' },
    { text: 'Telkomsel', tone: 'blue' },
    { text: 'Pilihan dikirim', tone: 'sky' },
    { text: 'Rincian dikirim', tone: 'cyan' },
    { text: 'YA diterima', tone: 'aqua' },
    { text: 'QRIS dikirim', tone: 'blue' },
    { text: 'Paket data', tone: 'sky' },
    { text: 'DANA', tone: 'cyan' },
    { text: 'Harga dikonfirmasi', tone: 'blue' },
    { text: 'e-BBM', tone: 'aqua' },
    { text: 'Nomor lain', tone: 'cyan' },
    { text: 'Koreksi pesanan', tone: 'sky' },
  ],
  safety: {
    title: 'Nova tidak pernah meminta PIN, OTP, atau kata sandi.',
    body: 'Pastikan Anda chat ke nomor resmi Topbeam: +62 851-8797-6622.',
  },
}

// ---- 4. How it works ----
export const STEPS = {
  title: 'Selesai dalam 4 langkah.',
  lead: 'Semuanya terjadi di satu chat WhatsApp. Pilih langkah untuk melihat apa yang Nova kirim.',
  pick: 'Langkah cara kerja',
  count: (n, total) => `Langkah ${n} dari ${total}`,
  cta: 'Coba sekarang di WhatsApp',
  approved: 'Pesanan disetujui',
  items: [
    {
      icon: 'chat',
      title: 'Chat Nova',
      short: 'Tulis seperti biasa',
      body: 'Tulis kebutuhan Anda, misalnya "Halo Nova, saya mau beli pulsa". Nova menanyakan nomor tujuan: nomor di chat ini atau nomor lain.',
      demo: {
        kind: 'chat',
        me: 'Halo Nova, saya mau beli pulsa',
        nova: 'Baik, untuk beli pulsa, apakah ingin menggunakan nomor yang sedang aktif di chat ini, atau nomor lain?',
      },
    },
    {
      icon: 'receipt',
      title: 'Cek rincian',
      short: 'Produk, nomor, harga',
      body: 'Nova mendeteksi operator dari nomor, mengirim pilihan beserta harga, lalu merangkum produk, nomor tujuan, dan total.',
      demo: {
        kind: 'confirm',
        rows: [
          { label: 'Produk', value: 'Telkomsel 25.000' },
          { label: 'Nomor', value: '6285-xxxx-5221' },
          { label: 'Harga', value: 'Rp 25.297' },
        ],
        note: 'sudah termasuk biaya QRIS',
      },
    },
    {
      icon: 'check',
      title: 'Balas YA',
      short: 'Setujui pesanan',
      body: 'Pesanan baru diproses setelah Anda menyetujui. Salah nomor atau produk? Tinggal koreksi di chat.',
      demo: { kind: 'approve', nova: 'Apakah sudah benar?', me: 'ya' },
    },
    {
      icon: 'qr',
      title: 'Bayar QRIS',
      short: 'Dari aplikasi apa pun',
      body: 'Nova mengirim kode QRIS beserta total bayar. Scan dari aplikasi e-wallet atau mobile banking apa pun, kode berlaku 15 menit.',
      demo: { kind: 'pay', title: 'Bayar dengan QRIS', sub: 'Kode berlaku 15 menit', amount: 'Rp 25.297' },
    },
  ],
}

// ---- 5. Decision replay ----
export const SIM = {
  title: 'Putar ulang setiap keputusan Nova.',
  lead: 'Pilih transaksi. Chat asli diputar ulang di ponsel, dan log di sebelahnya menjelaskan apa yang Nova periksa di setiap langkah.',
  pick: 'Pilih transaksi',
  list: (n) => `Percakapan asli · ${n} transaksi`,
  statSteps: 'langkah tercatat di log',
  statBills: 'tagihan sebelum Anda membalas YA',
  logTitle: 'Log keputusan',
  why: 'Kenapa Nova menjawab begini',
  step: (n) => `Langkah ${String(n).padStart(2, '0')}`,
  source: 'Transkrip dari percakapan asli dengan Nova. Hanya jeda balasan yang dipercepat.',
  scenarios: [
    { id: 'pulsa', tag: 'Pulsa', icon: 'phone', title: 'Beli pulsa', sub: 'Sampai kode QRIS' },
    { id: 'data', tag: 'Paket data', icon: 'wifi', title: 'Beli paket data', sub: 'Sampai konfirmasi harga' },
    { id: 'ewallet', tag: 'E-wallet', icon: 'wallet', title: 'Top up e-wallet', sub: 'Sampai konfirmasi harga' },
    { id: 'ebbm', tag: 'e-BBM', icon: 'fuel', title: 'Beli e-BBM', sub: 'Sampai konfirmasi harga' },
  ],
}

// ---- 6. Pricing ----
export const PRICING = {
  title: 'Semua isi ulang, satu chat. Harga jelas sebelum bayar.',
  lead: 'Pulsa, paket data, e-wallet, dan e-BBM tanpa langganan. Anda hanya membayar produk yang dipilih, dan total yang Nova tampilkan sudah termasuk biaya QRIS.',
  fee: 'sudah termasuk biaya QRIS',
  note: 'Harga di atas adalah contoh dan dapat berubah. Nova selalu menampilkan total terbaru sebelum Anda membayar.',
}

// ---- 6b. Costs (laid out like a pricing table: what is free, what you pay) ----
export const COSTS = {
  title: 'Gratis chat. Bayar produknya saja.',
  lead: 'Tidak ada paket, langganan, atau biaya pendaftaran. Yang Anda bayar hanya produk yang Anda setujui.',
  plans: [
    {
      id: 'chat',
      name: 'Chat dengan Nova',
      sub: 'Tanya harga, pilih produk, koreksi pesanan.',
      figure: 'Gratis',
      unit: '',
      note: 'Tanpa langganan atau pendaftaran',
      points: ['Tanpa biaya chat', 'Tanpa aplikasi tambahan', 'Cukup WhatsApp yang sudah ada'],
      cta: 'Chat Nova',
    },
    {
      id: 'product',
      name: 'Produk yang Anda pilih',
      sub: 'Pulsa, paket data, e-wallet, atau e-BBM.',
      figure: 'Rp 25.297',
      unit: 'contoh',
      note: 'Pulsa Telkomsel 25.000, termasuk biaya QRIS',
      points: ['Total tampil sebelum bayar', 'Bayar setelah Anda membalas YA', 'Kode QRIS berlaku 15 menit'],
      cta: 'Beli sekarang',
      featured: true,
    },
    {
      id: 'fee',
      name: 'Biaya QRIS',
      sub: 'Biaya pembayaran yang biasanya terpisah.',
      figure: 'Termasuk',
      unit: '',
      note: 'Sudah di dalam total harga',
      points: ['Satu angka total, tanpa tambahan', 'Bayar dari aplikasi apa pun', 'Rincian dikirim di chat'],
      cta: 'Lihat cara bayar',
      href: '#cara-kerja',
    },
  ],
  callout: {
    title: 'Belum tahu mau beli apa?',
    body: 'Ketik saja kebutuhan Anda, misalnya "kuota habis". Nova menampilkan pilihan beserta harganya.',
    cta: 'Tanya Nova',
  },
}

// ---- 7. FAQ ----
export const FAQ = {
  title: 'Tanya Topbeam apa saja.',
  lead: 'Pilih topik dan pertanyaan. Nova menjawab beserta sumber aturannya.',
  pick: 'Daftar pertanyaan',
  topics: 'Topik pertanyaan',
  all: 'Semua',
  agent: 'Nova',
  agentSub: 'Menjawab dari panduan Topbeam',
  status: 'online',
  sourceLabel: 'Sumber',
  more: 'Belum terjawab? Tanyakan langsung ke Nova.',
  cta: 'Chat Nova',
}

export const FAQS = [
  {
    topic: 'Layanan',
    q: 'Apakah saya perlu mengunduh aplikasi?',
    a: 'Tidak. Topbeam berjalan sepenuhnya di WhatsApp. Cukup klik tombol Chat Nova atau simpan nomor resmi kami.',
    source: 'Cara kerja Topbeam',
  },
  {
    topic: 'Pembayaran',
    q: 'Metode pembayaran apa saja yang tersedia?',
    a: 'Pembayaran lewat QRIS: scan kodenya dari aplikasi e-wallet atau mobile banking apa pun. Kode QRIS berlaku 15 menit sejak dibuat.',
    source: 'Aturan pembayaran: QRIS berlaku 15 menit',
  },
  {
    topic: 'Pembayaran',
    q: 'Apakah ada biaya tambahan?',
    a: 'Tidak ada biaya chat dan tidak ada langganan. Harga yang Nova tampilkan sebelum pembayaran sudah termasuk biaya QRIS, itulah total yang Anda bayar.',
    source: 'Rincian harga Nova: sudah termasuk biaya QRIS',
  },
  {
    topic: 'Transaksi',
    q: 'Berapa lama pulsa atau kuota masuk?',
    a: 'Setelah pembayaran berhasil, Nova mengirimkan status transaksi di chat. Lama proses dapat bergantung pada operator.',
    source: 'Status transaksi dikirim di chat yang sama',
  },
  {
    topic: 'Transaksi',
    q: 'Bagaimana jika transaksi gagal?',
    a: 'Dana dikembalikan otomatis dan Nova mengirim kabar di chat yang sama. Ketik "status" kapan saja untuk cek pesanan.',
    source: 'Aturan layanan: setiap transaksi gagal mendapat pesan pengembalian dana',
  },
  {
    topic: 'Transaksi',
    q: 'Bisakah membeli untuk nomor orang lain?',
    a: 'Bisa. Saat Nova bertanya, pilih "nomor lain" lalu sebutkan nomor tujuannya.',
    source: 'Alur percakapan Nova, diuji 12 Nov 2026',
  },
  {
    topic: 'Layanan',
    q: 'Kapan Nova bisa dipakai?',
    a: 'Nova siap melayani [24 jam / jam operasional]. Bantuan dari tim kami tersedia [jam layanan] dengan mengetik "bantuan".',
    source: 'Jam layanan Topbeam',
  },
  {
    topic: 'Keamanan',
    q: 'Apakah data saya aman?',
    a: 'Kami hanya menyimpan nomor WhatsApp, nomor tujuan, dan riwayat pesanan, sesuai Kebijakan Privasi dan UU PDP. Anda bisa meminta penghapusan data kapan saja.',
    source: 'Kebijakan Privasi Topbeam · UU PDP',
  },
  {
    topic: 'Keamanan',
    q: 'Bagaimana cara memastikan saya chat dengan Topbeam?',
    a: 'Nomor resmi Topbeam adalah +62 851-8797-6622. Nova tidak pernah meminta PIN, OTP, atau kata sandi.',
    source: 'Aturan keamanan: tidak pernah meminta PIN atau OTP',
  },
]

// ---- 8. Final CTA ----
export const FINAL = {
  title: 'Kuota menipis? Chat Nova sekarang.',
  sub: 'Pilih kebutuhan, pesan langsung terisi. Nova siapkan rinciannya, Anda yang memutuskan.',
}

// ---- 9. Footer ----
export const FOOTER = {
  tagline: 'Isi ulang pulsa, kuota, e-wallet, dan e-BBM lewat satu chat WhatsApp. Rincian jelas sebelum bayar.',
  cta: 'Chat Nova',
  cols: [
    {
      title: 'Halaman',
      links: NAV.map((n) => ({ label: n.label, href: `#${n.id}` })),
    },
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
      title: 'Legal',
      links: [
        { label: 'Kebijakan privasi', href: '#privasi' },
        { label: 'Syarat & ketentuan', href: '#syarat' },
        { label: 'Pengembalian dana', href: '#refund' },
        { label: 'Layanan pengaduan', href: '#pengaduan' },
      ],
    },
  ],
  official: 'Nomor resmi: +62 851-8797-6622',
  status: {
    ok: 'Semua layanan berjalan normal',
    degraded: 'Sebagian layanan terganggu',
    down: 'Layanan sedang terganggu',
    unknown: 'Status layanan belum tersedia',
    checked: (time) => `diperbarui ${time}`,
  },
  legal: '© 2026 PT LinkIT360, Jakarta. Topbeam adalah layanan milik PT LinkIT360.',
}
