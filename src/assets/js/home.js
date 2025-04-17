document.addEventListener('DOMContentLoaded', function() {
    // 1. Gestion de la navigation entre sections
    const menuItems = document.querySelectorAll('aside nav li a');
    const sections = document.querySelectorAll('.section-content');
    const profileButtonContainer = document.querySelector('aside div.flex.justify-around.items-center.w-full.h-\\[15\\%\\]');
    const profileButton = document.querySelector('.profile-button');
    
    function changeSection(sectionId) {
        // Cacher toutes les sections
        sections.forEach(section => {
            section.classList.add('hidden');
        });
        
        // Afficher la section demandée
        const sectionToShow = document.getElementById(`${sectionId}-section`);
        if (sectionToShow) {
            sectionToShow.classList.remove('hidden');
        }
        
        // Gestion des classes 'active'
        menuItems.forEach(item => {
            item.parentElement.classList.remove('active');
            if (item.getAttribute('data-section') === sectionId) {
                item.parentElement.classList.add('active');
            }
        });
        
        // Gérer l'état actif du bouton profil
        if (sectionId === 'profil') {
            profileButtonContainer.classList.add('active');
        } else {
            profileButtonContainer.classList.remove('active');
        }
    }
    
    // Navigation principale
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            changeSection(this.getAttribute('data-section'));
        });
    });
    
    // Bouton de profil
    profileButton.addEventListener('click', function(e) {
        e.preventDefault();
        changeSection('profil');
    });
    
    // Afficher la section dashboard par défaut
    changeSection('dashboard');

    // 2. Gestion du sélecteur de langue
    const languageSelector = document.getElementById('language-selector');
    const languageMenu = document.getElementById('language-menu');
    
    // Ouvrir/fermer le menu des langues
    languageSelector.addEventListener('click', function(e) {
        e.stopPropagation();
        languageMenu.classList.toggle('hidden');
    });
    
    // Sélection d'une langue
    document.querySelectorAll('#language-menu button').forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const lang = this.getAttribute('data-lang');
            console.log(`Langue sélectionnée: ${lang}`);
            
            // Mettre à jour l'affichage
            const flagClass = lang === 'fr' ? 'fi-fr' : 'fi-us';
            languageSelector.innerHTML = `
                <span class="fi ${flagClass} mr-2"></span>
                <i class="fas fa-chevron-down text-xs text-white"></i>
            `;
            
            languageMenu.classList.add('hidden');
        });
    });
    
    // Fermer le menu langue quand on clique ailleurs
    document.addEventListener('click', function() {
        languageMenu.classList.add('hidden');
    });
});