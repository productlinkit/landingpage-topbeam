import logo from '../../assets/brand/topbeam-logo.webp'

// TopBeam mark: the white robot giving a thumbs-up, shown whole, never cropped. Used by the
// header/footer logo and the chat avatar. The page mascot (components/Nova.jsx) uses the posed
// artwork from the character sheet.
// Decorative by default; pass `title` when the mark stands alone without the wordmark.
export const LOGO_RATIO = 340 / 480 // width / height of the logo artwork

export function TopbeamMark({ height = 28, className, title }) {
  return (
    <img
      src={logo}
      width={Math.round(height * LOGO_RATIO)}
      height={height}
      alt={title ?? ''}
      aria-hidden={title ? undefined : true}
      className={className}
      decoding="async"
      draggable="false"
    />
  )
}
