const toggle = document.getElementById('toggle');
const iconToggle = document.getElementById('iconToggle')

// Fonction pour appliquer le thème stocké
function applyTheme() {

  if (localStorage.theme === 'dark' || 
      (!('theme' in localStorage) && 
       window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}


// Fonction changer le thème 
function applyTheme() {
  const iconToggle = document.getElementById('iconToggle');
  
  if (localStorage.theme === 'dark' || 
      (!('theme' in localStorage) && 
       window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
   
    if (iconToggle) {
      iconToggle.classList.remove('fa-moon');
      iconToggle.classList.add('fa-sun');
    }
  } else {
    document.documentElement.classList.remove('dark');
   
    if (iconToggle) {
      iconToggle.classList.remove('fa-sun');
      iconToggle.classList.add('fa-moon');
    }
  }
}


// Function pour dark/light mode
(function() {
  if (localStorage.theme === 'dark' || 
      (!('theme' in localStorage) && 
       window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
})();


document.addEventListener('DOMContentLoaded', function() {
  const iconToggle = document.getElementById('iconToggle');
  const toggle = document.getElementById('toggle');
  
  
  if (iconToggle) {
    if (document.documentElement.classList.contains('dark')) {
      iconToggle.classList.remove('fa-moon');
      iconToggle.classList.add('fa-sun');
    } else {
      iconToggle.classList.remove('fa-sun');
      iconToggle.classList.add('fa-moon');
    }
  }
  
  // Fonction pour changer de mode
  function switchTheme() {
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      if (iconToggle) {
        iconToggle.classList.remove('fa-sun');
        iconToggle.classList.add('fa-moon');
      }
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      if (iconToggle) {
        iconToggle.classList.remove('fa-moon');
        iconToggle.classList.add('fa-sun');
      }
    }
  }
  
 
  if (toggle) {
    toggle.addEventListener('click', switchTheme);
  }
});


