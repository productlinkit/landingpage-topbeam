import { cx } from './cx'

// Small status / label chip.
//   neutral  quiet label                brand    blue tint (new, featured)
//   highlight cyan, once per view        success / warning / error   transaction status
const VARIANTS = {
  neutral: 'border-border bg-surface-sunken text-text-muted',
  brand: 'border-transparent bg-surface-brand-strong text-text-brand',
  highlight: 'border-transparent bg-highlight text-on-highlight',
  success: 'border-transparent bg-success-bg text-success',
  warning: 'border-transparent bg-warning-bg text-warning',
  error: 'border-transparent bg-error-bg text-error',
}

export function Badge({ variant = 'neutral', dot = false, className, children, ...rest }) {
  return (
    <span
      className={cx(
        'inline-flex min-h-[26px] items-center gap-1.5 rounded-full border px-2.5 text-xs font-semibold leading-none',
        VARIANTS[variant],
        className,
      )}
      {...rest}
    >
      {dot && <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-current" />}
      {children}
    </span>
  )
}
