const togglePassword = document.getElementById('togglePasswordAcount');
const passwordInput = document.getElementById('password_create');
const togglePasswordConfirm = document.getElementById('togglePasswordConfirm');
const password_confirm = document.getElementById('password_confirm');
const confirmPassword= document.getElementById('confirmPassword');
const mailConfirm=document.getElementById('mailConfirm')
togglePassword.addEventListener('click', function () {
  // Toggle the type attribute
  const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
  passwordInput.setAttribute('type', type);

  // Toggle the icon
  this.classList.toggle('fa-eye');
  this.classList.toggle('fa-eye-slash');
});

togglePasswordConfirm.addEventListener('click', function () {
  // Toggle the type attribute
  const type = password_confirm.getAttribute('type') === 'password' ? 'text' : 'password';
  password_confirm.setAttribute('type', type);

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

   const letters = "azertyuiopqsdfghjklmwxcvbn;:";
  const container = document.getElementById("floating-letters");

  for (let i = 0; i < 80; i++) {
    const span = document.createElement("span");
    span.innerText = letters[Math.floor(Math.random() * letters.length)];
    span.className = "floating-letter";

    // Crée une animation visible
    const animationDuration = (3 + Math.random() * 5).toFixed(2);
    span.style.animationDuration = `${animationDuration}s`;

    // Position horizontale : côté gauche (0–20vw) ou droit (80–100vw)
    const side = Math.random() < 0.5 ? 'left' : 'right';
    const xOffset = Math.random() * 20;
    span.style.left = side === 'left' ? `${10+xOffset}vw` : `${70+ xOffset}vw`;
    span.style.right = side === 'right' ? `${10+xOffset}vw` : `${10+xOffset}vw`;
    // Position verticale (10–85vh pour ne pas trop toucher le haut et bas)
    span.style.top = `${10 + Math.random() * 75}vh`;

    // Taille variable
    const fontSize = 18 + Math.random() * 12;
    span.style.fontSize = `${fontSize}px`;

    container.appendChild(span);
  }

  

  // 
  // 
  // 
  // 


  document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.querySelector('#registerSection form');
    if (!registerForm) return;

    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password_create').value;
        const confirmPassword = document.getElementById('password_confirm').value;
        const champConfirm=document.getElementById('champConfirm')

        // Validation
        
        if (!email || !password || !confirmPassword) {
            alert('Tous les champs sont obligatoires !');
            return;
        }

        if (password !== confirmPassword) {
           champConfirm.classList.remove('hidden');
           
           return;
          
        }

        // Vérification existence utilisateur
        let users = JSON.parse(localStorage.getItem('users')) || [];
        
        if (users.some(user => user.email === email)) {
        
           mailConfirm.classList.remove('hidden');
            return;
        }

        // Enregistrement
        users.push({ email, password });
        localStorage.setItem('users', JSON.stringify(users));
        
        console.log('Utilisateur enregistré :', { email, password }); // Debug

 
  

        alert('Compte créé avec succès !');
        window.location.href = 'login.html';
    });
   
});
