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
      },
      animation: {
        'spinExit': {
            '0%': { transform: 'rotate(0deg)' },
            '100%': { transform: 'rotate(180deg) translateY(10px)' },
        },
        'float': {
            '0%, 100%': { transform: 'translateY(0)' },
            '50%': { transform: 'translateY(-10px)' },
        },
        'textColorShift': {
            '0%, 100%': { color: '#142829' },
            '50%': { color: '#bc16a5' },
        },
        'shakeHorizontal': {
            '0%, 100%': { transform: 'translateX(0)' },
            '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-5px)' },
            '20%, 40%, 60%, 80%': { transform: 'translateX(5px)' },
        },
        'pulseOpacity': {
            '0%, 100%': { opacity: '1' },
            '50%': { opacity: '0.5' },
        },
        'appearDisappear': {
            '0%': { opacity: '0', transform: 'translateY(20px)' },
            '10%, 90%': { opacity: '1', transform: 'translateY(0)' },
            '100%': { opacity: '0', transform: 'translateY(-20px)' },
        }
      }
    },
  },
  plugins: [],
}