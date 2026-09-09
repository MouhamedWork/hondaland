/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        carbon: {
          50: '#f7f8f9',
          100: '#eef0f2',
          200: '#dde1e6',
          300: '#c3c9d1',
          400: '#9aa3ae',
          500: '#6b7480',
          600: '#4a525d',
          700: '#2a3038',
          800: '#10141a',
          900: '#0b0d10',
          950: '#060709',
        },
        honda: {
          red: '#e11d2a',
          redLight: '#ff4b3a',
          redDeep: '#7a0d1d',
          silver: '#c9ccd2',
          mist: '#10131a',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'Cairo', 'Inter', 'sans-serif'],
        body: ['Inter', 'Cairo', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        wide: '0.06em',
        widestx: '0.18em',
      },
    },
  },
  plugins: [],
}