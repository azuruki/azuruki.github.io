/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Habilita el modo oscuro usando la clase 'dark'
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        'animeace': ['"Anime Ace"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}