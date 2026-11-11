// Real replies from Nova (WhatsApp 6285187976622, display name "Ppob Control"), copied from live tests.
// The tester's number is masked. Lists are the bot's own rows and prices; long lists are
// shortened on screen by shortList(). `card` steps are UI cards for what happens next,
// not messages from Nova (the bot sent no QRIS during the 11 Nov test).
// Keep this file free of imports: tests read it with plain Node.

const NUM = '0812-xxxx-6536'

export const TRANSCRIPTS = {
  pulsa: {
    id: 'pulsa',
    date: '2026-11-11',
    steps: [
      { from: 'me', text: 'Halo Nova, saya mau beli pulsa' },
      {
        from: 'nova',
        text: `Baik, untuk pembelian pulsa, apakah nomor tujuan yang digunakan adalah ${NUM} (nomor yang sama dengan chat ini), atau nomor lain?`,
      },
      { from: 'me', text: 'nomor ini' },
      {
        from: 'nova',
        text: 'Baik, karena nomor Anda terdeteksi sebagai Telkomsel, berikut adalah pilihan pulsa yang tersedia:',
        // Telkomsel denominations first so the short list shows the relevant rows; same rows and prices as the bot sent.
        list: [
          'TELKOMSEL PULSA 10.000 - Rp 10.718',
          'Telkomsel 20.000 - Rp 20.818',
          'Telkomsel 25.000 - Rp 25.297',
          'Telkomsel Rp. 50.000 - Rp 52.061',
          'TELKOMSEL PULSA 5.000 - Rp 5.552',
          'TELKOMSEL PULSA 30.000 - Rp 31.074',
          'PULSA TELKOMSEL 35K - Rp 35.378',
          'BYU REGULER 5.000 - Rp 5.681',
          'By.U 15.000 - Rp 15.138',
          'By.U 100.000 - Rp 100.734',
        ],
        tail: 'Silakan pilih nominal yang Anda inginkan.',
      },
      { from: 'me', text: 'Telkomsel 25.000' },
      {
        from: 'nova',
        text: `Baik, konfirmasi pembelian pulsa Anda:\nProduk: Telkomsel 25.000\nNomor: ${NUM}\nHarga: Rp 25.297 (sudah termasuk biaya QRIS)\n\nApakah sudah benar? Jika ya, silakan konfirmasi agar Nova bisa membuatkan kode QRIS-nya.`,
      },
      { from: 'card', card: 'qris', amount: 'Rp 25.297' },
      { from: 'card', card: 'receipt' },
    ],
  },
  data: {
    id: 'data',
    date: '2026-11-09',
    steps: [
      { from: 'me', text: 'Halo Nova, saya mau beli paket data' },
      {
        from: 'nova',
        text: `Halo! Untuk paket data, apakah Anda ingin menggunakan nomor ${NUM} yang ada di chat ini, atau nomor lain?`,
      },
      { from: 'me', text: 'nomor ini' },
      {
        from: 'nova',
        text: 'Baik, karena nomor Anda terdeteksi sebagai Telkomsel, berikut adalah pilihan paket data yang tersedia:',
        list: [
          'Telkomsel Flash 1GB / 1 hari - Rp 7.951',
          'Tsel Flash 5GB/3hr - Rp 20.500',
          'Telkomsel Flash 8GB / 30 Hari - Rp 44.921',
          'Telkomsel Flash 20GB / 30 hari - Rp 83.557',
          'Telkomsel Flash 500MB / 30 hari - Rp 7.951',
          'TELKOMSEL PAKET INTERNET 2GB / 3 HARI - Rp 11.685',
          'Telkomsel Flash 2.5GB / 5 Hari - Rp 12.088',
          'ByU Super Kaget 12GB 7HR - Rp 27.561',
        ],
      },
    ],
  },
  ewallet: {
    id: 'ewallet',
    date: '2026-11-09',
    steps: [
      { from: 'me', text: 'Halo Nova, saya mau top up e-wallet' },
      {
        from: 'nova',
        text: `Halo! Untuk top up e-wallet, apakah Anda ingin menggunakan nomor ${NUM} yang ada di chat ini, atau nomor lain?`,
      },
      { from: 'me', text: 'nomor ini, e-wallet apa saja yang tersedia?' },
      {
        from: 'nova',
        text: 'Berikut adalah e-wallet yang tersedia:',
        list: ['DANA', 'GoPay', 'OVO', 'ShopeePay', 'LinkAja'],
        tail: 'Silakan pilih e-wallet yang ingin di-top up.',
      },
    ],
  },
}
