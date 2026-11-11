# Topbeam landing page

Single-page landing for Topbeam: buy pulsa, paket data, e-wallet top-ups and e-BBM through a WhatsApp chat with Nova.

Built with React 19, Vite and [motion](https://motion.dev) for animation.

## Scripts

```bash
npm install
npm run dev       # local dev server
npm run build     # production build into dist/
npm run preview   # serve the production build
npm run lint      # oxlint
npm test          # unit tests (node --test): WhatsApp links, transcripts, replay timing
npm run check     # banned-copy check + build + size budget (JS+CSS < 250 KB gzip, dist < 1 MB)
```

## Where to change things

| What | File |
| --- | --- |
| All page copy (headlines, FAQ, footer links, step demos) | `src/content.js` |
| Real Nova chat transcripts used by every replay (with test dates) | `src/data/transcripts.js` |
| WhatsApp number, pre-filled messages, `[LP-…]` tags, click tracking | `src/config.js` |
| Nova mascot (poses, motion) | `src/components/Nova.jsx` |
| Colours, spacing, type scale, shared buttons | `src/index.css` (tokens on `:root`) |
| Fonts and meta tags | `index.html` |
| Tab icon, home-screen icons | `public/`. After replacing them, bump `?v=` in `index.html` and `site.webmanifest`. |

## Structure

```
src/
  main.jsx            entry
  App.jsx             section order; everything below the hero is lazy-loaded
  content.js          copy and data for every section
  config.js           WhatsApp links ([LP-key] tag on every message) and analytics
  data/transcripts.js real Nova replies from live tests (no imports, tested with Node)
  lib/timeline.js     replay pacing and list shortening (pure, tested)
  index.css           design tokens, base styles, shared utilities
  components/
    Nova.jsx          the mascot: gold four-point star, poses idle/wave/phone/wifi/wallet/fuel/shield/think/cheer
    ChatWindow.jsx    WhatsApp-style card that replays a transcript (typing dots, lists, next-step cards)
    Composer.jsx      WhatsApp-style CTA (hero and final CTA)
    ui.jsx            Logo, Mark, Reveal, SectionHead, WaButton
    BackToTop, Icon, WhatsAppIcon, ease
  hooks/
    useChatReplay.js  plays a transcript on the timeline, pauses off screen, static under reduced motion
    useHideOnScroll.js
  sections/           one component + one stylesheet per section, in page order
    Header, Hero, Logos, Products, How, Replay, Why, Safety, Faq, FinalCta, Footer
scripts/              check-copy.mjs, check-size.mjs
tests/                node --test suites
```

## Copy rules (from the product plan)

`npm run check` fails on em dashes and on claims the plan does not allow yet:
"pertama", "satu-satunya", "kurang dari satu menit", "terverifikasi", "ingat nomor".
Remove a word from `scripts/check-copy.mjs` only when the evidence exists.

## Before launch

- Fill the bracket placeholders in `src/content.js`: payment partner, service hours, legal links (`#privasi`, `#syarat`, `#refund`, `#pengaduan`).
- Re-test Nova and update `src/data/transcripts.js` when the bot changes. On 11 Nov 2026 the bot sent no QRIS after "Ya", so the page shows the payment and receipt as UI cards, not as Nova messages.
- Add every `[LP-…]` tag from `src/config.js` to the QA test bank.
