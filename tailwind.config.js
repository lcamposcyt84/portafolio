/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#030305',
        'background-secondary': '#0a0a0f',
        primary: '#00f0ff',
        'primary-glow': 'rgba(0, 240, 255, 0.4)',
        secondary: '#b026ff',
        'secondary-glow': 'rgba(176, 38, 255, 0.4)',
        'glass-bg': 'rgba(255, 255, 255, 0.03)',
        'glass-border': 'rgba(255, 255, 255, 0.08)',
        muted: '#a0a0b0',
      },
      fontFamily: {
        sans: ['"Roboto Condensed"', 'system-ui', 'sans-serif'],
        display: ['Syncopate', 'system-ui', 'sans-serif'],
      },
      backdropBlur: {
        'xs': '2px',
      }
    },
  },
  plugins: [],
}
