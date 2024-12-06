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
      }
    }
  },
  plugins: [],
 }