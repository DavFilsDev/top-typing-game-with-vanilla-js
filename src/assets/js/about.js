document.addEventListener("DOMContentLoaded", function () {

  //START JAVASCRIPT for  "about.html"
  const aboutBtn = document.getElementById("aboutBtn");
  const aboutIcon = document.getElementById("aboutIcon");
  const aboutTechnical = document.getElementById("aboutTechnical");
  const headerHeight = document.querySelector('header').offsetHeight;
  aboutIcon.addEventListener("click", () => {
    const targetPosition = aboutTechnical.offsetTop - headerHeight - 40;
    aboutTechnical.classList.remove("hidden");

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  });

const currentPage = window.location.pathname.split("/").pop();

  // Dictionnaire des pages avec leur ID correspondant dans le header
  const navItems = {
    "about.html": "nav-about",
    "create.html": "nav-register",
    "login.html": "nav-login"
  };

  // Active dynamiquement le bon lien
  const activeNavId = navItems[currentPage];
  if (activeNavId) {
    const activeElement = document.getElementById(activeNavId);
    activeElement.setAttribute("data-active", "true");
  }



 


    
  





});
