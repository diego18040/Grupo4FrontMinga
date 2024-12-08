/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif']
      },
      colors: {
        rose: {
          200: '#FFE0DF',
          300: '#EF8481',
        },
        orange: {
          300: '#FFDFC8',
          400: '#FC9C57',
        },
        teal: {
          200: '#D1FBF0',
          300: '#00BA88',
        },
        purple: {
          300: '#E0DBFF',
          400: '#8883F0',
        }
      },
      fontSize: {
        '16px': '16px',
      },
      keyframes: {
        'kamui': {
          '0%': { transform: 'scale(0) rotate(0deg)', opacity: '0', filter: 'blur(10px)' },
          '50%': { transform: 'scale(0.5) rotate(360deg)', opacity: '0.5', filter: 'blur(5px)' },
          '100%': { transform: 'scale(1) rotate(720deg)', opacity: '1', filter: 'blur(0)' },
        },
      },
      animation: {
        'kamui': 'kamui 0.7s ease-out forwards',
      },
    },
  },
  plugins: [],
}
