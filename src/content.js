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

// Fixed parts of the phone chat (header, input bar, the UI cards after Nova's confirmation)
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
  // Trailing words of the title drawn in the logo gradient
  titleAccent: 'chat Nova.',
  sub: 'Tanpa unduh aplikasi baru. Ketik kebutuhan Anda di WhatsApp, Nova siapkan pesanannya, Anda tinggal bayar pakai QRIS.',
  note: 'Gratis chat. Anda hanya bayar produknya.',
  chatLabel: 'Percakapan asli dengan Nova: membeli pulsa Telkomsel Rp25.000 untuk nomor sendiri',
  // Floating facts around Nova, taken from the 12 Nov 2026 test chat
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
  { name: 'QRIS', src: qris },
  { name: 'e-BBM', src: ebbm },
]

export const LOGO_STRIP = {
  title: 'Untuk semua operator seluler dan dompet digital',
}

// Four tinted product cards, each with its own Nova pose and WhatsApp button.
export const PRODUCTS = {
  title: 'Semua isi ulang, satu chat.',
  lead: 'Pilih produk, chat langsung terbuka dengan pesan yang sudah terisi.',
  items: [
    {
      id: 'pulsa',
      tint: 'var(--lilac)',
      pose: 'phone',
      title: 'Pulsa',
      body: 'Semua operator utama: Telkomsel, by.U, Indosat, IM3, Tri, XL, Axis, Smartfren. Operator terdeteksi otomatis dari nomor.',
      cta: { key: 'pulsa', label: 'Beli pulsa' },
    },
    {
      id: 'data',
      tint: 'var(--sky)',
      pose: 'wifi',
      title: 'Paket data',
      body: 'Harian, mingguan, atau bulanan. Sebutkan kuota yang Anda perlu, Nova tampilkan pilihan paketnya.',
      cta: { key: 'data', label: 'Beli paket data' },
    },
    {
      id: 'ewallet',
      tint: 'var(--aqua)',
      pose: 'wallet',
      title: 'E-wallet',
      body: 'Top up DANA, GoPay, dan OVO mulai Rp 10.000, untuk Anda atau keluarga.',
      cta: { key: 'ewallet', label: 'Top up e-wallet' },
    },
    {
      id: 'ebbm',
      tint: 'var(--gold)',
      pose: 'fuel',
      title: 'e-BBM',
      body: 'E-Voucher MyPertamina, pilihan Rp 25.000 sampai Rp 200.000.',
      cta: { key: 'ebbm', label: 'Beli e-BBM' },
    },
  ],
}

// Four-step stepper. Panels reuse lines from the real 12 Nov 2026 chat.
export const HOW = {
  title: 'Cara kerjanya',
  lead: 'Empat langkah, semuanya di satu chat. Ketuk langkah untuk melihat apa yang terjadi.',
  pick: 'Langkah cara kerja',
  count: (n, total) => `Langkah ${n} dari ${total}`,
  steps: [
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
      body: 'Nova mendeteksi operator dari nomor, menampilkan pilihan beserta harga, lalu merangkum produk, nomor tujuan, dan total.',
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
      demo: {
        kind: 'approve',
        nova: 'Apakah sudah benar?',
        me: 'ya',
      },
    },
    {
      icon: 'qr',
      title: 'Bayar QRIS',
      short: 'Dari aplikasi apa pun',
      body: 'Nova mengirim kode QRIS beserta ID transaksi dan total bayar. Scan dari aplikasi e-wallet atau mobile banking apa pun, kode berlaku 15 menit.',
      demo: { kind: 'pay', title: 'Bayar dengan QRIS', sub: 'Kode berlaku 15 menit' },
    },
  ],
}

// Dark section: pick a real conversation and watch Nova answer it.
export const REPLAY = {
  title: 'Lihat sendiri cara Nova bekerja',
  lead: 'Setiap percakapan di bawah ini diputar ulang dari chat asli dengan Nova. Yang dipercepat hanya jeda balasannya.',
  pick: 'Pilih percakapan',
  tested: (date) => `Diuji ${date}`,
  scenarios: [
    {
      id: 'pulsa',
      tag: 'Pulsa',
      title: 'Beli pulsa Telkomsel',
      sub: 'Nomor sendiri · sampai kode QRIS',
      date: '12 Nov 2026',
    },
    {
      id: 'data',
      tag: 'Paket data',
      title: 'Beli paket data',
      sub: 'Nomor sendiri · sampai konfirmasi harga',
      date: '12 Nov 2026',
    },
    {
      id: 'ewallet',
      tag: 'E-wallet',
      title: 'Top up DANA',
      sub: 'Nomor sendiri · sampai konfirmasi harga',
      date: '12 Nov 2026',
    },
    {
      id: 'ebbm',
      tag: 'e-BBM',
      title: 'Beli voucher MyPertamina',
      sub: 'Nomor sendiri · sampai konfirmasi harga',
      date: '12 Nov 2026',
    },
  ],
  stats: [
    { value: '0', label: 'PIN atau OTP yang diminta' },
    { value: '15 mnt', label: 'masa berlaku kode QRIS' },
  ],
}

// "In motion" section: pills rise from Nova, one per finished step. An illustration of the flow,
// not transaction data, and the copy says so. Counters only state facts from PRODUCTS.
export const FLOW = {
  title: 'Satu chat, banyak urusan beres.',
  lead: 'Setiap pil adalah satu langkah yang Nova selesaikan di chat. Ini ilustrasi alurnya, bukan data transaksi.',
  label: 'Ilustrasi: langkah-langkah yang Nova selesaikan, muncul satu per satu',
  legend: [
    { kind: 'pulsa', label: 'Pulsa' },
    { kind: 'data', label: 'Paket data' },
    { kind: 'ewallet', label: 'E-wallet' },
    { kind: 'ebbm', label: 'e-BBM' },
    { kind: 'ask', label: 'Menunggu YA Anda' },
  ],
  pills: [
    { kind: 'pulsa', text: 'Telkomsel terdeteksi' },
    { kind: 'data', text: 'Pilihan paket dikirim' },
    { kind: 'ask', text: 'Menunggu YA Anda' },
    { kind: 'ewallet', text: 'Nomor DANA dicek' },
    { kind: 'pulsa', text: 'Kode QRIS dikirim' },
    { kind: 'ebbm', text: 'Voucher MyPertamina dipilih' },
    { kind: 'data', text: 'Rincian harga dikirim' },
    { kind: 'ewallet', text: 'Top up GoPay dikonfirmasi' },
    { kind: 'ask', text: 'Menunggu YA Anda' },
    { kind: 'pulsa', text: 'Pulsa Rp 25.000 dipesan' },
    { kind: 'ebbm', text: 'Nominal Rp 50.000 dipilih' },
    { kind: 'data', text: 'Nomor tujuan dicek' },
  ],
  stats: [
    { value: 8, label: 'operator pulsa dalam satu chat', tint: 'var(--lilac)' },
    { value: 3, label: 'e-wallet: DANA, GoPay, dan OVO', tint: 'var(--aqua)' },
    { value: 0, label: 'aplikasi baru yang perlu diunduh', tint: 'var(--gold)' },
  ],
}

export const WHY = {
  title: 'Kenapa Topbeam',
  lead: 'Dibuat supaya isi ulang terasa seperti chat biasa: jelas, cepat, dan tanpa kejutan.',
  points: [
    {
      kind: 'say',
      tint: 'var(--lilac)',
      title: 'Sebut, bukan cari menu.',
      body: 'Tulis dengan kata-kata Anda sendiri. Nova yang mengerti dan mendeteksi operatornya dari nomor.',
      proof: { me: 'Halo Nova, saya mau beli pulsa', nova: 'Baik, nomor Anda sudah terdeteksi sebagai Telkomsel.' },
    },
    {
      kind: 'family',
      tint: 'var(--aqua)',
      title: 'Isi untuk keluarga.',
      body: 'Ibu di kampung kehabisan pulsa? Pilih "nomor lain", sebutkan nomornya, Nova siapkan pesanannya.',
      proof: {
        nova: 'Apakah ingin menggunakan nomor yang sedang aktif di chat ini, atau nomor lain?',
        me: 'nomor lain',
      },
    },
    {
      kind: 'safe',
      tint: 'var(--gold)',
      title: 'Aman sebelum dan sesudah bayar.',
      body: 'Tidak ada pembayaran sebelum Anda membalas YA. Jika transaksi gagal, dana dikembalikan dan Nova mengabari di chat.',
      proof: { rows: ['Rincian tampil sebelum bayar', 'Konfirmasi dulu, baru QRIS', 'Gagal? Dana kembali'] },
    },
  ],
  cta: { key: 'keluarga', label: 'Isi ulang untuk keluarga' },
}

export const SAFETY = {
  lead: 'Nova tidak pernah meminta',
  strong: 'PIN, OTP, atau kata sandi.',
  points: [
    { icon: 'phone', title: 'Nomor resmi', body: 'Pastikan Anda chat ke nomor resmi Topbeam: +62 851-8797-6622.' },
    {
      icon: 'receipt',
      title: 'Rincian di depan',
      body: 'Periksa produk, nomor tujuan, dan total sebelum membalas YA.',
    },
    {
      icon: 'building',
      title: 'Perusahaan terdaftar',
      body: 'Topbeam dikelola oleh PT LinkIT360, Jakarta. Pembayaran diproses oleh [nama mitra pembayaran].',
    },
  ],
}

export const FAQ = {
  title: 'Tanya Nova',
  lead: 'Pertanyaan yang paling sering kami terima. Pilih satu, Nova yang menjawab.',
  pick: 'Daftar pertanyaan',
  agent: 'Nova',
  agentSub: 'Menjawab dari panduan Topbeam',
  status: 'online',
  more: 'Belum terjawab? Tanyakan langsung ke Nova.',
  cta: 'Chat Nova',
}

export const FAQS = [
  {
    q: 'Apakah saya perlu mengunduh aplikasi?',
    a: 'Tidak. Topbeam berjalan sepenuhnya di WhatsApp. Cukup klik tombol Chat Nova atau simpan nomor resmi kami.',
  },
  {
    q: 'Metode pembayaran apa saja yang tersedia?',
    a: 'Pembayaran lewat QRIS: scan kodenya dari aplikasi e-wallet atau mobile banking apa pun. Kode QRIS berlaku 15 menit sejak dibuat.',
  },
  {
    q: 'Berapa lama pulsa atau kuota masuk?',
    a: 'Setelah pembayaran berhasil, Nova mengirimkan status transaksi di chat. Lama proses dapat bergantung pada operator.',
  },
  {
    q: 'Bagaimana jika transaksi gagal?',
    a: 'Dana dikembalikan otomatis dan Nova mengirim kabar di chat yang sama. Ketik "status" kapan saja untuk cek pesanan.',
  },
  {
    q: 'Bisakah membeli untuk nomor orang lain?',
    a: 'Bisa. Saat Nova bertanya, pilih "nomor lain" lalu sebutkan nomor tujuannya.',
  },
  {
    q: 'Apakah ada biaya tambahan?',
    a: 'Tidak ada biaya chat. Harga yang Nova tampilkan sebelum pembayaran sudah termasuk biaya QRIS, itulah total yang Anda bayar.',
  },
  {
    q: 'Kapan Nova bisa dipakai?',
    a: 'Nova siap melayani [24 jam / jam operasional]. Bantuan dari tim kami tersedia [jam layanan] dengan mengetik "bantuan".',
  },
  {
    q: 'Apakah data saya aman?',
    a: 'Kami hanya menyimpan nomor WhatsApp, nomor tujuan, dan riwayat pesanan, sesuai Kebijakan Privasi dan UU PDP. Anda bisa meminta penghapusan data kapan saja.',
  },
  {
    q: 'Bagaimana cara memastikan saya chat dengan Topbeam?',
    a: 'Nomor resmi Topbeam adalah +62 851-8797-6622. Nova tidak pernah meminta PIN, OTP, atau kata sandi.',
  },
]

export const FINAL = {
  title: 'Kuota menipis? Chat Nova sekarang.',
  sub: 'Buka WhatsApp, pilih kebutuhan, Nova siapkan pesanannya dalam satu chat.',
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
    { icon: 'phone', text: 'Nomor resmi: +62 851-8797-6622.' },
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
