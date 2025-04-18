import { supabase } from './supabase.js'

// Vérifier l'état de connexion au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
  checkAuthState()
})

async function checkAuthState() {
  const { data: { user } } = await supabase.auth.getUser()
  
  if (user) {
    // Rediriger vers home.html si déjà connecté
    window.location.href = './pages/home.html'
  }
}

// Gestion de la connexion email/password
document.querySelector('#loginSection form').addEventListener('submit', async (e) => {
  e.preventDefault()
  
  const email = document.getElementById('email').value
  const password = document.getElementById('password').value
  
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  })
  
  if (error) {
    // Afficher l'erreur
    document.querySelector('#loginSection .text-[#F93B3B]').textContent = error.message
    document.querySelector('#loginSection .text-[#F93B3B]').classList.remove('hidden')
  } else {
    // Redirection après connexion réussie
    window.location.href = './pages/home.html'
  }
})

// Gestion de l'inscription
document.querySelector('#registerSection form').addEventListener('submit', async (e) => {
  e.preventDefault()
  
  const email = document.getElementById('email').value
  const password = document.getElementById('password_create').value
  const passwordConfirm = document.getElementById('password_confirm').value
  
  // Validation des mots de passe
  if (password !== passwordConfirm) {
    document.querySelector('#registerSection .justify-center:nth-of-type(2)').classList.remove('hidden')
    return
  }
  
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: window.location.origin + '/pages/home.html'
    }
  })
  
  if (error) {
    alert("Erreur lors de l'inscription: " + error.message)
  } else {
    alert('Inscription réussie ! Vérifiez votre email pour confirmer votre compte.')
    // Basculer vers la vue de connexion
    document.getElementById('loginSection').classList.remove('hidden')
    document.getElementById('registerSection').classList.add('hidden')
  }
})

// Connexion avec Google
document.querySelector('#loginSection .fa-google').closest('a').addEventListener('click', async (e) => {
  e.preventDefault()
  await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: window.location.origin + './pages/home.html'
    }
  })
})

// Connexion avec GitHub
document.querySelector('#loginSection .fa-github').closest('a').addEventListener('click', async (e) => {
  e.preventDefault()
  await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: window.location.origin + './pages/home.html'
    }
  })
})

// Basculer entre login et register
document.getElementById('createAcount').addEventListener('click', (e) => {
  e.preventDefault()
  document.getElementById('loginSection').classList.add('hidden')
  document.getElementById('registerSection').classList.remove('hidden')
})