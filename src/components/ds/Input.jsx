import { useId } from 'react'
import { cx } from './cx'

// Labelled text field. `hint` shows under the field; `error` replaces it, turns the border red
// and is announced via aria-describedby + aria-invalid.
export function Input({ label, hint, error, id, className, ...rest }) {
  const auto = useId()
  const inputId = id ?? auto
  const noteId = `${inputId}-note`
  const note = error || hint
  return (
    <div className={cx('flex flex-col gap-1.5', className)}>
      {label && (
        <label htmlFor={inputId} className="text-sm font-semibold text-text">
          {label}
        </label>
      )}
      <input
        id={inputId}
        aria-invalid={error ? true : undefined}
        aria-describedby={note ? noteId : undefined}
        className={cx(
          'min-h-[48px] w-full rounded-xl border bg-bg px-4 text-[15px] text-text outline-none',
          'placeholder:text-text-muted transition-[border-color,box-shadow] duration-200',
          'hover:border-text-muted focus:border-focus focus:ring-2 focus:ring-focus',
          'disabled:cursor-not-allowed disabled:opacity-50',
          error ? 'border-error focus:border-error focus:ring-error' : 'border-border-strong',
        )}
        {...rest}
      />
      {note && (
        <p id={noteId} className={cx('text-[13px]', error ? 'text-error' : 'text-text-muted')}>
          {note}
        </p>
      )}
    </div>
  )
}
