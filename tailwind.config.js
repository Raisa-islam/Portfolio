/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        'bg-alt': 'var(--bg-alt)',
        surface: 'var(--surface)',
        'text-1': 'var(--text-1)',
        'text-2': 'var(--text-2)',
        'text-3': 'var(--text-3)',
        'accent-1': 'var(--accent-1)',
        'accent-2': 'var(--accent-2)',
        'accent-glow': 'var(--accent-glow)',
        warm: 'var(--warm)',
        'warm-bg': 'var(--warm-bg)',
        'green-t': 'var(--green)',
        'green-bg': 'var(--green-bg)',
        'purple-t': 'var(--purple)',
        'purple-bg': 'var(--purple-bg)',
        'gray-b': 'var(--gray-b)',
        'gray-bg': 'var(--gray-bg)',
        border: 'var(--border)',
        'border-light': 'var(--border-light)',
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['Plus Jakarta Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        card: '14px',
      },
    },
  },
  plugins: [],
}
