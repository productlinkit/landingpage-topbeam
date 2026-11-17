// Every color maps to a semantic CSS variable from src/styles/globals.css, so Tailwind never
// holds a hex of its own: re-point a token there and Tailwind classes and plain CSS follow.
/** @type {import('tailwindcss').Config} */
export default {
  // Only the design-system layer uses utilities. The landing page sections keep their own CSS
  // classes (.container, .card, .btn), so scanning them would generate clashing utilities.
  content: ['./src/components/ds/**/*.{js,jsx}', './src/pages/**/*.{js,jsx}'],
  corePlugins: {
    preflight: false, // src/index.css already ships the reset
    container: false, // the site's .container is ours; use the <Container> component
  },
  theme: {
    extend: {
      // the motion system's curve, so `ease-out` in ds components matches the page
      transitionTimingFunction: { out: 'cubic-bezier(0.22, 1, 0.36, 1)' },
      colors: {
        bg: { DEFAULT: 'var(--color-bg)', alt: 'var(--color-bg-alt)' },
        surface: {
          DEFAULT: 'var(--color-surface)',
          sunken: 'var(--color-surface-sunken)',
          'sunken-hover': 'var(--color-surface-sunken-hover)',
          brand: 'var(--color-surface-brand)',
          'brand-strong': 'var(--color-surface-brand-strong)',
          highlight: 'var(--color-surface-highlight)',
        },
        border: { DEFAULT: 'var(--color-border)', strong: 'var(--color-border-strong)', brand: 'var(--color-border-brand)' },
        text: { DEFAULT: 'var(--color-text)', muted: 'var(--color-text-muted)', brand: 'var(--color-text-brand)' },
        link: 'var(--color-link)',
        accent: { DEFAULT: 'var(--color-accent)', hover: 'var(--color-accent-hover)' },
        'on-accent': 'var(--color-on-accent)',
        highlight: { DEFAULT: 'var(--color-highlight)', text: 'var(--color-highlight-text)' },
        'on-highlight': 'var(--color-on-highlight)',
        ink: { DEFAULT: 'var(--color-ink)', surface: 'var(--color-ink-surface)' },
        'on-ink': { DEFAULT: 'var(--color-on-ink)', muted: 'var(--color-on-ink-muted)' },
        focus: 'var(--color-focus)',
        success: { DEFAULT: 'var(--color-success)', bg: 'var(--color-success-bg)' },
        warning: { DEFAULT: 'var(--color-warning)', bg: 'var(--color-warning-bg)' },
        error: { DEFAULT: 'var(--color-error)', bg: 'var(--color-error-bg)' },
      },
      backgroundImage: {
        // the page's only decorative gradient
        beam: 'var(--beam-gradient)',
      },
      ringColor: { DEFAULT: 'var(--color-focus)' },
      fontFamily: { sans: 'var(--font)', mono: 'var(--mono)' },
    },
  },
}
