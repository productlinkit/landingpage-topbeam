import { createContext, useContext, useLayoutEffect, useRef, useState } from 'react'
import { Badge, BrandText, Button, Card, Container, Input, TopbeamMark } from '../components/ds'
import { Icon } from '../components/Icon'
import { contrastRatio, parseColor, rating, toHex } from '../lib/contrast'
import { cx } from '../components/ds/cx'

// /design-system: live preview of the TopBeam color system. Every hex and contrast ratio on
// this page is read from the browser's computed styles, so it always matches globals.css.

// BEAM palette, every hue sampled from the mascot
const SCALES = [
  { name: 'Navy', prefix: '--navy', note: 'Ink: visor maskot. Dasar section semi-gelap.', steps: [950, 900, 800, 700, 600] },
  { name: 'Pearl', prefix: '--pearl', note: 'Bodi putih maskot. Dasar section terang.', steps: [0, 50, 100, 200, 300] },
  { name: 'Electric blue', prefix: '--blue', note: 'Aksi: CTA, link, fokus.', steps: [50, 100, 200, 300, 500, 600, 700] },
  { name: 'Beam cyan', prefix: '--cyan', note: 'Energi: sorotan, glow, garis beam.', steps: [50, 200, 400, 800] },
  { name: 'Violet', prefix: '--violet', note: 'Kedalaman: ujung beam, aksen kecil.', steps: [100, 500, 600] },
]

const SEMANTIC = [
  {
    title: 'Background & surface (60 / 30)',
    items: [
      ['--color-bg', 'Halaman', '--color-text'],
      ['--color-bg-alt', 'Section selang-seling', '--color-text'],
      ['--color-surface', 'Card', '--color-text'],
      ['--color-surface-sunken', 'Panel dalam, chip, tombol sekunder', '--color-text'],
      ['--color-surface-brand', 'Card bertint brand', '--color-text'],
      ['--color-surface-highlight', 'Satu card cyan', '--color-text'],
      ['--color-ink', 'Section gelap', '--color-on-ink'],
      ['--color-border', 'Garis', null],
    ],
  },
  {
    title: 'Teks',
    items: [
      ['--color-text', 'Teks utama', '--color-bg', true],
      ['--color-text-muted', 'Teks sekunder', '--color-bg', true],
      ['--color-text-brand', 'Kata brand, ikon, link', '--color-bg', true],
      ['--color-on-ink', 'Teks di section gelap', '--color-ink', true],
      ['--color-on-ink-muted', 'Teks sekunder di gelap', '--color-ink', true],
    ],
  },
  {
    title: 'Accent (10%)',
    items: [
      ['--color-accent', 'Semua CTA utama', '--color-on-accent'],
      ['--color-accent-hover', 'CTA saat hover', '--color-on-accent'],
      ['--color-highlight', 'Cyan: kilau Nova, sorotan', '--color-on-highlight'],
      ['--color-accent-on-ink', 'Sorotan di section gelap', '--color-ink', true],
    ],
  },
  {
    title: 'Status',
    items: [
      ['--color-success', 'Berhasil', '--color-bg', true],
      ['--color-warning', 'Menunggu', '--color-bg', true],
      ['--color-error', 'Gagal', '--color-bg', true],
    ],
  },
]

const TEXT_ROWS = ['--color-text', '--color-text-muted', '--color-text-brand', '--color-success', '--color-warning', '--color-error', '--color-highlight-text']
const BG_COLS = ['--color-bg', '--color-bg-alt', '--color-surface', '--color-surface-brand', '--color-surface-highlight']
const FILL_PAIRS = [
  ['--color-on-accent', '--color-accent', 'Teks tombol utama'],
  ['--color-on-accent', '--color-accent-hover', 'Teks tombol saat hover'],
  ['--color-on-highlight', '--color-highlight', 'Teks di atas cyan'],
  ['--color-on-ink', '--color-ink', 'Teks utama di gelap'],
  ['--color-on-ink-muted', '--color-ink', 'Teks sekunder di gelap'],
  ['--color-accent-on-ink', '--color-ink-surface', 'Sorotan di card gelap'],
]

const TOKENS = [
  ...new Set([
    ...SCALES.flatMap((s) => s.steps.map((n) => `${s.prefix}-${n}`)),
    ...SEMANTIC.flatMap((g) => g.items.flatMap(([t, , pair]) => [t, pair].filter(Boolean))),
    ...TEXT_ROWS,
    ...BG_COLS,
    ...FILL_PAIRS.flatMap(([a, b]) => [a, b]),
  ]),
]

/* ---------- live token values ---------- */

const ColorsCtx = createContext({})

// Resolves every token to RGB from the browser's computed styles, once on mount.
function LiveColors({ children }) {
  const ref = useRef(null)
  const [colors, setColors] = useState({})
  useLayoutEffect(() => {
    const probe = document.createElement('span')
    ref.current.appendChild(probe)
    const out = {}
    for (const t of TOKENS) {
      probe.style.color = `var(${t})`
      out[t] = parseColor(getComputedStyle(probe).color)
    }
    probe.remove()
    // reading the browser's computed colours is a DOM sync, so state is set after layout
    // oxlint-disable-next-line react/set-state-in-effect
    setColors(out)
  }, [])
  return (
    <div ref={ref} className="contents">
      <ColorsCtx.Provider value={colors}>{children}</ColorsCtx.Provider>
    </div>
  )
}

function useRatio(fg, bg) {
  const c = useContext(ColorsCtx)
  if (!c[fg] || !c[bg]) return null
  return contrastRatio(c[fg], c[bg])
}

function Hex({ token }) {
  const c = useContext(ColorsCtx)[token]
  return <span className="font-mono text-xs text-text-muted">{c ? toHex(c) : '...'}</span>
}

function RatioBadge({ fg, bg }) {
  const r = useRatio(fg, bg)
  if (r == null) return <Badge>...</Badge>
  const grade = rating(r)
  const variant = grade === 'Fail' ? 'error' : grade === 'AA Large' ? 'warning' : 'success'
  return (
    <Badge variant={variant} title={`${fg} di atas ${bg}`}>
      {r.toFixed(2)}:1 {grade}
    </Badge>
  )
}

/* ---------- layout helpers ---------- */

function Block({ id, eyebrow, title, lead, alt, children }) {
  return (
    <section id={id} className={cx('py-12 sm:py-16', alt ? 'bg-bg-alt' : 'bg-bg')}>
      <Container>
        <div className="mb-8 flex max-w-2xl flex-col gap-3">
          {eyebrow && <span className="font-mono text-xs uppercase tracking-wider text-text-brand">{eyebrow}</span>}
          <h2 className="text-2xl font-medium tracking-tight text-text sm:text-3xl">{title}</h2>
          {lead && <p className="text-[15px] leading-relaxed text-text-muted">{lead}</p>}
        </div>
        {children}
      </Container>
    </section>
  )
}

/* ---------- sections ---------- */

function Scales() {
  return (
    <Block id="skala" eyebrow="01 · Palet" title="Skala tonal" lead="Palet mentah. Komponen tidak memakai skala ini langsung, tapi lewat token semantik di bawahnya.">
      <div className="flex flex-col gap-8">
        {SCALES.map((s) => (
          <div key={s.name}>
            <div className="mb-3 flex flex-wrap items-baseline gap-x-3">
              <h3 className="text-lg font-medium text-text">{s.name}</h3>
              <p className="text-sm text-text-muted">{s.note}</p>
            </div>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(84px,1fr))] gap-2">
              {s.steps.map((n) => {
                const t = `${s.prefix}-${n}`
                return (
                  <div key={t} className="overflow-hidden rounded-xl border border-border bg-surface">
                    <div className="h-14" style={{ background: `var(${t})` }} />
                    <div className="flex flex-col gap-0.5 p-2">
                      <span className="text-xs font-semibold text-text">{n}</span>
                      <Hex token={t} />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </Block>
  )
}

function Semantic() {
  return (
    <Block id="token" eyebrow="02 · Token" title="Token semantik" lead="Nama, hex hasil render, fungsi, dan kontras terhadap pasangannya. Ganti nilai di globals.css dan halaman ini ikut berubah." alt>
      <div className="flex flex-col gap-10">
        {SEMANTIC.map((g) => (
          <div key={g.title}>
            <h3 className="mb-4 text-lg font-medium text-text">{g.title}</h3>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-3">
              {g.items.map(([token, role, pair, isText]) => {
                const fill = isText ? pair : token
                const ink = isText ? token : pair
                return (
                  <div key={token} className="overflow-hidden rounded-2xl border border-border bg-surface">
                    <div className="flex h-16 items-end p-3 text-sm font-semibold" style={{ background: `var(${fill})`, color: ink ? `var(${ink})` : undefined }}>
                      {ink && 'Aa'}
                    </div>
                    <div className="flex flex-col gap-1.5 p-3">
                      <span className="font-mono text-xs text-text-brand">{token}</span>
                      <Hex token={token} />
                      <span className="text-xs text-text-muted">{role}</span>
                      {pair && <RatioBadge fg={ink} bg={fill} />}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </Block>
  )
}

function ContrastTable() {
  const c = useContext(ColorsCtx)
  const all = [...TEXT_ROWS.flatMap((fg) => BG_COLS.map((bg) => [fg, bg])), ...FILL_PAIRS.map(([fg, bg]) => [fg, bg])]
  const ratios = all.map(([fg, bg]) => (c[fg] && c[bg] ? contrastRatio(c[fg], c[bg]) : null))
  const ready = ratios.every((r) => r != null)
  const passed = ratios.filter((r) => r >= 4.5).length
  return (
    <Block id="kontras" eyebrow="03 · WCAG" title="Verifikasi kontras" lead="Teks biasa butuh minimal 4.5:1 (AA). Dihitung dari warna yang sedang tampil.">
      <div className="mb-5">
        {ready && (
          <Badge variant={passed === all.length ? 'success' : 'error'} dot>
            {passed}/{all.length} pasangan lulus AA
          </Badge>
        )}
      </div>
      <div className="overflow-x-auto rounded-2xl border border-border bg-surface">
        <table className="w-full min-w-[620px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-border text-text-muted">
              <th className="p-3 font-semibold">Teks</th>
              {BG_COLS.map((bg) => (
                <th key={bg} className="p-3 font-mono text-xs font-medium">{bg.replace('--color-', '')}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TEXT_ROWS.map((fg) => (
              <tr key={fg} className="border-b border-border last:border-0">
                <td className="p-3 font-mono text-xs text-text">{fg.replace('--color-', '')}</td>
                {BG_COLS.map((bg) => (
                  <td key={bg} className="p-2">
                    <div className="flex flex-wrap items-center gap-2 rounded-lg px-2 py-1.5" style={{ background: `var(${bg})` }}>
                      <span className="text-sm font-semibold" style={{ color: `var(${fg})` }}>Aa</span>
                      <RatioBadge fg={fg} bg={bg} />
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-3">
        {FILL_PAIRS.map(([fg, bg, label]) => (
          <div key={label} className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-3">
            <span className="grid h-10 w-14 flex-none place-items-center rounded-lg text-sm font-semibold" style={{ background: `var(${bg})`, color: `var(${fg})` }}>
              Aa
            </span>
            <div className="flex min-w-0 flex-col gap-1">
              <span className="text-xs text-text-muted">{label}</span>
              <RatioBadge fg={fg} bg={bg} />
            </div>
          </div>
        ))}
      </div>
    </Block>
  )
}

function Decor() {
  return (
    <Block id="dekor" eyebrow="04 · Beam" title="Satu gradient signature" lead="Beam (cyan ke biru ke violet) dipakai sebagai gradient tunggal: garis bawah kata kunci, halo maskot, dan garis beam di section gelap. Shadow selalu navy transparan." alt>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="relative grid h-56 place-items-center overflow-hidden rounded-3xl bg-ink">
          <div aria-hidden="true" className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-beam opacity-40 blur-3xl" />
          <TopbeamMark height={150} className="relative" />
          <span className="absolute bottom-3 left-4 font-mono text-xs text-on-ink-muted">--beam-gradient</span>
        </div>
        <div className="flex flex-col justify-center gap-3 rounded-3xl bg-surface p-6">
          <span className="font-mono text-xs text-text-muted">shadow</span>
          <div className="h-20 rounded-2xl bg-surface shadow-[0_24px_48px_-24px_rgb(var(--shadow-rgb)/0.25)]" />
          <p className="text-sm text-text-muted">Netral, dari --shadow-rgb (tint biru gelap), tidak pernah berwarna.</p>
        </div>
      </div>
    </Block>
  )
}

const STATES = [
  ['Default', {}],
  ['Hover', { state: 'hover' }],
  ['Active', { state: 'active' }],
  ['Focus', { state: 'focus' }],
  ['Disabled', { disabled: true }],
]
const VARIANTS = [
  ['primary', 'Primary (CTA)'],
  ['secondary', 'Secondary'],
  ['ghost', 'Ghost'],
  ['highlight', 'Highlight (jarang)'],
]

function Buttons() {
  return (
    <Block id="tombol" eyebrow="05 · Komponen" title="Tombol" lead="Satu tombol biru per tampilan adalah tempat mata jatuh. Baris terakhir interaktif: arahkan kursor, klik, atau tekan Tab.">
      <div className="overflow-x-auto rounded-2xl border border-border bg-surface p-4">
        <div className="grid min-w-[760px] grid-cols-[150px_repeat(5,1fr)] items-center gap-3">
          <span />
          {STATES.map(([s]) => (
            <span key={s} className="font-mono text-xs text-text-muted">{s}</span>
          ))}
          {VARIANTS.map(([v, label]) => (
            <Row key={v} variant={v} label={label} />
          ))}
        </div>
      </div>
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <Button>Chat Nova</Button>
        <Button variant="secondary">Lihat harga</Button>
        <Button variant="ghost">Nanti saja</Button>
        <Button size="sm">Kecil</Button>
        <Button size="lg">Besar</Button>
      </div>
    </Block>
  )
}

function Row({ variant, label }) {
  return (
    <>
      <span className="text-sm font-semibold text-text">{label}</span>
      {STATES.map(([s, props]) => (
        <div key={s}>
          <Button variant={variant} size="sm" tabIndex={-1} {...props}>
            Button
          </Button>
        </div>
      ))}
    </>
  )
}

function Elements() {
  return (
    <Block id="elemen" eyebrow="06 · Komponen" title="Card, badge, input" alt>
      <div className="grid gap-4 lg:grid-cols-4">
        {[
          ['default', 'Card', 'Surface dengan garis tipis.'],
          ['brand', 'Card brand', 'Tint biru, untuk produk dan demo.'],
          ['highlight', 'Card emas', 'Satu per halaman.'],
          ['ink', 'Card gelap', 'Untuk penawaran yang ditonjolkan.'],
        ].map(([tone, t, d]) => (
          <Card key={tone} tone={tone} interactive className="flex flex-col gap-2">
            <h3 className="text-lg font-medium">{t}</h3>
            <p className={cx('text-sm', tone === 'ink' ? 'text-on-ink-muted' : 'text-text-muted')}>{d}</p>
          </Card>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        <Badge>Neutral</Badge>
        <Badge variant="brand">Baru</Badge>
        <Badge variant="highlight">Terlaris</Badge>
        <Badge variant="success" dot>Lunas</Badge>
        <Badge variant="warning" dot>Menunggu bayar</Badge>
        <Badge variant="error" dot>Gagal</Badge>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Input label="Nomor HP" placeholder="0812 3456 7890" hint="Nomor tujuan isi ulang." />
        <Input label="Email" defaultValue="nova@topbeam" error="Format email belum benar." />
        <Input label="Kode promo" placeholder="Opsional" />
        <Input label="Nonaktif" placeholder="Tidak bisa diisi" disabled />
      </div>
    </Block>
  )
}

function MiniLanding() {
  const items = [
    ['zap', 'Pulsa & kuota', 'Pilih nominal di chat, bayar QRIS, selesai.'],
    ['wallet', 'E-wallet', 'Top up saldo tanpa pindah aplikasi.'],
    ['shield', 'Rincian dulu', 'Total harga tampil sebelum Anda bayar.'],
  ]
  return (
    <div id="contoh">
      <div className="border-y border-border bg-bg-alt py-3">
        <Container>
          <span className="font-mono text-xs text-text-muted">07 · Contoh: hero (bg) → fitur (bg-alt) → CTA (bg)</span>
        </Container>
      </div>
      <section className="relative overflow-hidden bg-bg py-16 sm:py-20">
        <Container className="grid items-center gap-10 md:grid-cols-[1.2fr_1fr]">
          <div className="flex flex-col items-start gap-5">
            <h2 className="max-w-[14ch] text-4xl font-medium leading-[1.05] tracking-tight sm:text-5xl">
              Isi ulang lewat <BrandText>satu chat.</BrandText>
            </h2>
            <p className="max-w-lg text-base leading-relaxed text-text-muted">
              Pulsa, kuota, dan e-wallet lewat WhatsApp bersama Nova. Rincian tampil sebelum Anda bayar.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button size="lg">Mulai di WhatsApp</Button>
              <Button variant="ghost" size="lg">Lihat cara kerja</Button>
            </div>
          </div>
          <div className="relative grid h-72 place-items-center">
            <div aria-hidden="true" className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-beam opacity-30 blur-3xl" />
            <TopbeamMark height={240} className="relative" />
          </div>
        </Container>
      </section>
      <section className="bg-bg-alt py-14">
        <Container>
          <div className="grid gap-4 md:grid-cols-3">
            {items.map(([icon, title, body]) => (
              <Card key={title} interactive className="flex flex-col gap-3 border-transparent">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-surface-brand-strong text-text-brand">
                  <Icon name={icon} size={22} />
                </span>
                <h3 className="text-lg font-medium">{title}</h3>
                <p className="text-sm text-text-muted">{body}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>
      <section className="bg-bg py-14">
        <Container>
          <Card tone="ink" className="flex flex-col items-start gap-4 p-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-2xl font-medium tracking-tight">Siap isi ulang?</h3>
              <p className="mt-1 text-sm text-on-ink-muted">Satu chat, rincian jelas, bayar pakai QRIS.</p>
            </div>
            <Button size="lg">Chat sekarang</Button>
          </Card>
        </Container>
      </section>
    </div>
  )
}

/* ---------- page ---------- */

export default function DesignSystem() {
  return (
    <div className="min-h-screen bg-bg font-sans text-text">
      <header className="sticky top-0 z-40 border-b border-border bg-surface">
        <Container className="flex min-h-[64px] items-center justify-between gap-3 py-2">
          <a href="/" className="flex items-center gap-3 rounded-lg" aria-label="Kembali ke beranda">
            <TopbeamMark height={30} />
            <span className="text-sm font-semibold text-text">Design System</span>
          </a>
          <span className="font-mono text-xs text-text-muted">src/styles/globals.css</span>
        </Container>
      </header>
      <LiveColors>
        <Scales />
        <Semantic />
        <ContrastTable />
        <Decor />
        <Buttons />
        <Elements />
        <MiniLanding />
      </LiveColors>
    </div>
  )
}
