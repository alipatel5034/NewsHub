/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        paper: {
          light: '#f4f3ef',
          DEFAULT: '#ebeee7',
          dark: '#141c17',
          card: '#ffffff',
          cardDark: '#1b241e',
        },
        ink: {
          light: '#2b3a30',
          DEFAULT: '#1c2820',
          soft: '#4a5a4f',
          muted: '#6b746c',
          gold: '#cfa76e',
          goldDark: '#e5c185',
          bright: '#f0f4f1'
        },
      },
      fontFamily: {
        serif: ['"Fraunces"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'engraved': '0 2px 10px rgba(43, 58, 48, 0.08)',
        'engraved-hover': '0 8px 24px rgba(43, 58, 48, 0.14)',
        'dark-card': '0 4px 20px rgba(0, 0, 0, 0.4)',
      }
    },
  },
  plugins: [],
}
