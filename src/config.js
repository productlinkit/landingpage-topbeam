// Values in [brackets] are placeholders the team fills before launch.
export const WA_NUMBER = '6285187976622' // nomor resmi WhatsApp Topbeam (Nova)

// Pre-filled messages per button, without the tracking tag.
export const CTA = {
  nav: 'Halo Nova',
  hero: 'Halo Nova, saya mau isi ulang',
  pulsa: 'Halo Nova, saya mau beli pulsa',
  data: 'Halo Nova, saya mau beli paket data',
  ewallet: 'Halo Nova, saya mau top up e-wallet',
  ebbm: 'Halo Nova, saya mau beli e-BBM',
  keluarga: 'Halo Nova, saya mau kirim pulsa ke keluarga',
  faq: 'Halo Nova',
  footer: 'Halo Nova',
}

// The bracket tag tells the team which button started the chat. Nova ignores it.
export const TAG = (key) => ` [LP-${key}]`

const waUrl = (message, key) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message + TAG(key))}`

// Link for a fixed button message (key of CTA).
export const waLink = (key) => waUrl(CTA[key], key)

// Link for a free-text message (hero / final composer), tagged with the section key.
export const waText = (text, tag = 'hero') => waUrl(text, tag)

// Button click by section. Pushes to GTM's dataLayer when it is installed.
export function trackCta(section) {
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event: 'cta_click', section, target: 'wa.me' })
}
