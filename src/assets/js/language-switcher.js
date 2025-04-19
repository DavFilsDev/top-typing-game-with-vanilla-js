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
        login: "Se connecter"
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
        login: "Login"
    }
};

let currentLang = localStorage.getItem('selectedLanguage') || 'fr';

function updateLanguage() {
    const t = translations[currentLang];
    
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
});

// Exposer pour un accès global si nécessaire
window.changeLanguage = changeLanguage;
window.currentLang = currentLang;