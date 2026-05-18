/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['"DM Serif Display"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
        body: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      colors: {
        navy: {
          950: '#050d1a',
          900: '#0a1628',
          800: '#0f2040',
          700: '#152a52',
          600: '#1e3a6e',
          500: '#2a4f94',
          400: '#3b6abf',
          300: '#5b8ad4',
        },
        sentry: {
          blue: '#2563eb',
          cyan: '#06b6d4',
          emerald: '#10b981',
          amber: '#f59e0b',
          rose: '#f43f5e',
          violet: '#8b5cf6',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out forwards',
        'slide-up': 'slideUp 0.4s cubic-bezier(0.16,1,0.3,1) forwards',
        'slide-in-left': 'slideInLeft 0.3s cubic-bezier(0.16,1,0.3,1) forwards',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'shimmer': 'shimmer 1.5s infinite',
        'toast-in': 'toastIn 0.35s cubic-bezier(0.16,1,0.3,1) forwards',
        'toast-out': 'toastOut 0.25s ease-in forwards',
      },
      keyframes: {
        fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
        slideUp: { from: { opacity: 0, transform: 'translateY(16px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        slideInLeft: { from: { opacity: 0, transform: 'translateX(-12px)' }, to: { opacity: 1, transform: 'translateX(0)' } },
        shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
        toastIn: { from: { opacity: 0, transform: 'translateX(100%) scale(0.9)' }, to: { opacity: 1, transform: 'translateX(0) scale(1)' } },
        toastOut: { from: { opacity: 1, transform: 'translateX(0) scale(1)' }, to: { opacity: 0, transform: 'translateX(100%) scale(0.9)' } },
      },
      boxShadow: {
        'glow-blue': '0 0 20px rgba(37,99,235,0.3)',
        'glow-emerald': '0 0 20px rgba(16,185,129,0.3)',
        'glow-amber': '0 0 20px rgba(245,158,11,0.3)',
        'card': '0 1px 3px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.08)',
        'card-dark': '0 1px 3px rgba(0,0,0,0.4), 0 4px 16px rgba(0,0,0,0.3)',
      },
    },
  },
  plugins: [],
}
