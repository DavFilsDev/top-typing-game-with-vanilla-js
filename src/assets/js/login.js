document.addEventListener("DOMContentLoaded", function () {
  const themeToggle = document.querySelector("#modeActive");
  const themeIcon = document.querySelector(".fa-moon");
  const createAcount = document.getElementById("createAcount");
  const togglePassword = document.getElementById("togglePassword");
  const passwordField = document.getElementById("password");
  const password_confirm = document.getElementById("password_confirm");
  const password_create = document.getElementById("password_create");

  const body = document.body;
  const loginSection = document.getElementById("loginSection");
  const navbar = document.querySelector("#navbar");
  const loginBtn = document.getElementById("loginBtn");
  const loginBtnChild = document.getElementById("loginBtn_child");
  const registerBtn = document.getElementById("registerBtn");
  const about = document.getElementById("about");
  const aboutBtn = document.getElementById("aboutBtn");
  const aboutIcon = document.getElementById("aboutIcon");
  const aboutTechnical = document.getElementById("aboutTechnical");



  // 

 
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Retirer l'état actif de tous les liens
      navLinks.forEach(l => {
        l.querySelector('.nav-indicator').classList.replace('w-full', 'w-0');
      });
      
      // Activer le lien cliqué
      this.querySelector('.nav-indicator').classList.replace('w-0', 'w-full');
      
      // Votre logique existante pour afficher les sections...
      const target = this.getAttribute('data-target');
      showSection(target);
    });
  });
  
  function showSection(targetId) {
    // Votre logique pour afficher les sections...
  }


  // 

  loginBtn.addEventListener("click", () => {
    loginBtnChild.classList.remove("border-[#d0dddd]");
    loginBtnChild.classList.add("bg-[#bc16a5]", "border-[#bc16a5]");
    registerSection.classList.add("hidden");
    loginSection.classList.remove("hidden");
    about.classList.add("hidden");
    aboutTechnical.classList.add("hidden");
    aboutIcon.classList.add("hidden");
  });

  registerBtn.addEventListener("click", () => {
    loginBtnChild.classList.add("border-[#d0dddd]");
    loginBtnChild.classList.remove("bg-[#bc16a5]", "border-[#bc16a5]");
    loginSection.classList.add("hidden");
    registerSection.classList.remove("hidden");
    about.classList.add("hidden");
    aboutTechnical.classList.add("hidden");
    aboutIcon.classList.add("hidden");
  });
  aboutBtn.addEventListener("click", () => {
    loginBtnChild.classList.add("border-[#d0dddd]");
    loginBtnChild.classList.remove("bg-[#bc16a5]", "border-[#bc16a5]");
    loginSection.classList.add("hidden");
    registerSection.classList.add("hidden");
    about.classList.remove("hidden");
    aboutIcon.classList.remove("hidden");
    aboutTechnical.classList.remove("hidden");
  });

  aboutIcon.addEventListener("click", () => {
    const targetPosition = aboutTechnical.offsetTop - headerHeight - 40;
    aboutTechnical.classList.remove("hidden");

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  });

  const headerHeight = document.querySelector('header').offsetHeight;


    
  


  // onclick in "pas encore de compte"
  createAcount.addEventListener("click", () => {
    loginBtnChild.classList.add("border-[#d0dddd]");
    loginBtnChild.classList.remove("bg-[#bc16a5]", "border-[#bc16a5]");
    loginSection.classList.add("hidden");
    registerSection.classList.remove("hidden");
    about.classList.add("hidden");
    aboutTechnical.classList.add("hidden");
    aboutIcon.classList.add("hidden");
  });

  // onclick  to the eye, to show password
  togglePassword.addEventListener("click", () => {
    const isPassword = passwordField.type === "password";
    passwordField.type = isPassword ? "text" : "password";

    togglePassword.classList.toggle("fa-eye");
    togglePassword.classList.toggle("fa-eye-slash");
  });

  togglePasswordAcount.addEventListener("click", () => {
    const isPassword = password_create.type === "password";
    password_create.type = isPassword ? "text" : "password";

    togglePasswordAcount.classList.toggle("fa-eye");
    togglePasswordAcount.classList.toggle("fa-eye-slash");
  });

  togglePasswordConfirm.addEventListener("click", () => {
    const isPassword = password_confirm.type === "password";
    password_confirm.type = isPassword ? "text" : "password";

    togglePasswordConfirm.classList.toggle("fa-eye");
    togglePasswordConfirm.classList.toggle("fa-eye-slash");
  });

  let isDarkMode = true;

  themeToggle.addEventListener("click", function () {
    isDarkMode = !isDarkMode;
    toggleTheme();
  });

  function toggleTheme() {
    if (isDarkMode) {
      // Mode dark
      body.classList.remove("bg-[#d0dddd]");
      body.classList.add("bg-[#142829]");
      themeIcon.classList.remove("fa-sun");
      themeIcon.classList.add("fa-moon");
      loginSection.classList.add("bg-[#142829]");
      loginSection.classList.remove("bg-[#d0dddd]");
      navbar.classList.add("text-[#d0dddd]");
      navbar.classList.remove("text-black");
    } else {
      // Mode light
      body.classList.remove("bg-[#142829]");
      body.classList.add("bg-[#d0dddd]");
      themeIcon.classList.remove("fa-moon");
      themeIcon.classList.add("fa-sun");
      loginSection.classList.remove("bg-[#142829]");
      loginSection.classList.add("bg-[#d0dddd]");
      navbar.classList.add("text-black");
    }
  }
});
