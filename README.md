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
npm test          # unit tests (node --test): links, transcripts, replay timing, colour rules
npm run check     # banned-copy check + build + size budget (JS+CSS < 250 KB gzip, dist < 1 MB)
```

## Where to change things

| What | File |
| --- | --- |
| All page copy (headlines, FAQ, footer links, step demos) | `src/content.js` |
| Prices, operators, decision logs shown in the replay | `src/data/facts.js` |
| Real Nova chat transcripts used by every replay | `src/data/transcripts.js` |
| WhatsApp number, pre-filled messages, `[LP-…]` tags, click tracking | `src/config.js` |
| Colours: the BEAM palette and every semantic token | `src/styles/globals.css` |
| Spacing, type scale, layout grid, motion tokens, shared buttons | `src/index.css`, `src/components/ease.js` |
| Nova mascot (poses, halo, motion) | `src/components/Nova.jsx`, `src/components/Nova.css`, artwork in `src/assets/brand/` |
| Fonts and meta tags | `index.html` |
| Tab icon, home-screen icons | `public/`. After replacing them, bump `?v=` in `index.html` and `site.webmanifest`. |

The live colour and contrast preview is at `/design-system`.

## Structure

```
src/
  main.jsx            entry (/design-system is a separate lazy chunk)
  App.jsx             section order; everything below the hero is lazy-loaded
  content.js          copy for every section
  config.js           WhatsApp links ([LP-key] tag on every message) and analytics
  styles/globals.css  colour tokens (BEAM palette, light and dark context)
  index.css           layout grid, spacing/type/motion tokens, base styles, shared utilities
  data/               facts.js (prices, logs), transcripts.js (real Nova replies, no imports)
  lib/                timeline.js (replay pacing), contrast.js (WCAG maths)
  components/
    Nova.jsx          the mascot: six posed artworks (wave, point, crossed, headset, sit, thumbsup)
    ChatWindow.jsx    WhatsApp phone that replays a transcript (typing dots, lists, step cards)
    Composer.jsx      WhatsApp-style CTA of the closing section
    ui.jsx            Logo, Reveal, Stagger, SectionHead, SceneHead, WaButton, LiveDot
    ds/               design-system primitives (Button, Card, Badge, Input, TopbeamMark ...)
    BackToTop, Icon, WhatsAppIcon, SectionBoundary, ease
  hooks/              useChatReplay, useCountUp, useActiveSection, useHeaderScroll, useServiceStatus
  pages/              DesignSystem.jsx (/design-system)
  sections/           one component + one stylesheet per section, in page order:
                      Header, Hero, Marquee, Pricing, Steps, Simulator, Stats, Costs, Faq,
                      FinalCta, Footer
scripts/              check-copy.mjs, check-size.mjs
tests/                node --test suites (links, facts, transcripts, timeline, contrast rules)
```

## Copy rules (from the product plan)

`npm run check` fails on em dashes and on claims the plan does not allow yet:
"pertama", "satu-satunya", "kurang dari satu menit", "terverifikasi", "ingat nomor".
Remove a word from `scripts/check-copy.mjs` only when the evidence exists.

## Before launch

- Fill the bracket placeholders in `src/content.js`: payment partner, service hours, legal links (`#privasi`, `#syarat`, `#refund`, `#pengaduan`).
- Re-test Nova and update `src/data/transcripts.js` when the bot changes. On 11 Nov 2026 the bot sent no QRIS after "Ya", so the page shows the payment and receipt as UI cards, not as Nova messages.
- Add every `[LP-…]` tag from `src/config.js` to the QA test bank.
