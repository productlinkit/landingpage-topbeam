import { useId } from 'react'

const HANDSET =
  'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z'

/**
 * Official full-colour WhatsApp logo as inline SVG (no CDN, no image file).
 * The viewBox has a little padding so the rim and tail are never cropped.
 */
export function WhatsAppIcon({ size = 24 }) {
  // Unique id per instance, so several icons on the page don't share one gradient
  const gradient = `wa-green-${useId().replace(/:/g, '')}`
  return (
    <svg width={size} height={size} viewBox="1 1 46 46" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={gradient} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" style={{ stopColor: 'var(--wa-logo-from)' }} />
          <stop offset="1" style={{ stopColor: 'var(--wa-logo-to)' }} />
        </linearGradient>
      </defs>
      <path
        fill={`url(#${gradient})`}
        d="M24 2.5C12.13 2.5 2.5 12.13 2.5 24c0 3.83 1.01 7.5 2.93 10.73L2.5 45.5l11.1-2.9A21.4 21.4 0 0 0 24 45.5c11.87 0 21.5-9.63 21.5-21.5S35.87 2.5 24 2.5z"
      />
      <path
        fill="none"
        style={{ stroke: 'var(--wa-on)' }}
        strokeWidth="2.6"
        strokeLinejoin="round"
        d="M24 6.2C14.17 6.2 6.2 14.17 6.2 24c0 3.37.95 6.6 2.73 9.4l.43.68-1.76 6.43 6.6-1.73.66.39A17.73 17.73 0 0 0 24 41.8c9.83 0 17.8-7.97 17.8-17.8S33.83 6.2 24 6.2z"
      />
      <path style={{ fill: 'var(--wa-on)' }} transform="translate(-0.6 -0.2) scale(2.05)" d={HANDSET} />
    </svg>
  )
}
