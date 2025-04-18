import { supabase } from './supabase.js'

// Vérifier l'état d'authentification
supabase.auth.onAuthStateChange(async (event, session) => {
  const currentPath = window.location.pathname
  
  if (session) {
    // Si l'utilisateur est connecté mais sur la page de login, rediriger vers home
    if (currentPath.includes('login.html') || currentPath.endsWith('/')) {
      window.location.href = '/pages/home.html'
    }
  } else {
    // Si l'utilisateur n'est pas connecté et n'est pas sur la page de login
    if (!currentPath.includes('login.html') && !currentPath.endsWith('/')) {
      window.location.href = '/pages/login.html'
    }
  }
})