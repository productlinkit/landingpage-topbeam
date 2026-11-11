# Topbeam landing page revamp — design spec

Date: 2026-11-11 · Status: approved in chat, pending spec review

## Goal

Revamp the Topbeam landing page (React 19 + Vite + motion) in the layout language of
bloop-ai.framer.website, using Topbeam's own brand colours, with a new original mascot
and chat simulations taken from real tests of the Nova bot (WhatsApp 6285187976622).
The page has one job (from the product plan): get the visitor to send the first
WhatsApp message to Nova.

## Sources

- Design canvas "Topbeam Landing Page" (desktop + mobile draft, section order, copy).
- Product plan "Topbeam — WhatsApp PPOB Product Plan" (brand, personas, USP, LP spec,
  claim rules, build notes).
- Live bot tests: 9 Nov 2026 (paket data, e-wallet) and 11 Nov 2026 (pulsa), see
  "Real transcripts".

## Hard constraints (from the product plan)

1. Copy in Bahasa Indonesia, formal "Anda", no slang in Nova's lines, no em dashes,
   no emoji in headlines. Prices in copy as `Rp50.000`; chat bubbles keep the bot's own
   formatting (`Rp 25.297`).
2. Banned until evidence exists: "pertama", "satu-satunya", "kurang dari satu menit",
   "Terverifikasi" / checkmark badge, and "Nova ingat nomor keluarga" (saved labels were
   not tested).
3. Every CTA opens `wa.me/6285187976622` with a pre-filled message ending in its
   `[LP-…]` tag (keys in `src/config.js`). Tags: nav, hero, pulsa, data, ewallet, ebbm,
   keluarga, faq, footer.
4. Mobile first (360 to 412 px), whole page under 1 MB transferred, target JS+CSS under
   250 KB gzip. Animation uses transform/opacity only and honours
   `prefers-reduced-motion` (MotionConfig `reducedMotion="user"` plus CSS fallbacks).
5. No personal data from the tests on the page: the tester's number is masked as
   `0812-xxxx-6536` style placeholders.

## Visual system

- Ground: off-white `#f7f7f4`-family page, white cards, one dark navy section.
- Type: Wix Madefor Display (already loaded), display sizes large with tight tracking;
  Fragment Mono for small "system" labels (as Bloop uses mono for steps).
- Tints derived from the logo, each paired with an ink that passes 4.5:1:
  lilac (violet), sky (blue), aqua (cyan), gold (star). Tokens live on `:root` in
  `src/index.css`.
- Shapes: pill nav and buttons, 28 px card radius, soft long shadows.
- The logo gradient (violet → blue → cyan) is reserved for Nova's beam trail and a few
  accents; no full-section gradient washes.

## Mascot: Nova

- Body: the logo's gold four-point star, softened into a plump rounded star
  (gold `#F4B740` → warm `#E59A2E`), navy eyes with highlight, pink cheeks, small smile.
- Beam: a short light trail in the logo gradient behind Nova when she moves.
- Left and right star points act as arms (wave, point, hold an item).
- Poses (prop drawn beside or in the "hand"): `idle`, `wave`, `phone` (pulsa),
  `wifi` (paket data), `wallet` (e-wallet), `fuel` (e-BBM), `shield` (safety),
  `think` (typing), `cheer` (success).
- Motion: idle float + blink loop; eyes follow the pointer on desktop (hero only);
  small hop when a nearby CTA is hovered; pose change cross-fades. Static under reduced
  motion.
- Implementation: one `src/components/Nova.jsx` inline SVG, props `pose`, `size`,
  `track` (pointer follow), `beam`. Must stay readable at 40 px.

## Sections (page order)

1. **Header**: logo left, centred pill nav (Produk · Cara kerja · Tanya jawab), dark
   "Chat Nova" button [LP-nav]; hides on scroll down, returns on scroll up; mobile menu.
2. **Hero**: H1 "Isi pulsa & kuota, cukup chat Nova."; sub "Tanpa unduh aplikasi baru.
   Ketik kebutuhan Anda di WhatsApp, Nova siapkan pesanannya, Anda tinggal bayar pakai
   QRIS."; composer with intent chips (Pulsa / Paket data / E-wallet / e-BBM) [LP-hero];
   trust line "Gratis chat. Anda hanya bayar produknya." Right side: Nova on a glow,
   two floating pills with real facts ("Telkomsel terdeteksi otomatis",
   "Rp 25.297 · sudah termasuk biaya QRIS"), and a chat card replaying the real pulsa
   transcript.
3. **Logo marquee**: "Untuk semua operator seluler dan dompet digital"; two rows,
   opposite directions, pause on hover, static grid under reduced motion.
4. **Produk**: "Semua isi ulang, satu chat." Four pastel cards (Pulsa, Paket data,
   E-wallet, e-BBM), each with a Nova pose, one-line body from the plan, and a CTA with
   its tag.
5. **Cara kerja**: four-step stepper (Chat Nova → Cek rincian → Balas YA → Bayar QRIS)
   with beam progress line; tap a step or let it auto-advance while in view; panel shows
   the step's illustration built from real messages.
6. **Replay (dark)**: "Lihat sendiri cara Nova bekerja". Scenario list (Pulsa, Paket data,
   E-wallet) and a chat window that replays the chosen real transcript with typing
   indicator and compressed real pacing. After Nova's confirmation, a QRIS card and a
   receipt card appear as UI cards (labelled "Langkah berikutnya"), not as Nova bubbles.
   Stats: "0 PIN atau OTP yang diminta", "15 menit batas tautan bayar".
7. **Kenapa Topbeam**: three USP pillars from the plan: "Sebut, bukan cari menu",
   "Isi untuk keluarga" (uses the verified "nomor lain" question), "Aman sebelum dan
   sesudah bayar".
8. **Keamanan**: "Nova tidak pernah meminta PIN, OTP, atau kata sandi." plus official
   number check, operator PT LinkIT360 Jakarta, payment partner placeholder.
9. **FAQ as chat**: question list left, chat panel right; selecting a question plays
   Nova typing then the answer. FAQ copy from the plan with banned claims removed;
   bracket placeholders kept where the plan has them.
10. **Final CTA**: "Kuota menipis? Chat Nova sekarang." with waving Nova and composer
    [LP-footer].
11. **Footer**: brand line, product links (CTA tags), help links, legal links
    (placeholders), "© 2026 PT LinkIT360".

## Real transcripts (source of every simulated chat)

Pulsa, 11 Nov 2026 (from LP-pulsa message):
- me: "Halo Nova, saya mau beli pulsa"
- nova: "Baik, untuk pembelian pulsa, apakah nomor tujuan yang digunakan adalah
  0812-xxxx-6536 (nomor yang sama dengan chat ini), atau nomor lain?"
- me: "nomor ini"
- nova: "Baik, karena nomor Anda terdeteksi sebagai Telkomsel, berikut adalah pilihan
  pulsa yang tersedia:" + list (shown shortened: Telkomsel 10.000 Rp 10.718 ·
  Telkomsel 25.000 Rp 25.297 · Telkomsel Rp. 50.000 Rp 52.061 · …) + "Silakan pilih
  nominal yang Anda inginkan."
- me: "Telkomsel 25.000"
- nova: "Baik, konfirmasi pembelian pulsa Anda: Produk: Telkomsel 25.000 · Nomor:
  0812-xxxx-6536 · Harga: Rp 25.297 (sudah termasuk biaya QRIS). Apakah sudah benar?
  Jika ya, silakan konfirmasi agar Nova bisa membuatkan kode QRIS-nya."

Paket data, 9 Nov 2026: Nova asks this number or another; on "nomor ini" detects
Telkomsel and lists packs (e.g. Telkomsel Flash 1GB / 1 hari Rp 7.951 ·
Tsel Flash 5GB/3hr Rp 20.500 · Telkomsel Flash 8GB / 30 Hari Rp 44.921).

E-wallet, 9 Nov 2026: same number question; then "Berikut adalah e-wallet yang
tersedia: DANA, GoPay, OVO, ShopeePay, LinkAja. Silakan pilih e-wallet yang ingin
di-top up."

Observed limits (reported to the team, not shown on the page): after "Ya" the bot sent
no QRIS within 4+ minutes (11 Nov); a one-shot request with a budget failed
("Nova butuh beberapa langkah lagi", 9 Nov); replies take about 30 to 40 seconds.
The page compresses pacing to 0.8 to 1.6 s per message and does not state reply times.

## Code structure

Builds on the current uncommitted working tree (commit it first as a safe point).

- `src/content.js`: all copy, transcripts with test dates, FAQ.
- `src/config.js`: unchanged API (`waLink`, `waText`, `trackCta`); add `[LP-…]` tags.
- `src/components/Nova.jsx` + `Nova.css`: mascot.
- `src/hooks/useChatReplay.js`: replaces `useChatScript`; plays a script with typing
  states, restarts on scenario change, pauses off-screen, instant under reduced motion.
- `src/components/Phone.jsx` / chat window: renders bubbles, option chips, list
  messages, typing indicator, UI step cards.
- Sections keep one `.jsx` + `.css` per section; below-the-fold sections stay lazy.
  Removed sections: Vignettes and Family (folded into Kenapa Topbeam and Replay).

## Verification

- `npm run build` and `npm run lint` clean.
- Bundle check: JS+CSS gzip under 250 KB; total `dist/` under 1 MB.
- Every CTA href checked by a script: correct number, encoded text, `[LP-…]` tag.
- Grep for banned claims and em dashes in `src/`.
- Manual pass at 360 px, 768 px, 1280 px and with reduced motion.

## Out of scope

Real QRIS/receipt content (until the bot step works), English toggle, analytics setup
beyond `dataLayer` pushes, promo banner (Phase 2), legal page content.
