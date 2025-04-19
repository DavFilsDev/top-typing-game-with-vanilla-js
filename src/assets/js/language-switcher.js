// language-switcher.js
const translations = {
    fr: {
        mode: "Mode:",
        easy: "Facile",
        medium: "Moyen", 
        hard: "Difficile",
        restart: "Recommencer",
        results: "Résultats",
        wpm: "WPM:",
        accuracy: "Précision:",
        retry: "Nouveau test",
        pause: "Pause :",
        challenge: "Faire un défi",
        contact: "Nous contacter",
        time: "Temps:",
        home: "Accueil",
        about: "À propos",
        register: "Créer un compte",
        login: "Se connecter",
        passwdInput:"Mot de passe",
        wrong:"Mot de passe oublié!",
        wrongpass:"Mot de passe incorrect",
        account:"Aucun compte trouvé avec cet email.Veuillez créer votre compte.",
        havingaccount:"Pas encore de compte",
        valid:"valider",
        registerAccount:" Un compte a déjà existé avec cet email",
                registerConfirm:"Le mot de passe de confirmation doit être identique au premier mot de passe saisi",
        mainchildtext3:"Que tu sois débutant ou pro du clavier, tu trouveras ici de quoi perfectionner ta vitesse de frappe (jusqu'à + 100 WPM)",
         mainchildtext1: "Améliorer votre vitesse et précision de frappe grâce à des défis ludiques",
        mainchildtext4:"  Notre application aide les étudiants et professionnels à maîtriser le clavier grâce à des exercices personnalisés et des statistiques détaillées.",
         mainchildtext2:"Top-typing est bien plus qu'un simple typing test en ligne mais offre une expérience immersive pour maîtriser le clavier comme un pro.",
         functionality:"Fonctionalités clés",
         function1:"Mode défi",
         function2:"Textes chronométrés avec niveaux de difficulté",
         function3:"Tableaux de bord",
   function4:"Suivi des progrès (WPM, précision, historique)",
   function5:"Classements",
   function6:"Compétition avec d'autres utilisateurs",
   stack:"Stack technique",
   team:"Équipe",
   team1:"Développeuse Full Stack",
   team2:"Architecte des interfaces utilisateur et des APIs, elle maîtrise à la perfection  React, Node.js et les architectures microservices. Passionnée par l'expérience  utilisateur et les performances frontend.",
   team1:"Data Scientist",
   team2:"Expert en machine learning et analyse de données, il transforme les statistiques de frappe en insights actionnables. Spécialiste Python, TensorFlow et des algorithmes    de prédiction de performance.",
   contact1:"Veuillez remplir ce formulaire pour nous contacter",
   sent:"Envoyer",
                              
                              
       password: "Mot de passe", 
        emailPlaceholder: "Email",
        newPasswordPlaceholder: "Nouveau mot de passe",
        confirmPasswordPlaceholder: "Retaper votre mot de passe"                      
   
   
   
   
   
   
        },
    en: {
        mode: "Mode:", 
        easy: "Easy",
        medium: "Medium",
        hard: "Hard",
        restart: "Restart",
        results: "Results",
        wpm: "WPM:",
        accuracy: "Accuracy:",
        retry: "Try again",
        pause: "Pause:",
        challenge: "Take a challenge",
        contact: "Contact us",
        time: "Time:",
        home: "Home",
        about: "About",
        register: "Register",
        login: "Login",
        passwdInput:"Password",
        wrong:"Forgot Password!",
        wrongpass:"Wrong Password",
        account: "This email doesn't have account.Please create",
        havingaccount:"Don't have account",
         valid:"validate",
         registerAccount:"This email has already an account ",
         registerConfirm:"The confirm password needs to be same to the first password!",
          mainchildtext3: "Que tu sois débutant ou pro du clavier, tu trouveras ici de quoi perfectionner ta vitesse de frappe (jusqu'à + 100 WPM)",
    mainchildtext1: "Améliorer votre vitesse et précision de frappe grâce à des défis ludiques",
    mainchildtext4: "Notre application aide les étudiants et professionnels à maîtriser le clavier grâce à des exercices personnalisés et des statistiques détaillées.",
    mainchildtext2: "Top-typing est bien plus qu'un simple typing test en ligne mais offre une expérience immersive pour maîtriser le clavier comme un pro.",
    functionality: "Fonctionalités clés",
    function1: "Mode défi",
    function2: "Textes chronométrés avec niveaux de difficulté",
    function3: "Tableaux de bord",
    function4: "Suivi des progrès (WPM, précision, historique)",
    function5: "Classements",
    function6: "Compétition avec d'autres utilisateurs",
    stack: "Stack technique",
    team: "Équipe",
    team1: "Développeuse Full Stack",
    team2: "Architecte des interfaces utilisateur et des APIs, elle maîtrise à la perfection React, Node.js et les architectures microservices. Passionnée par l'expérience utilisateur et les performances frontend.",
    team3: "Data Scientist",
    team4: "Expert en machine learning et analyse de données, il transforme les statistiques de frappe en insights actionnables. Spécialiste Python, TensorFlow et des algorithmes de prédiction de performance.",
    contact1: "Veuillez remplir ce formulaire pour nous contacter",
    sent: "Envoyer",
    emailPlaceholder: "Email",
        newPasswordPlaceholder: "Nouveau mot de passe",
        confirmPasswordPlaceholder: "Retaper votre mot de passe",
        password:"Mot de passe",


    mainchildtext3: "Whether you're a beginner or a keyboard pro, you'll find here what you need to perfect your typing speed (up to +100 WPM)",
    mainchildtext1: "Improve your typing speed and accuracy through fun challenges",
    mainchildtext4: "Our application helps students and professionals master the keyboard through personalized exercises and detailed statistics.",
    mainchildtext2: "Top-typing is much more than just an online typing test but offers an immersive experience to master the keyboard like a pro.",
    functionality: "Key Features",
    function1: "Challenge Mode",
    function2: "Timed texts with difficulty levels",
    function3: "Dashboards",
    function4: "Progress tracking (WPM, accuracy, history)",
    function5: "Rankings",
    function6: "Competition with other users",
    stack: "Tech Stack",
    team: "Team",
    team1: "Full Stack Developer",
    team2: "Architect of user interfaces and APIs, she perfectly masters React, Node.js and microservices architectures. Passionate about user experience and frontend performance.",
    team3: "Data Scientist",
    team4: "Expert in machine learning and data analysis, he transforms typing statistics into actionable insights. Python, TensorFlow and performance prediction algorithms specialist.",
    contact1: "Please fill out this form to contact us",
    sent: "Send",
    emailPlaceholder: "Email",
        newPasswordPlaceholder: "New password",
        confirmPasswordPlaceholder: "Confirm your password",
        password:"Password"
         
        }
};

let currentLang = localStorage.getItem('selectedLanguage') || 'fr';

function updateLanguage() {
    const t = translations[currentLang];
      const passwordInput = document.getElementById('password');
    if (passwordInput) passwordInput.placeholder = t.password;
    
    const emailInput = document.getElementById('email');
    if (emailInput) emailInput.placeholder = t.emailPlaceholder;
    
    const newPasswordInput = document.getElementById('password_create');
    if (newPasswordInput) newPasswordInput.placeholder = t.newPasswordPlaceholder;
    
    const confirmPasswordInput = document.getElementById('password_confirm');
    if (confirmPasswordInput) confirmPasswordInput.placeholder = t.confirmPasswordPlaceholder;

    // Mettre à jour tous les éléments avec data-translate
    document.querySelectorAll('[data-translate]').forEach(el => {
        const key = el.getAttribute('data-translate');
        if (t[key]) {
            el.textContent = t[key];
        }
    });
   
    // Mettre à jour le sélecteur de mode
    const modeOptions = {
        easy: t.easy,
        medium: t.medium,
        hard: t.hard
    };
    
    document.querySelectorAll('#mode option').forEach(option => {
        option.textContent = modeOptions[option.value];
    });
    
    // Mettre à jour le texte de pause
    const pauseIndicator = document.getElementById('pause-indicator');
    if (pauseIndicator) {
        pauseIndicator.textContent = currentLang === 'fr' 
            ? 'PAUSE - Cliquez pour continuer' 
            : 'PAUSED - Click to continue';
    }
    
    // Mettre à jour le texte "terminé/finished"
    const timeElement = document.getElementById('time');
    if (timeElement && timeElement.textContent === 'terminé') {
        timeElement.textContent = currentLang === 'fr' ? 'terminé' : 'finished';
    }
}

function changeLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('selectedLanguage', lang);
    updateLanguage();
    updateLanguageButtons();
}

function updateLanguageButtons() {
    document.querySelectorAll('#language-selector .fi').forEach(flag => {
        flag.className = `fi fi-${currentLang === 'fr' ? 'fr' : 'us'} mr-2`;
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // Initialiser la langue
    updateLanguage();
    
    // Gérer les clics sur le sélecteur de langue
    document.getElementById('language-selector')?.addEventListener('click', function(e) {
        e.stopPropagation();
        document.getElementById('language-menu').classList.toggle('hidden');
    });
    
    // Gérer les sélections de langue
    document.querySelectorAll('#language-menu button[data-lang]').forEach(btn => {
        btn.addEventListener('click', function() {
            changeLanguage(this.getAttribute('data-lang'));
            document.getElementById('language-menu').classList.add('hidden');
        });
    });
    
    // Fermer le menu quand on clique ailleurs
    document.addEventListener('click', function(e) {
        if (!e.target.closest('#language-selector') && !e.target.closest('#language-menu')) {
            document.getElementById('language-menu').classList.add('hidden');
        }
    });
     updateFormPlaceholders();
});

// Exposer pour un accès global si nécessaire
window.changeLanguage = changeLanguage;
window.currentLang = currentLang;