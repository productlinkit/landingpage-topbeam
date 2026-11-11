// Values in [brackets] are placeholders the team fills before launch.
export const WA_NUMBER = '6285187976622' // nomor resmi WhatsApp Topbeam (Nova)

// Pre-filled messages per button.
export const CTA = {
  nav: 'Halo Nova',
  pulsa: 'Halo Nova, saya mau beli pulsa',
  data: 'Halo Nova, saya mau beli paket data',
  ewallet: 'Halo Nova, saya mau top up e-wallet',
  ebbm: 'Halo Nova, saya mau beli e-BBM',
  keluarga: 'Halo Nova, saya mau kirim pulsa ke keluarga',
  faq: 'Halo Nova',
  footer: 'Halo Nova',
}

const waUrl = (message) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`

// Link for a fixed button message (key of CTA).
export const waLink = (key) => waUrl(CTA[key])

// Link for a free-text message (hero / final composer).
export const waText = (text) => waUrl(text)

// Button click by section. Pushes to GTM's dataLayer when it is installed.
export function trackCta(section) {
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event: 'cta_click', section, target: 'wa.me' })
}
