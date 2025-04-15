
  document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.querySelector('.fa-moon');
    let isDarkMode = true; 
    
    themeToggle.addEventListener('click', function() {
      isDarkMode = !isDarkMode;
      toggleTheme();
    });
    
    function toggleTheme() {
      const body = document.body;
      const loginSection=document.querySelector('#loginSection')
        const navbar = document.querySelector('#navbar')
   
      if (isDarkMode) {
        // Mode dark
        body.classList.remove('bg-[#d0dddd]');
        body.classList.add('bg-[#142829]');
        themeToggle.classList.remove('fa-sun');
        themeToggle.classList.add('fa-moon');
        loginSection.classList.add('bg-[#142829]')
        loginSection.classList.remove('bg-[#d0dddd]')
        navbar.classList.add('text-[#d0dddd]');
        navbar.classList.remove('text-black');
      } else {
        // Mode light
        body.classList.remove('bg-[#142829]');
        body.classList.add('bg-[#d0dddd]');
        themeToggle.classList.remove('fa-moon');
        themeToggle.classList.add('fa-sun');
        loginSection.classList.remove('bg-[#142829]')
        loginSection.classList.add('bg-[#d0dddd]')
        navbar.classList.add('text-black')
      }
      
    
    }
  });
