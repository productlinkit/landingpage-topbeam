import { cx } from './cx'

// Surface panel. tone: default (white) | brand (blue tint) | highlight (cyan tint, use once)
// | ink (the dark card). `interactive` lifts on hover with a neutral shadow.
const TONES = {
  default: 'border border-border bg-surface text-text',
  brand: 'bg-surface-brand text-text',
  highlight: 'bg-surface-highlight text-text',
  ink: 'bg-ink text-on-ink',
}

export function Card({ as: Tag = 'div', tone = 'default', interactive = false, className, children, ...rest }) {
  return (
    <Tag
      className={cx(
        'relative overflow-hidden rounded-3xl p-6',
        TONES[tone],
        interactive &&
          'transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_24px_48px_-24px_rgb(var(--shadow-rgb)/0.25)]',
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  )
}
