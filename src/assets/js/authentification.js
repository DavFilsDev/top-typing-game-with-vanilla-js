  // Gestion du formulaire de création de compte
    const registerForm = document.querySelector('#registerSection form');
    registerForm.addEventListener('submit', function(e) {
       

        const email = document.getElementById('email').value;
        const password = passwordCreate.value;
        const confirmPassword = password_confirm.value;

        // Validation des mots de passe
        if (password !== confirmPassword) {
            alert('Les mots de passe ne correspondent pas !');
            return;
        }

        // Vérifier si l'utilisateur existe déjà
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userExists = users.some(user => user.email === email);

        if (userExists) {
            alert('Un compte avec cet email existe déjà !');
            return;
        }

        // Créer un nouvel utilisateur
        const newUser = {
            email: email,
            password: password
        };

        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        alert('Compte créé avec succès ! Vous pouvez maintenant vous connecter.');
        window.location.href = 'login.html';

         e.preventDefault();
    });

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
            alert('Connexion réussie !');
            window.location.href = '../index.html'; // Redirection vers la page d'accueil
        } else {
            // Afficher le message d'erreur
            const errorMessage = document.querySelector('#errorMessage');
            if (errorMessage) errorMessage.classList.remove('hidden');
            
            // Vérifier si l'email existe
            const emailExists = users.some(user => user.email === email);
            
            if (!emailExists) {
                alert('Aucun compte trouvé avec cet email. Redirection vers la page de création de compte...');
                setTimeout(() => {
                    window.location.href = 'create.html';
                }, 2000);
            } else {
                alert('Mot de passe incorrect !');
            }
        }
    });


