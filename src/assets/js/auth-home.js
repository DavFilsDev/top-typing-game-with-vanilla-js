import { supabase } from './supabase.js'

// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', () => {
  initProfileSection()
})

async function initProfileSection() {
  // Gestion de la déconnexion
  document.getElementById('logout-btn').addEventListener('click', handleLogout)
  
  // Charger les infos du profil
  await loadUserProfile()
}

async function handleLogout() {
  // Ajouter un indicateur de chargement
  const logoutBtn = document.getElementById('logout-btn')
  logoutBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin text-4xl"></i> Déconnexion...'
  logoutBtn.disabled = true
  
  try {
    const { error } = await supabase.auth.signOut()
    
    if (error) {
      throw error
    }
    
    // Redirection après déconnexion réussie
    window.location.href = '/pages/login.html'
  } catch (error) {
    console.error('Erreur lors de la déconnexion:', error.message)
    logoutBtn.innerHTML = '<i class="fa-solid fa-right-from-bracket text-4xl"></i> se déconnecter'
    logoutBtn.disabled = false
    
    // Afficher un message d'erreur (vous pouvez ajouter un élément pour cela dans votre HTML)
    alert('Échec de la déconnexion: ' + error.message)
  }
}

async function loadUserProfile() {
  // Récupérer l'utilisateur actuel
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) return
  
  // Afficher l'email de l'utilisateur
  const emailElement = document.querySelector('#profil-section .text-gray-400 strong')
  if (emailElement) {
    emailElement.nextSibling.textContent = ' ' + user.email
  }
  
  // Charger les statistiques de l'utilisateur (à adapter selon votre structure de données)
  await loadUserStats(user.id)
}

async function loadUserStats(userId) {
  try {
    // Récupérer les statistiques de l'utilisateur
    const { data: stats, error } = await supabase
      .from('user_stats') // Remplacez par votre table de statistiques
      .select('*')
      .eq('user_id', userId)
      .single()
    
    if (error) throw error
    
    // Afficher la vitesse moyenne
    if (stats && stats.average_speed) {
      const speedElement = document.querySelector('#profil-section .text-gray-400 strong + br + strong')
      if (speedElement) {
        speedElement.nextSibling.textContent = ' ' + stats.average_speed.toFixed(1)
      }
    }
  } catch (error) {
    console.error('Erreur lors du chargement des statistiques:', error)
  }
}


document.getElementById('delete-account-btn').addEventListener('click', async () => {
    // 1. Demander confirmation
    const confirmDelete = confirm("Voulez-vous vraiment supprimer votre compte ? Toutes vos données seront perdues.")
    
    if (!confirmDelete) return
    
    // 2. Afficher un indicateur de chargement
    const deleteBtn = document.getElementById('delete-account-btn')
    deleteBtn.disabled = true
    deleteBtn.innerHTML = '<span class="fa-solid fa-spinner fa-spin"></span> Suppression en cours...'
    
    try {
      // 3. Récupérer l'utilisateur actuel
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      
      if (userError || !user) throw new Error("Impossible de récupérer l'utilisateur")
      
      // 4. Supprimer les données utilisateur (optionnel)
      // D'abord les résultats de tests
      await supabase
        .from('typing_tests')
        .delete()
        .eq('user_id', user.id)
      
      // Ensuite le profil
      await supabase
        .from('profiles')
        .delete()
        .eq('id', user.id)
      
      // 5. Supprimer le compte d'authentification
      // Note: Cette partie nécessite des fonctions server-side pour des raisons de sécurité
      // Voici une approche alternative plus simple:
      await supabase.auth.signOut()
      
      // 6. Rediriger vers la page de login
      window.location.href = '/pages/login.html'
      
    } catch (error) {
      // 7. Gérer les erreurs
      console.error("Erreur lors de la suppression:", error)
      alert("Erreur lors de la suppression du compte: " + error.message)
      
      // Réactiver le bouton
      deleteBtn.disabled = false
      deleteBtn.textContent = 'Supprimer mon compte'
    }
  })