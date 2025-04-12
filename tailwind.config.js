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
        primary: '#3B82F6',
        secondary: '#10B981'
      }
    },
  },
  plugins: [],
}