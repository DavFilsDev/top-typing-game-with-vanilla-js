/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/pages/**/*.html",
    "./src/assets/js/**/*.js"  // Chemin modifié pour vos fichiers JS
  ],
  theme: {
    extend: {
      boxShadow: {
        'top': '0 -4px -10px 10px rgba(0, 0, 0, 0.1)',
        'right': '4px 0 6px -1px rgba(0, 0, 0, 0.1)',
        'bottom': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        'left': '-4px 0 6px -1px rgba(0, 0, 0, 0.1)',
        'all-sides': [
          '-4px 0 6px -1px rgba(0, 0, 0, 0.1)',
          '4px 0 6px -1px rgba(0, 0, 0, 0.1)',
          '0 -4px 10px 10px rgba(0, 0, 0, 0.1)',
          '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
        ],
      }
    },
  },
  plugins: [],
}