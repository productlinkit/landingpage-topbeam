# Topbeam Landing Revamp Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the old landing page with the Bloop-style revamp: Nova mascot, real-transcript chat replays, Topbeam colours.

**Architecture:** Same React 19 + Vite + motion app. Copy stays in `src/content.js`; chat transcripts move to an import-free `src/data/transcripts.js`; chat pacing is a pure function in `src/lib/timeline.js` so it can be tested with `node --test` (no new dependencies). One `.jsx` + `.css` per section, below-the-fold sections lazy.

**Tech Stack:** React 19, Vite 8, motion 14, oxlint, Node built-in test runner.

**Spec:** `docs/superpowers/specs/2026-11-11-topbeam-revamp-design.md`

## Global Constraints

- Bahasa Indonesia, formal "Anda", no em dash (`—`) anywhere in `src/`, no emoji in headlines.
- Banned strings in `src/` copy: `pertama`, `satu-satunya`, `kurang dari satu menit`, `Terverifikasi`, `terverifikasi`, `ingat nomor`.
- Every WhatsApp link: `https://wa.me/6285187976622?text=` + encoded message ending in ` [LP-<key>]`, keys: nav, hero, pulsa, data, ewallet, ebbm, keluarga, faq, footer.
- Mask the tester's number as `0812-xxxx-6536`; no other real number on the page except the official one.
- Build budget: JS+CSS gzip < 250 KB; whole `dist/` < 1 MB.
- Animations: transform/opacity only; everything readable and static under `prefers-reduced-motion`.
- Mobile first; layout must work at 360 px with 16 px gutters and no horizontal scroll.

## Review Focus

1. Reduced motion: replays must show the full transcript immediately, marquee becomes a static wrap. Test: `timeline(script, {reduce:true})` returns all steps at t=0.
2. Switching Replay scenario mid-playback must restart cleanly (no bubbles from the old scenario). Covered by `key` on the chat body; check manually in Task 6.
3. Composer intent text with a tag must stay readable: the visible pill shows the message without the tag, the href carries the tag. Test in Task 1 (`waText` adds tag).
4. Long Nova list messages (12 price rows) on a 360 px screen: the chat window shows a shortened list (max 4 rows + "…"). Test in Task 2 (`shortList`).
5. Off-screen chats must not run timers (battery on cheap phones): ChatWindow passes `active` from `useInView`. Check manually.

---

### Task 1: Config tags and check scripts

**Files:**
- Modify: `src/config.js`
- Create: `scripts/check-copy.mjs`, `scripts/check-size.mjs`, `tests/config.test.mjs`
- Modify: `package.json` (scripts `test`, `check`)

**Interfaces:**
- Produces: `waLink(key) -> string`, `waText(text, tag='hero') -> string`, `CTA` (messages without tags), `TAG(key) -> " [LP-key]"`.

- [ ] Step 1: Write `tests/config.test.mjs` with `node:test`: for every key of `CTA`, `waLink(key)` starts with `https://wa.me/6285187976622?text=` and `decodeURIComponent(text)` ends with `[LP-${key}]`; `waText('Halo Nova, saya mau beli pulsa','hero')` decodes to `Halo Nova, saya mau beli pulsa [LP-hero]`.
- [ ] Step 2: `node --test tests/` → FAIL (no tag yet).
- [ ] Step 3: Add the tag in `waUrl`; `waText(text, tag)` second arg.
- [ ] Step 4: `scripts/check-copy.mjs`: walk `src/**/*.{js,jsx,css,html}` + `index.html`, exit 1 listing file:line for `—` or any banned string (case-insensitive). `scripts/check-size.mjs`: sum gzip sizes of `dist/assets/*.{js,css}` (zlib) and raw size of `dist/`, exit 1 over budget, print both.
- [ ] Step 5: `package.json`: `"test": "node --test tests/"`, `"check": "node scripts/check-copy.mjs && npm run build && node scripts/check-size.mjs"`. Run `npm test` → PASS.
- [ ] Step 6: Commit `feat: tag every WhatsApp link and add copy/size checks`.

### Task 2: Transcripts and timeline

**Files:**
- Create: `src/data/transcripts.js`, `src/lib/timeline.js`, `tests/timeline.test.mjs`, `tests/transcripts.test.mjs`
- Create: `src/hooks/useChatReplay.js`; Delete: `src/hooks/useChatScript.js`

**Interfaces:**
- Produces: `TRANSCRIPTS = { pulsa, data, ewallet }`, each `{ id, date: '2026-11-11'|'2026-11-09', steps: Step[] }`; `Step = { from: 'me'|'nova'|'card', text?, list?: string[], tail?, card?: 'qris'|'receipt' }`.
- Produces: `timeline(steps, { reduce=false, base=900, perChar=12, max=1600, typing=900 }) -> { at:number, index:number, typingBefore:boolean }[]`; `shortList(list, n=4) -> string[]` (first n then `'…'` when longer).
- Produces: `useChatReplay(steps, active) -> { shown:number, typing:boolean, cycle:number }` (loops after 4000 ms hold).

- [ ] Step 1: Tests. `transcripts.test.mjs`: pulsa has 8 steps: step 6 (index 5) is nova text containing `Rp 25.297 (sudah termasuk biaya QRIS)`, steps 7 and 8 are `card` steps `qris`, `receipt`; no step text matches `/62812\d{6,}/`; ewallet list equals `['DANA','GoPay','OVO','ShopeePay','LinkAja']`. `timeline.test.mjs`: times strictly increase; nova steps have `typingBefore:true`; each gap ≤ max+typing; `reduce:true` gives every `at === 0`; `shortList` of 12 → 5 items ending `'…'`.
- [ ] Step 2: `npm test` → FAIL.
- [ ] Step 3: Write transcripts verbatim from the spec "Real transcripts" (pulsa list rows: `Telkomsel 10.000 - Rp 10.718`, `Telkomsel 25.000 - Rp 25.297`, `Telkomsel Rp. 50.000 - Rp 52.061`, `Telkomsel 20.000 - Rp 20.818`, plus the rest from the spec; data rows `Telkomsel Flash 1GB / 1 hari - Rp 7.951`, `Tsel Flash 5GB/3hr - Rp 20.500`, `Telkomsel Flash 8GB / 30 Hari - Rp 44.921`). Implement `timeline` (gap = clamp(base + perChar*len, base, max), plus `typing` before nova) and the hook on top of it with `setTimeout`, paused when `!active`.
- [ ] Step 4: `npm test` → PASS. Commit `feat: real Nova transcripts and replay timeline`.

### Task 3: Design tokens and base styles

**Files:** Modify `src/index.css`, `index.html` (theme-color `#f7f7f4`, meta title/description from spec SEO).

- [ ] Step 1: Tokens on `:root`: `--bg:#f7f7f4; --surface:#fff; --soft:#efefea; --ink:#12173a; --body:#3d4266; --muted:#5f6382; --line:#e4e4dc; --night:#0b0f2b; --night-2:#161b3d; --night-text:#c5c8e0; --lilac:#ebe5ff; --sky:#dcefff; --aqua:#d4f6f4; --gold:#fff0c4; --violet:#6a28c6; --blue:#2d4fe0; --cyan:#21c7d9; --star:#f4b740; --beam: linear-gradient(90deg,#6a28c6,#2d4fe0,#21c7d9)`. Keep existing radius/shadow/pad tokens; `.h-display` clamp(44px, 7vw, 88px), letter-spacing -0.04em, weight 600.
- [ ] Step 2: `npm run build` passes; `node scripts/check-copy.mjs` passes. Commit `style: Bloop-style tokens in Topbeam colours`.

### Task 4: Nova mascot

**Files:** Create `src/components/Nova.jsx`, `src/components/Nova.css`.

**Interfaces:**
- Produces: `<Nova pose="idle"|"wave"|"phone"|"wifi"|"wallet"|"fuel"|"shield"|"think"|"cheer" size={number=160} track={bool=false} beam={bool=false} className />` decorative (`aria-hidden`).

- [ ] Step 1: Inline SVG, viewBox `0 0 200 200`: rounded four-point star body (path with quadratic curves between points, fill radial gold `#ffd36b`→`#f4b740`→`#e59a2e`), navy eyes `#12173a` with white highlight, cheeks `#ff9db0` at 0.6 opacity, smile path. Left/right points are separate `<g>` "arms" rotated around the body joint for `wave`/`point`. Props drawn as small icon groups at the right arm (phone, wifi, wallet, fuel, shield) in brand blue; `think` shows three dots above; `cheer` raises both arms + sparkles.
- [ ] Step 2: Motion: idle float y [0,-8,0] 4 s loop; blink by scaling eye `scaleY` [1,0.1,1] every 4.5 s; wave arm rotate [0,-24,8,-18,0] 1.6 s repeat with 2 s delay; `track` moves pupils up to 4 px toward pointer (window `pointermove`, rAF, desktop `(hover:hover)` only); `beam` renders a blurred gradient trail behind the body. All loops off under `useReducedMotion()`.
- [ ] Step 3: Verify at size 40 and 220 in the hero during Task 5. `npm run lint` clean. Commit `feat: Nova mascot`.

### Task 5: Hero, header and chat window

**Files:** Create `src/components/ChatWindow.jsx` + `.css` (replaces `Phone.jsx`/`Phone.css`, delete those); Modify `src/sections/Hero.jsx`/`.css`, `src/sections/Header.css`, `src/content.js` (HERO, PHONE).

**Interfaces:**
- Consumes: `TRANSCRIPTS`, `useChatReplay`, `shortList`, `Nova`.
- Produces: `<ChatWindow steps label dark={false} replayKey="" title="Topbeam" sub="Nova · akun bisnis" />` rendering me/nova bubbles, list rows via `shortList`, typing dots, and `card` steps (`qris`: "Langkah berikutnya · Bayar dengan QRIS · Tautan berlaku 15 menit"; `receipt`: "Bukti transaksi dikirim di chat yang sama").

- [ ] Step 1: Hero copy from spec section 2. Layout: grid copy left / stage right (stacks under 960 px, stage after copy). Stage = glow + `<Nova pose="wave" track beam size={220}>` + two floating pills (y loop, offset phases) + `<ChatWindow steps={TRANSCRIPTS.pulsa.steps}>` card.
- [ ] Step 2: Header: keep behaviour, restyle to Bloop pill nav (centre pill `--soft`, dark CTA).
- [ ] Step 3: Run `npm run build` and view at 360/1280 via `npm run preview`; no horizontal scroll (`document.documentElement.scrollWidth === innerWidth`). Commit `feat: revamp hero with Nova and real chat replay`.

### Task 6: Body sections

**Files:** Rewrite `src/sections/{Logos,Products,How,Replay,Why,Faq,FinalCta,Footer}.jsx/.css`; Create `src/sections/Safety.jsx/.css`; Delete `src/sections/Family.*`, `src/components/Vignettes.*`; Modify `src/App.jsx`, `src/content.js`.

**Interfaces:** Consumes `Nova`, `ChatWindow`, `TRANSCRIPTS`, `WaButton`, `Composer`, `SectionHead`, `Reveal`.

- [ ] Step 1: Copy in `content.js` from spec sections 3 to 11 (FAQ from plan minus banned claims; replace the "akun resmi" answer with the official number `+62 851-8797-6622`).
- [ ] Step 2: Logos: two marquee rows (CSS `@keyframes` translateX, duplicated list, `aria-hidden` on the copy), pause on hover.
- [ ] Step 3: Products: 4 tinted cards (lilac, sky, aqua, gold) with `Nova` pose phone/wifi/wallet/fuel at 96 px, hover lift, `WaButton cta` per card.
- [ ] Step 4: How: 4-step stepper, beam progress bar width animates, auto-advance every 4 s while in view and until the user taps, panel per step (chat bubble / confirmation rows / "Balas YA" / QRIS card).
- [ ] Step 5: Replay (dark, `id` none): scenario buttons (`aria-pressed`), `<ChatWindow dark replayKey={id}>`, stats cards.
- [ ] Step 6: Why (3 pillars), Safety (Nova shield + 3 points), Faq (question list as buttons, chat panel with typing then answer, `aria-live="polite"`), FinalCta (Nova wave + Composer tag footer), Footer.
- [ ] Step 7: `App.jsx` order: Header, Hero, Logos, Products, How, Replay, Why, Safety, Faq, FinalCta, Footer, BackToTop.
- [ ] Step 8: `npm test && npm run lint && npm run check` → all pass. Commit `feat: revamp body sections`.

### Task 7: Final verification

- [ ] Step 1: `npm run check` prints gzip JS+CSS < 250 KB and dist < 1 MB.
- [ ] Step 2: Manual pass at 360, 768, 1280 px and with reduced motion emulated; every CTA opens wa.me with its tag; replay scenario switching; FAQ keyboard use.
- [ ] Step 3: Update `README.md` structure table (new files, removed ones, `npm test`, `npm run check`). Commit `docs: update README for revamp`.
