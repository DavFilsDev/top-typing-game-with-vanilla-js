
const toggle = document.getElementById('toggle')
// Fonction pour changer de mode
function switchTheme() {
  if (document.documentElement.classList.contains('dark')) {
    document.documentElement.classList.remove('dark');
    localStorage.theme = 'light';
  } else {
    document.documentElement.classList.add('dark');
    localStorage.theme = 'dark';
  }
}

// Exemple d'utilisation avec un bouton

document.getElementById('toggle').addEventListener('click', switchTheme);