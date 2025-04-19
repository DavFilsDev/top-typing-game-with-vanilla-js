document.addEventListener("DOMContentLoaded", function () {

  //START JAVASCRIPT for  "about.html"
  const aboutBtn = document.getElementById("aboutBtn");
  const aboutIcon = document.getElementById("aboutIcon");
  const aboutTechnical = document.getElementById("aboutTechnical");
  const headerHeight = document.querySelector('header').offsetHeight;


const currentPage = window.location.pathname.split("/").pop();

  // Dictionnaire des pages avec leur ID correspondant dans le header
  const navItems = {
    "about.html": "nav-about",
    "create.html": "nav-register",
    "login.html": "nav-login",
    "index.html": "nav-index"
  };

  // Active dynamiquement le bon lien
  const activeNavId = navItems[currentPage];
  if (activeNavId) {
    const activeElement = document.getElementById(activeNavId);
    activeElement.setAttribute("data-active", "true");
  }


   
    aboutIcon.addEventListener('click', function() {
      // Animation de défilement fluide
      aboutTechnical.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      
      // Animation visuelle supplémentaire (optionnelle)
     
    });
  

 


    
  





});
