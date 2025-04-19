
const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password');
const ErrorConnexion = document.getElementById('ErrorConnexion');
togglePassword.addEventListener('click', function () {
  // Toggle the type attribute
  const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
  passwordInput.setAttribute('type', type);

  // Toggle the icon
  this.classList.toggle('fa-eye');
  this.classList.toggle('fa-eye-slash');
});

 
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

         const loginForm = document.querySelector('#loginSection form');
    
    loginForm.addEventListener('submit', function(event) {
        // Empêcher le comportement par défaut du formulaire
        event.preventDefault();
        event.stopPropagation();

        const email = document.getElementById('email').value.trim();
        const password = passwordInput.value.trim();

        // Validation des champs
        if (!email || !password) {
            alert('Veuillez remplir tous les champs !');
            return;
        }

        // Récupérer les utilisateurs enregistrés
        const users = JSON.parse(localStorage.getItem('users')) || [];

        // Vérifier les informations de connexion
        const user = users.find(user => user.email === email && user.password === password);

        if (user) {
            // Stocker l'utilisateur connecté
            localStorage.setItem('currentUser', JSON.stringify(user));
            window.location.href = '../pages/home.html'; // Redirection vers la page d'accueil
        } else {
            // Afficher le message d'erreur
            const errorMessage = document.querySelector('#errorMessage');
            if (errorMessage) errorMessage.classList.remove('hidden');
            
            // Vérifier si l'email existe
            const emailExists = users.some(user => user.email === email);
            
            if (!emailExists) {
                ErrorConnexion.classList.remove('hidden')
                
                setTimeout(() => {
                    window.location.href = './create.html';
                }, 5000);
            } else {
                alert('Mot de passe incorrect !');
            }
        }
    });


