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
  },
  fontSize: {
    '16px': '16px', // Definir un tamaño de fuente personalizado
  },
},
},
  plugins: [],
}