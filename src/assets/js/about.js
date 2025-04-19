document.addEventListener("DOMContentLoaded", function () {

  const aboutBtn = document.getElementById("aboutBtn");
  const aboutIcon = document.getElementById("aboutIcon");
  const aboutTechnical = document.getElementById("aboutTechnical");
  const headerHeight = document.querySelector('header').offsetHeight;


const currentPage = window.location.pathname.split("/").pop();

  const navItems = {
    "about.html": "nav-about",
    "create.html": "nav-register",
    "login.html": "nav-login",
    "index.html": "nav-index"
  };

  const activeNavId = navItems[currentPage];
  if (activeNavId) {
    const activeElement = document.getElementById(activeNavId);
    activeElement.setAttribute("data-active", "true");
  }


   
    aboutIcon.addEventListener('click', function() {
      
      aboutTechnical.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      
   
     
    });
  

});
