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
```

## Where to change things

| What | File |
| --- | --- |
| All page copy (headlines, FAQ, footer links, chat scripts, example prices) | `src/content.js` |
| WhatsApp number, pre-filled messages per button, click tracking | `src/config.js` |
| Colours, spacing, type scale, shared buttons | `src/index.css` (tokens on `:root`) |
| Fonts and meta tags | `index.html` |
| Tab icon, iPhone/Android home-screen icons | `public/` (favicon.ico, favicon-32.png, apple-touch-icon.png, icon-192/512.png). After replacing them, bump `?v=` in `index.html` and `site.webmanifest`, or browsers keep the old icon. |

## Structure

```
src/
  main.jsx            entry
  App.jsx             section order; everything below the hero is lazy-loaded
  content.js          copy and data for every section
  config.js           WhatsApp links and analytics
  index.css           design tokens, base styles, shared utilities
  components/         shared pieces
    ui.jsx            Logo, Mark, Reveal, SlotTitle, WaButton
    Composer.jsx      WhatsApp-style CTA (hero and final CTA)
    Phone.jsx         phone mockup that plays a chat script
    BackToTop.jsx     "up" button shown once the footer is on screen
    Icon.jsx          line icons
    WhatsAppIcon.jsx  full-colour WhatsApp logo
    ease.js           shared easing curve
  hooks/              behaviour without markup
    useChatScript.js  timing for the scripted chats
    useHideOnScroll.js  header hides on scroll down, returns on scroll up
    useScrolledPast.js  true once an element has scrolled out above the viewport
    useRail.js        horizontal card rail: arrow state, step, mouse drag
  sections/           one component + one stylesheet per page section, in page order
    Header, Hero, Intro, Story, Why, How, Family, Safety, Faq, FinalCta, Footer
  assets/
    brand/            Topbeam logo and mark
    logos/            operator and e-wallet logos
public/               favicon and touch icon
```

## Before launch

- Set the official number in `WA_NUMBER` (`src/config.js`).
- Replace the legal link placeholders in `FOOTER` (`src/content.js`): `#privasi`, `#syarat`, `#refund`, `#pengaduan`.
- Confirm or replace the example prices in `src/content.js` (`WHY.demo.total`, story chats).
- Add every `[LP-…]` tag from `CTA` to the QA test bank.
