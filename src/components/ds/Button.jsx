import { cx } from './cx'

// Variants (all colors are semantic tokens from src/styles/globals.css):
//   primary    solid action blue: every main call to action. One per view is the one that wins.
//   secondary  outline, for the second action next to a primary
//   ghost      soft grey pill, for quiet actions
//   highlight  beam cyan, rare: a single celebratory moment, never next to a primary
// `state` forces a look (hover | active | focus) so the /design-system page can show it.
const BASE =
  'relative inline-flex items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap select-none ' +
  'transition-[transform,box-shadow,background-color,border-color,color] duration-200 ease-out ' +
  'outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-bg ' +
  'data-[state=focus]:ring-2 data-[state=focus]:ring-focus data-[state=focus]:ring-offset-2 data-[state=focus]:ring-offset-bg ' +
  'active:scale-[0.97] data-[state=active]:scale-[0.97] ' +
  'disabled:pointer-events-none disabled:opacity-45 aria-disabled:pointer-events-none aria-disabled:opacity-45'

const VARIANTS = {
  // one solid action blue; hover: darker blue, slight lift, soft glow
  primary:
    'bg-accent text-on-accent ' +
    'hover:bg-accent-hover hover:-translate-y-px hover:shadow-[var(--accent-glow)] ' +
    'data-[state=hover]:bg-accent-hover data-[state=hover]:-translate-y-px data-[state=hover]:shadow-[var(--accent-glow)]',
  secondary:
    'border border-border-strong bg-surface text-text ' +
    'hover:border-text-brand hover:text-text-brand ' +
    'data-[state=hover]:border-text-brand data-[state=hover]:text-text-brand',
  ghost:
    'bg-surface-sunken text-text ' +
    'hover:bg-surface-sunken-hover data-[state=hover]:bg-surface-sunken-hover',
  highlight:
    'bg-highlight text-on-highlight ' +
    'hover:-translate-y-px data-[state=hover]:-translate-y-px',
}

const SIZES = {
  sm: 'min-h-[40px] px-4 text-sm',
  md: 'min-h-[48px] px-6 text-[15px]',
  lg: 'min-h-[56px] px-8 text-base',
}

export function Button({
  as: Tag = 'button',
  variant = 'primary',
  size = 'md',
  state,
  className,
  type,
  children,
  ...rest
}) {
  return (
    <Tag
      type={Tag === 'button' ? (type ?? 'button') : type}
      data-state={state}
      className={cx(BASE, VARIANTS[variant], SIZES[size], className)}
      {...rest}
    >
      {children}
    </Tag>
  )
}
