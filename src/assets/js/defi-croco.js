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

    // Configuration des modes
    const gameConfig = {
        easy: {
            timeLimit: 30, // 30 secondes
            wordCount: 30, // 30 mots à taper
            words: ["apple", "banana", "grape", "orange", "cherry", "dog", "cat", "sun", "moon", "tree"],
            imageWin: "/public/img/crocodile-lose.jpeg",
            imageLose: "/public/img/crocodile-win.jpeg"
        },
        medium: {
            timeLimit: 35,
            wordCount: 40,
            words: ["keyboard", "monitor", "printer", "charger", "battery", "laptop", "screen", "mouse", "cable", "router"],
            imageWin: "/public/img/crocodile-lose.jpeg",
            imageLose: "/public/img/crocodile-win.jpeg"
        },
        hard: {
            timeLimit: 25,
            wordCount: 50,
            words: ["synchronize", "complicated", "development", "extravagant", "misconception", "algorithm", "function", "variable", "parameter", "interface"],
            imageWin: "/public/img/crocodile-lose.jpeg",
            imageLose: "/public/img/crocodile-win.jpeg"
        }
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
    let wordsToType = [];
    let currentWordIndex = 0;
    let timer = null;
    let timeLeft = 0;
    let currentPosition = 0;
    let correctChars = 0;
    let totalTyped = 0;
    let testActive = false;
    let isPaused = false;
    let startTime = null;
    let hasError = false;
    let currentLang = 'fr';

    // Fonction pour générer les mots à taper
    const generateWords = () => {
        const mode = modeSelect.value;
        const config = gameConfig[mode];
        
        // Réinitialiser l'état
        currentWordIndex = 0;
        hasError = false;
        correctChars = 0;
        totalTyped = 0;
        
        // Sélectionner aléatoirement les mots
        wordsToType = [];
        for (let i = 0; i < config.wordCount; i++) {
            const randomIndex = Math.floor(Math.random() * config.words.length);
            wordsToType.push(config.words[randomIndex]);
        }
        
        displayCurrentWord();
    };

    // Afficher le mot actuel
    const displayCurrentWord = () => {
        if (currentWordIndex >= wordsToType.length) {
            endTest(!hasError); // Tous les mots tapés
            return;
        }
        
        currentText = wordsToType[currentWordIndex];
        currentPosition = 0;
        textInput.value = '';
        renderText();
    };

    // Fonction pour afficher le texte
    const renderText = () => {
        let html = '';
        for (let i = 0; i < currentText.length; i++) {
            let charClass = 'untyped';
            if (i < currentPosition) charClass = 'typed';
            if (i === currentPosition) charClass = 'current';
            
            if (i < currentPosition) {
                charClass += textInput.value[i] === currentText[i] ? ' correct' : ' incorrect';
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
            const mode = modeSelect.value;
            const now = Date.now();
            const elapsedSeconds = (now - startTime) / 1000;
            timeLeft = Math.max(0, gameConfig[mode].timeLimit - Math.floor(elapsedSeconds));
            document.getElementById('time').textContent = timeLeft;
            
            if (timeLeft <= 0) {
                endTest(false); // Temps écoulé
            }
        }
    };

    // Fonction pour terminer le test
    const endTest = (success) => {
        clearInterval(timer);
        testActive = false;
        
        const mode = modeSelect.value;
        const config = gameConfig[mode];
        const elapsedMinutes = (config.timeLimit - timeLeft) / 60;
        const wordsTyped = currentWordIndex;
        const wpm = Math.round(wordsTyped / elapsedMinutes);
        const accuracy = totalTyped > 0 ? Math.round((correctChars / totalTyped) * 100) : 0;
        
        // Afficher les résultats
        wpmDisplay.textContent = wpm;
        accuracyDisplay.textContent = accuracy;
        
        // Déterminer le résultat final
        let resultTitle, resultMessage, resultImage;
        
        if (!success) {
            if (timeLeft <= 0) {
                resultTitle = currentLang === 'fr' ? 'Temps écoulé !' : 'Time\'s up!';
                resultMessage = currentLang === 'fr' ? 'Vous n\'avez pas terminé à temps.' : 'You didn\'t finish in time.';
            } else {
                resultTitle = currentLang === 'fr' ? 'Erreur commise !' : 'Error made!';
                resultMessage = currentLang === 'fr' ? 'Vous avez fait une erreur durant le test.' : 'You made an error during the test.';
            }
            resultImage = config.imageLose;
        } else {
            resultTitle = currentLang === 'fr' ? 'Victoire !' : 'Victory!';
            resultMessage = currentLang === 'fr' ? 'Vous avez réussi le défi !' : 'You completed the challenge!';
            resultImage = config.imageWin;
        }
        
        // Afficher le résultat
        resultsContainer.innerHTML = `
            <h2 class="text-3xl font-bold mb-6">${resultTitle}</h2>
            <div class="stats grid grid-cols-2 gap-4 text-xl mb-6">
                <div>WPM: <span id="wpm" class="font-bold">${wpm}</span></div>
                <div>${currentLang === 'fr' ? 'Précision' : 'Accuracy'}: <span id="accuracy" class="font-bold">${accuracy}%</span></div>
            </div>
            <div class="mb-4">
                <img src="${resultImage}" alt="Result" class="h-32 mx-auto">
                <p class="mt-2 text-lg">${resultMessage}</p>
            </div>
            <button id="retry-btn" class="mt-4 px-6 py-2 ${success ? 'bg-green-500' : 'bg-red-500'} text-white rounded-lg hover:opacity-90">
                ${currentLang === 'fr' ? 'Réessayer' : 'Try again'}
            </button>
        `;
        
        // Réattacher l'événement au bouton
        document.getElementById('retry-btn').addEventListener('click', initTest);
        
        testContainer.classList.add('hidden');
        resultsContainer.classList.remove('hidden');
    };

    // Fonction pour initialiser/réinitialiser le test
    const initTest = () => {
        clearInterval(timer);
        
        const mode = modeSelect.value;
        timeLeft = gameConfig[mode].timeLimit;
        currentPosition = 0;
        correctChars = 0;
        totalTyped = 0;
        testActive = false;
        isPaused = false;
        startTime = null;
        hasError = false;
        
        // Réinitialiser l'affichage
        document.getElementById('time').textContent = timeLeft;
        document.getElementById('time-unit').style.display = 'inline';
        document.querySelector('.timer').classList.remove('text-red-500');
        
        generateWords();
        textInput.value = '';
        resultsContainer.classList.add('hidden');
        testContainer.classList.remove('hidden');
        textInput.focus();
    };

    // Écouteur d'événements pour la saisie
    textInput.addEventListener('input', (e) => {
        if (isPaused) return;
        
        if (!testActive) {
            startTimer();
        }
        
        const input = e.target.value;
        totalTyped++;
        
        // Vérifier si le caractère est correct
        if (input[input.length - 1] === currentText[currentPosition]) {
            correctChars++;
        } else {
            hasError = true; // Marquer qu'une erreur a été commise
        }
        
        currentPosition = input.length;
        renderText();
        
        // Vérifier si le mot est complet
        if (currentPosition >= currentText.length) {
            currentWordIndex++;
            setTimeout(() => {
                displayCurrentWord();
            }, 50);
        }
    });

    // Gestion de la pause
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'x' && testActive) {
            togglePause();
            e.preventDefault();
        }
    });

    function togglePause() {
        if (isPaused) {
            resumeTest();
        } else {
            pauseTest();
        }
    }

    function pauseTest() {
        if (testActive && !isPaused) {
            isPaused = true;
            clearInterval(timer);
            showPauseOverlay();
        }
    }

    function resumeTest() {
        if (testActive && isPaused) {
            isPaused = false;
            startTime = Date.now() - (gameConfig[modeSelect.value].timeLimit - timeLeft) * 1000;
            timer = setInterval(updateTimer, 100);
            hidePauseOverlay();
        }
    }

    function showPauseOverlay() {
        const indicator = document.createElement('div');
        indicator.id = 'pause-indicator';
        indicator.className = 'absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-2xl z-10 cursor-pointer';
        indicator.textContent = currentLang === 'fr' ? 'PAUSE - Cliquez pour continuer' : 'PAUSED - Click to continue';
        indicator.addEventListener('click', resumeTest);
        testContainer.appendChild(indicator);
    }

    function hidePauseOverlay() {
        const indicator = document.getElementById('pause-indicator');
        if (indicator) {
            indicator.remove();
        }
    }

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

    // Sélecteur de langue
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
                currentLang === 'fr' ? 'fi fi-fr mr-2' : 'fi fi-us mr-2';
        });
    });

    // Navigation
    document.getElementById('challenge-btn').addEventListener('click', function() {
        window.location.href = "/challenge";
    });

    document.getElementById('contact-btn').addEventListener('click', function() {
        window.location.href = "/contact";
    });

    // Redémarrer le test
    restartBtn.addEventListener('click', initTest);

    // Initialisation
    initTest();
});