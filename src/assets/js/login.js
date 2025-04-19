
const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password');
const ErrorConnexion = document.getElementById('ErrorConnexion');
togglePassword.addEventListener('click', function () {

  const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
  passwordInput.setAttribute('type', type);


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
      
        event.preventDefault();
        event.stopPropagation();

        const email = document.getElementById('email').value.trim();
        const password = passwordInput.value.trim();

        if (!email || !password) {
            alert('Veuillez remplir tous les champs !');
            return;
        }

        const users = JSON.parse(localStorage.getItem('users')) || [];

        const user = users.find(user => user.email === email && user.password === password);

        if (user) {
         
            localStorage.setItem('currentUser', JSON.stringify(user));
            window.location.href = '../pages/home.html'; 
        } else {
          
            const errorMessage = document.querySelector('#errorMessage');
            if (errorMessage) errorMessage.classList.remove('hidden');
            
         
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


   const letters = "azertyuiopqsdfghjklmwxcvbn;:";
  const container = document.getElementById("floating-letters");

  for (let i = 0; i < 80; i++) {
    const span = document.createElement("span");
    span.innerText = letters[Math.floor(Math.random() * letters.length)];
    span.className = "floating-letter";

   
    const animationDuration = (3 + Math.random() * 5).toFixed(2);
    span.style.animationDuration = `${animationDuration}s`;

 
    const side = Math.random() < 0.5 ? 'left' : 'right';
    const xOffset = Math.random() * 20;
    span.style.left = side === 'left' ? `${10+xOffset}vw` : `${70+ xOffset}vw`;
    span.style.right = side === 'right' ? `${10+xOffset}vw` : `${10+xOffset}vw`;
 
    span.style.top = `${10 + Math.random() * 75}vh`;

    const fontSize = 18 + Math.random() * 12;
    span.style.fontSize = `${fontSize}px`;

    container.appendChild(span);
  }
