// Real replies from Nova (WhatsApp 6285187976622, display name "Ppob Control"), copied word for
// word from the live test on 12 Nov 2026. The tester's number is masked; the QRIS message leaves
// out its transaction ID and its expiry line (it printed a time ~17 hours ahead although Nova
// says a QRIS is valid 15 minutes: bot bug, reported). Lists are the bot's
// own rows and prices; long lists are shortened on screen by shortList(). The one `card` step
// stands for the QR image Nova sends right after its QRIS message. Nothing after payment is shown:
// the test stopped before paying. Each replay ends where the real chat was verified.
// Keep this file free of imports: tests read it with plain Node.

const NUM = '6285-xxxx-5221'
const DATE = '2026-11-12'

const confirm = (product, price) =>
  `Baik, konfirmasi pesanan:\nProduk: ${product}\nNomor: ${NUM}\nHarga: ${price} (sudah termasuk biaya QRIS)\n\nApakah sudah benar?`

export const TRANSCRIPTS = {
  pulsa: {
    id: 'pulsa',
    date: DATE,
    steps: [
      { from: 'me', text: 'Halo Nova, saya mau beli pulsa' },
      {
        from: 'nova',
        text: `Baik, untuk beli pulsa, apakah ingin menggunakan nomor ${NUM} yang sedang aktif di chat ini, atau nomor lain?`,
      },
      { from: 'me', text: 'nomor ini' },
      {
        from: 'nova',
        text: `Baik, nomor ${NUM} sudah terdeteksi sebagai Telkomsel. Berikut pilihan pulsa yang tersedia:`,
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
          'Telkomsel Simpati Data Terbaik Untukmu 3 GB 30 Hari - Rp 35.050',
          'Telkomsel Simpati Data Terbaik Untukmu 50 GB 30 Hari - Rp 189.243',
        ],
        tail: 'Silakan pilih nominal yang diinginkan.',
      },
      { from: 'me', text: 'Telkomsel 25.000' },
      { from: 'nova', text: confirm('Telkomsel 25.000', 'Rp 25.297') },
      { from: 'me', text: 'ya' },
      {
        from: 'nova',
        text: `Berikut QRIS untuk transaksi pulsa Telkomsel 25.000 ke nomor ${NUM}:\n\nTotal Pembayaran: Rp 25.297\n\nSilakan scan QRIS di atas menggunakan aplikasi e-wallet atau mobile banking Anda. Setelah pembayaran berhasil, pulsa akan otomatis masuk ke nomor tujuan.`,
      },
      { from: 'card', card: 'qris', amount: 'Rp 25.297' },
    ],
  },
  data: {
    id: 'data',
    date: DATE,
    steps: [
      { from: 'me', text: 'Halo Nova, saya mau beli paket data' },
      {
        from: 'nova',
        text: `Untuk beli paket data, apakah ingin menggunakan nomor ${NUM} yang sedang aktif di chat ini, atau nomor lain?`,
      },
      { from: 'me', text: 'nomor ini' },
      {
        from: 'nova',
        text: `Baik, nomor ${NUM} terdeteksi sebagai Telkomsel. Berikut pilihan paket data yang tersedia:`,
        // Telkomsel Flash rows first so the short list shows the chosen package; same rows and prices as the bot sent.
        list: [
          'Telkomsel Flash 1GB / 1 hari - Rp 7.951',
          'Telkomsel Flash 2.5GB / 5 Hari - Rp 12.088',
          'Telkomsel Flash 8GB / 30 Hari - Rp 44.921',
          'Telkomsel Flash 20GB / 30 hari - Rp 83.557',
          'TELKOMSEL PAKET INTERNET 2GB / 3 HARI - Rp 11.685',
          'Tsel Flash 1GB/7hr - Rp 11.746',
          'Tsel Flash 5GB/1hr - Rp 11.890',
          'Tsel Flash 5GB/3hr - Rp 20.500',
          'ByU Jajan 7,5GB 7HR - Rp 20.086',
          'ByU Super Kaget 12GB 7HR - Rp 27.561',
          'ByU Super Kaget 3GB 7HR - Rp 19.984',
          'ByU Super Kaget 6GB 7HR - Rp 17.228',
          'Paket Data ByU 3GB 14HR - Rp 19.923',
        ],
        tail: 'Silakan pilih paket yang diinginkan.',
      },
      { from: 'me', text: 'Telkomsel Flash 8GB / 30 Hari' },
      { from: 'nova', text: confirm('Telkomsel Flash 8GB / 30 Hari', 'Rp 44.921') },
    ],
  },
  ewallet: {
    id: 'ewallet',
    date: DATE,
    steps: [
      { from: 'me', text: 'Halo Nova, saya mau top up e-wallet' },
      {
        from: 'nova',
        text: `Untuk top up e-wallet, apakah ingin menggunakan nomor ${NUM} yang sedang aktif di chat ini, atau nomor lain?`,
      },
      { from: 'me', text: 'nomor ini, e-wallet apa saja yang tersedia?' },
      {
        from: 'nova',
        text: 'Berikut pilihan e-wallet yang tersedia:',
        // DANA rows first so the short list shows the chosen nominal; same rows and prices as the bot sent.
        list: [
          'DANA 10.000 - Rp 10.718',
          'DANA 20.000 - Rp 20.818',
          'DANA 25.000 - Rp 25.297',
          'DANA 50.000 - Rp 52.061',
          'DANA 100.000 - Rp 100.734',
          'GOPAY 10.000 - Rp 10.718',
          'GOPAY 20.000 - Rp 20.818',
          'GOPAY 25.000 - Rp 25.297',
          'GOPAY 50.000 - Rp 52.061',
          'GOPAY 100.000 - Rp 100.734',
          'OVO 10.000 - Rp 10.718',
          'OVO 20.000 - Rp 20.818',
          'OVO 25.000 - Rp 25.297',
          'OVO 50.000 - Rp 52.061',
          'OVO 100.000 - Rp 100.734',
        ],
        tail: 'Silakan pilih nominal dan e-wallet yang diinginkan.',
      },
      { from: 'me', text: 'DANA 50.000' },
      { from: 'nova', text: confirm('DANA 50.000', 'Rp 52.061') },
    ],
  },
  // Second e-BBM run on 12 Nov (after "batal"); the first run offered other vouchers and then
  // failed on every choice. Ends at the confirmation: the QRIS that followed showed Rp 52.376,
  // Rp 1 off the confirmed Rp 52.375 (bot bug, reported), so it is not replayed.
  ebbm: {
    id: 'ebbm',
    date: DATE,
    steps: [
      { from: 'me', text: 'Halo Nova, saya mau beli e-BBM' },
      {
        from: 'nova',
        text: `Untuk beli e-BBM, apakah ingin menggunakan nomor ${NUM} yang sedang aktif di chat ini, atau nomor lain?`,
      },
      { from: 'me', text: 'nomor ini' },
      {
        from: 'nova',
        text: 'Baik, berikut pilihan e-BBM (Voucher BBM) yang tersedia:',
        list: [
          'E-Voucher MyPertamina 25.000 - Rp 26.188',
          'E-Voucher MyPertamina 50.000 - Rp 52.375',
          'E-Voucher MyPertamina 100.000 - Rp 104.751',
          'E-Voucher MyPertamina 200.000 - Rp 209.502',
        ],
        tail: 'Silakan pilih nominal yang diinginkan.',
      },
      { from: 'me', text: 'E-Voucher MyPertamina 50.000' },
      { from: 'nova', text: confirm('E-Voucher MyPertamina 50.000', 'Rp 52.375') },
    ],
  },
}
