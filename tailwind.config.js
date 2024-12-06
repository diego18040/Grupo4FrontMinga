/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
      poppins: ['Poppins', 'sans-serif'], // Agregamos la fuente},
      montserrat: ['Montserrat','sans-serif'],
  },
  fontSize: {
    '12px': '12px',
    '16px': '16px', // Definir un tamaño de fuente personalizado
    '12px': '12px',
    '32px': '32px',
  },
},
},
  plugins: [],
}