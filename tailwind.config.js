/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        rose: {
          200: '#FFE0DF',  // Color base
          300: '#EF8481',  // Color más intenso
        },
        orange: {
          300: '#FFDFC8',  // Color base
          400: '#FC9C57',  // Color más intenso
        },
        teal: {
          200: '#D1FBF0',  // Color base
          300: '#00BA88',  // Color más intenso
        },
        purple: {
          300: '#E0DBFF',  // Color base
          400: '#8883F0',  // Color más intenso
        }
      },
    },
  },
  plugins: [],
}



