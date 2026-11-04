// Values in [brackets] are placeholders the team fills before launch.
export const WA_NUMBER = '62XXXXXXXXXX' // [nomor resmi WhatsApp Topbeam]

// Pre-filled messages per button. The bracket tag tells us which button started the chat;
// Nova must ignore it in its reply. Add every tag to the QA test bank before launch.
export const CTA = {
  nav: 'Halo Nova [LP-nav]',
  pulsa: 'Halo Nova, saya mau beli pulsa [LP-pulsa]',
  data: 'Halo Nova, saya mau beli paket data [LP-data]',
  ewallet: 'Halo Nova, saya mau top up e-wallet [LP-ewallet]',
  ebbm: 'Halo Nova, saya mau beli e-BBM [LP-ebbm]',
  keluarga: 'Halo Nova, saya mau kirim pulsa ke keluarga [LP-keluarga]',
  faq: 'Halo Nova [LP-faq]',
  footer: 'Halo Nova [LP-footer]',
}

const waUrl = (message) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`

// Link for a fixed button message (key of CTA).
export const waLink = (key) => waUrl(CTA[key])

// Link for a free-text message (hero / final composer). `tag` keeps the source visible to Nova's analytics.
export const waText = (text, tag) => waUrl(`${text} [LP-${tag}]`)

// Button click by section. Pushes to GTM's dataLayer when it is installed.
export function trackCta(section) {
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event: 'cta_click', section, target: 'wa.me' })
}
