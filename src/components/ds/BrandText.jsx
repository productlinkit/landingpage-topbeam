import { cx } from './cx'

// Words set in the brand blue (solid, no gradient): for the one or two words of a headline
// that carry the promise. 6.6:1 or better on every light background.
export function BrandText({ as: Tag = 'span', className, children, ...rest }) {
  return (
    <Tag className={cx('text-text-brand', className)} {...rest}>
      {children}
    </Tag>
  )
}
