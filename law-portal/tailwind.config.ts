import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--lnk-blue)',
        'primary-hover': 'var(--lnk-blue-hover)',
        'surface-base': 'var(--lnk-card)',
        border: 'var(--lnk-border)',
        background: 'var(--lnk-bg)',
        text: 'var(--lnk-text)',
        'text-muted': 'var(--lnk-text-muted)',
        success: 'var(--lnk-success)',
        danger: 'var(--lnk-danger)'
      },
      borderRadius: {
        xl: 'var(--radius)',
        lg: 'var(--radius)',
        md: '10px',
        full: '9999px'
      },
      boxShadow: {
        card: '0 2px 6px rgba(15, 23, 42, 0.06)',
        'card-hover': '0 10px 24px rgba(15, 23, 42, 0.12)'
      },
      fontFamily: {
        ui: [
          'Segoe UI',
          'Inter',
          'system-ui',
          '-apple-system',
          'Helvetica Neue',
          'Arial',
          'sans-serif'
        ]
      },
      spacing: {
        13: '3.25rem'
      },
      transitionTimingFunction: {
        default: 'cubic-bezier(0.4, 0, 0.2, 1)'
      },
      transitionDuration: {
        default: '150ms'
      }
    }
  },
  plugins: []
}

export default config
