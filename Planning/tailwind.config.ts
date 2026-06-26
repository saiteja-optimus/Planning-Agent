import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        noir: {
          950: '#050507',
          900: '#0a0a0f',
          800: '#111118',
          700: '#1a1a24',
          600: '#242433',
        },
        gold: {
          300: '#fde68a',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
        },
        ivory: '#f5f0e8',
        'film-red': '#dc2626',
      },
      fontFamily: {
        display: ['Georgia', 'serif'],
        mono: ['Courier New', 'monospace'],
      },
      animation: {
        'grain': 'grain 0.5s steps(1) infinite',
        'pulse-gold': 'pulse-gold 2s ease-in-out infinite',
        'develop': 'develop 0.8s ease-out forwards',
        'caret-blink': 'caret-blink 1s step-end infinite',
        'slide-in': 'slide-in 0.3s ease-out forwards',
        'draw-line': 'draw-line 2s ease-out forwards',
      },
      keyframes: {
        grain: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(-2%, -3%)' },
          '20%': { transform: 'translate(3%, 1%)' },
          '30%': { transform: 'translate(-1%, 4%)' },
          '40%': { transform: 'translate(2%, -1%)' },
          '50%': { transform: 'translate(-3%, 2%)' },
          '60%': { transform: 'translate(1%, -4%)' },
          '70%': { transform: 'translate(-2%, 3%)' },
          '80%': { transform: 'translate(3%, -2%)' },
          '90%': { transform: 'translate(-1%, 1%)' },
        },
        'pulse-gold': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.4' },
        },
        develop: {
          '0%': { filter: 'blur(8px)', opacity: '0', transform: 'scale(0.97)' },
          '100%': { filter: 'blur(0px)', opacity: '1', transform: 'scale(1)' },
        },
        'caret-blink': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        'slide-in': {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'draw-line': {
          '0%': { 'stroke-dashoffset': '1000' },
          '100%': { 'stroke-dashoffset': '0' },
        },
      },
    },
  },
  plugins: [],
}
export default config
