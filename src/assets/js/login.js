
const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password');

togglePassword.addEventListener('click', function () {
  // Toggle the type attribute
  const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
  passwordInput.setAttribute('type', type);

  // Toggle the icon
  this.classList.toggle('fa-eye');
  this.classList.toggle('fa-eye-slash');
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

  