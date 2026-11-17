import { cx } from './cx'

// Centered page column: 1200px content, 16px gutter on phones, 32px / 40px on larger screens
export function Container({ as: Tag = 'div', className, children, ...rest }) {
  return (
    <Tag className={cx('mx-auto w-full max-w-[1280px] px-4 sm:px-8 lg:px-10', className)} {...rest}>
      {children}
    </Tag>
  )
}
