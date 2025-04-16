/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/pages/**/*.html",
    "./src/assets/js/**/*.js"  // Chemin modifié pour vos fichiers JS
  ],
  theme: {
    extend: {
      colors: {
        'primary_color': '#bc16a5',
        'primary_dark': '#142829',
        'primary_light': '#d0dddd',
        'red_color': '#f93b3b',
        'green_color': '#1cc74f'
      }
    },
  },
  plugins: [],
}