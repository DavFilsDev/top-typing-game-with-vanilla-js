document.addEventListener('DOMContentLoaded', function() {
    // Thème dark/light
    const themeToggle = document.querySelector('.fa-moon');
    let isDarkMode = true; 
    
    themeToggle.addEventListener('click', function() {
        isDarkMode = !isDarkMode;
        toggleTheme();
    });
    
    function toggleTheme() {
        const body = document.body;
        const loginSection = document.querySelector('#loginSection');
        const navbar = document.querySelector('#navbar');
   
        if (isDarkMode) {
            // Mode dark
            body.classList.remove('bg-[#d0dddd]');
            body.classList.add('bg-[#142829]');
            themeToggle.classList.remove('fa-sun');
            themeToggle.classList.add('fa-moon');
            loginSection.classList.add('bg-[#142829]');
            loginSection.classList.remove('bg-[#d0dddd]');
            navbar.classList.add('text-[#d0dddd]');
            navbar.classList.remove('text-black');
        } else {
            // Mode light
            body.classList.remove('bg-[#142829]');
            body.classList.add('bg-[#d0dddd]');
            themeToggle.classList.remove('fa-moon');
            themeToggle.classList.add('fa-sun');
            loginSection.classList.remove('bg-[#142829]');
            loginSection.classList.add('bg-[#d0dddd]');
            navbar.classList.add('text-black');
        }
    }

    // Configuration
    const TEST_DURATION = 60; // 60 secondes
    const words = {
        easy: ["apple", "banana", "grape", "orange", "cherry"],
        medium: ["keyboard", "monitor", "printer", "charger", "battery"],
        hard: ["synchronize", "complicated", "development", "extravagant", "misconception"]
    };

    // Éléments DOM
    const modeSelect = document.getElementById('mode');
    const textDisplay = document.getElementById('text-display');
    const textInput = document.getElementById('text-input');
    const cursor = document.getElementById('cursor');
    const timeDisplay = document.getElementById('time');
    const testContainer = document.getElementById('test-container');
    const resultsContainer = document.getElementById('results');
    const wpmDisplay = document.getElementById('wpm');
    const accuracyDisplay = document.getElementById('accuracy');
    const restartBtn = document.getElementById('restart-btn');
    const retryBtn = document.getElementById('retry-btn');

    // Variables d'état
    let currentText = '';
    let timer = null;
    let timeLeft = TEST_DURATION;
    let currentPosition = 0;
    let correctChars = 0;
    let totalTyped = 0;
    let testActive = false;
    let isPaused = false;
    let startTime = null;
    let pauseStartTime = null;
    let totalPausedTime = 0;

    // Fonction pour générer le texte
    const generateText = () => {
        const mode = modeSelect.value;
        let generated = [];
        for (let i = 0; i < 50; i++) {
            const randomIndex = Math.floor(Math.random() * words[mode].length);
            generated.push(words[mode][randomIndex]);
        }
        currentText = generated.join(' ');
        renderText();
    };

    // Fonction pour afficher le texte
    const renderText = () => {
        let html = '';
        for (let i = 0; i < currentText.length; i++) {
            let charClass = 'untyped';
            if (i < currentPosition) charClass = 'typed';
            if (i === currentPosition) charClass = 'current';
            
            if (i < currentPosition && textInput.value[i] === currentText[i]) {
                charClass += ' correct';
            } else if (i < currentPosition) {
                charClass += ' incorrect';
            }

            html += `<span class="char ${charClass}">${currentText[i]}</span>`;
        }
        textDisplay.innerHTML = html;
        updateCursorPosition();
    };

    // Fonction pour mettre à jour la position du curseur
    const updateCursorPosition = () => {
        if (currentPosition >= currentText.length) return;
        const charElement = textDisplay.querySelectorAll('.char')[currentPosition];
        const rect = charElement.getBoundingClientRect();
        const containerRect = textDisplay.getBoundingClientRect();
        
        cursor.style.top = `${rect.top - containerRect.top + 6}px`;
        cursor.style.left = `${rect.left - containerRect.left}px`;
    };

    // Fonction pour démarrer le timer
    const startTimer = () => {
        if (!testActive) {
            testActive = true;
            startTime = Date.now();
            timer = setInterval(updateTimer, 100);
        }
    };

    // Fonction pour mettre à jour le timer
    const updateTimer = () => {
        if (!isPaused && startTime) {
            const now = Date.now();
            const elapsedSeconds = (now - startTime - totalPausedTime) / 1000;
            timeLeft = Math.max(0, TEST_DURATION - Math.floor(elapsedSeconds));
            document.getElementById('time').textContent = timeLeft;
            
            if (timeLeft <= 0) {
                endTest();
            }
        }
    };

    // Fonction pour mettre en pause
    const pauseTest = () => {
        if (testActive && !isPaused) {
            isPaused = true;
            pauseStartTime = Date.now();
            clearInterval(timer);
            timer = null;
            showPauseOverlay();
        }
    };

    // Fonction pour reprendre
    const resumeTest = () => {
        if (testActive && isPaused) {
            isPaused = false;
            totalPausedTime += Date.now() - pauseStartTime;
            timer = setInterval(updateTimer, 100);
            hidePauseOverlay();
        }
    };

    // Fonction pour basculer pause/reprise
    const togglePause = () => {
        if (isPaused) {
            resumeTest();
        } else {
            pauseTest();
        }
    };

    // Fonctions pour l'overlay de pause
    const showPauseOverlay = () => {
        const indicator = document.createElement('div');
        indicator.id = 'pause-indicator';
        indicator.className = 'absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-2xl z-10 cursor-pointer';
        indicator.textContent = currentLang === 'fr' ? 'PAUSE - Cliquez pour continuer' : 'PAUSED - Click to continue';
        indicator.addEventListener('click', resumeTest);
        testContainer.appendChild(indicator);
    };

    const hidePauseOverlay = () => {
        const indicator = document.getElementById('pause-indicator');
        if (indicator) {
            indicator.remove();
        }
    };

    // Fonction pour terminer le test
    const endTest = () => {
        clearInterval(timer);
        timer = null;
        testActive = false;
        
        const elapsedMinutes = (TEST_DURATION - timeLeft) / 60;
        const wordsTyped = correctChars / 5;
        const wpm = Math.round(wordsTyped / elapsedMinutes);
        const accuracy = totalTyped > 0 ? Math.round((correctChars / totalTyped) * 100) : 0;
        
        // Modifier l'affichage
        document.getElementById('time-unit').style.display = 'none';
        document.getElementById('time').textContent = currentLang === 'fr' ? 'terminé' : 'finished';
        document.querySelector('.timer').classList.add('text-red-500');
        
        wpmDisplay.textContent = wpm;
        accuracyDisplay.textContent = accuracy;
        testContainer.classList.add('hidden');
        resultsContainer.classList.remove('hidden');
    };

    // Fonction pour initialiser/réinitialiser le test
    const initTest = () => {
        clearInterval(timer);
        timer = null;
        timeLeft = TEST_DURATION;
        
        // Réinitialiser l'affichage du timer
        document.getElementById('time').textContent = timeLeft;
        document.getElementById('time-unit').style.display = 'inline';
        document.querySelector('.timer').classList.remove('text-red-500');
        
        currentPosition = 0;
        correctChars = 0;
        totalTyped = 0;
        testActive = false;
        isPaused = false;
        startTime = null;
        pauseStartTime = null;
        totalPausedTime = 0;
        
        generateText();
        textInput.value = '';
        resultsContainer.classList.add('hidden');
        testContainer.classList.remove('hidden');
        textInput.focus();
        hidePauseOverlay();
    };

    // Écouteur d'événements pour la saisie
    textInput.addEventListener('input', (e) => {
        if (isPaused) {
            resumeTest();
        }
        
        if (!testActive && e.target.value.length > 0) {
            startTimer();
        }
        
        const input = e.target.value;
        totalTyped++;
        
        if (input[input.length - 1] === currentText[currentPosition]) {
            correctChars++;
        }
        
        currentPosition = input.length;
        renderText();
        
        if (currentPosition >= currentText.length) {
            generateText();
            currentPosition = input.length;
        }
    });

    // Écouteurs pour les boutons et menus
    modeSelect.addEventListener('change', initTest);
    restartBtn.addEventListener('click', initTest);
    retryBtn.addEventListener('click', initTest);

    // Modification clé ici - suppression de la pause automatique pour les menus
    document.getElementById('font-selector').addEventListener('click', function(e) {
        e.stopPropagation();
        document.getElementById('font-menu').classList.toggle('hidden');
    });

    document.querySelectorAll('#font-menu button').forEach(button => {
        button.addEventListener('click', function() {
            document.getElementById('text-display').style.fontFamily = this.getAttribute('data-font');
            document.getElementById('font-menu').classList.add('hidden');
            initTest(); // Redémarre le test
        });
    });

    // Gestion des langues
    const translations = {
        fr: {
            challenge: "Faire un défi",
            contact: "Nous contacter",
            pause: "Pause",
            mode: "Mode:",
            easy: "Facile",
            medium: "Moyen",
            hard: "Difficile",
            time: "Temps:",
            restart: "Recommencer",
            results: "Résultats",
            wpm: "WPM:",
            accuracy: "Précision:",
            retry: "Nouveau test"
        },
        en: {
            challenge: "Take a challenge",
            contact: "Contact us",
            pause: "Pause",
            mode: "Mode:",
            easy: "Easy",
            medium: "Medium",
            hard: "Hard",
            time: "Time:",
            restart: "Restart",
            results: "Results",
            wpm: "WPM:",
            accuracy: "Accuracy:",
            retry: "Try again"
        }
    };

    let currentLang = 'fr';

    // Modification clé ici - suppression de la pause automatique pour les menus
    document.getElementById('language-selector').addEventListener('click', function(e) {
        e.stopPropagation();
        document.getElementById('language-menu').classList.toggle('hidden');
    });

    document.querySelectorAll('#language-menu button').forEach(button => {
        button.addEventListener('click', function() {
            currentLang = this.getAttribute('data-lang');
            updateLanguage();
            document.getElementById('language-menu').classList.add('hidden');
            document.querySelector('#language-selector .fi').className = 
                currentLang === 'fr' ? 'fi fi-fr mr-2' : 'fi fi-gb mr-2';
            initTest(); // Redémarre le test
        });
    });

    function updateLanguage() {
        const t = translations[currentLang];
        document.querySelector('.challenge-text').textContent = t.challenge;
        document.querySelector('.contact-text').textContent = t.contact;
        document.querySelector('.pause-text').textContent = t.pause;
        document.querySelector('label[for="mode"]').textContent = t.mode;
        document.querySelector('#mode option[value="easy"]').textContent = t.easy;
        document.querySelector('#mode option[value="medium"]').textContent = t.medium;
        document.querySelector('#mode option[value="hard"]').textContent = t.hard;
        document.querySelector('.timer').innerHTML = `${t.time} <span id="time">${timeLeft}</span>s`;
        document.getElementById('restart-btn').textContent = t.restart;
        document.querySelector('#results h2').textContent = t.results;
        document.querySelector('#results div div:first-child').innerHTML = `${t.wpm} <span id="wpm" class="font-bold">0</span>`;
        document.querySelector('#results div div:last-child').innerHTML = `${t.accuracy} <span id="accuracy" class="font-bold">0</span>%`;
        document.getElementById('retry-btn').textContent = t.retry;
    }

    // Navigation
    document.getElementById('challenge-btn').addEventListener('click', function() {
        window.location.href = "/challenge";
    });

    document.getElementById('contact-btn').addEventListener('click', function() {
        window.location.href = "/contact";
    });

    // Pause avec Ctrl+X (conservé inchangé)
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'x' && testActive) {
            togglePause();
            e.preventDefault();
        }
    });

    // Fermeture des menus
    document.addEventListener('click', function(e) {
        if (!e.target.closest('#font-selector') && !e.target.closest('#font-menu')) {
            document.getElementById('font-menu').classList.add('hidden');
        }
        if (!e.target.closest('#language-selector') && !e.target.closest('#language-menu')) {
            document.getElementById('language-menu').classList.add('hidden');
        }
    });

    // Initialisation
    initTest();
});