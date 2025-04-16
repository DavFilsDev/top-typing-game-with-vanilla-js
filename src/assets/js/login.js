
document.addEventListener('DOMContentLoaded', function() {
  const themeToggle = document.querySelector('#modeActive');
  const themeIcon=  document.querySelector('.fa-moon');
  const body = document.body;
  const loginSection=document.getElementById('loginSection')
    const navbar = document.querySelector('#navbar')
    const loginBtn = document.getElementById('loginBtn');
    const loginBtnChild= document.getElementById('loginBtn_child')
  const registerBtn = document.getElementById('registerBtn');
  
  
  
 loginBtn.addEventListener('click',()=>{
  loginBtnChild.classList.remove('border-[#d0dddd]')
  loginBtnChild.classList.add('bg-[#bc16a5]', 'border-[#bc16a5]')
   registerSection.classList.add('hidden')
   loginSection.classList.remove('hidden')
 });
 registerBtn.addEventListener('click',()=>{
  
  loginBtnChild.classList.add('border-[#d0dddd]')
  loginBtnChild.classList.remove('bg-[#bc16a5]', 'border-[#bc16a5]')
  loginSection.classList.add('hidden')
  registerSection.classList.remove('hidden')


})

  let isDarkMode = true; 
  
  themeToggle.addEventListener('click', function() {
    isDarkMode = !isDarkMode;
    toggleTheme();
  });
  
  function toggleTheme() {
  
 
    if (isDarkMode) {
      // Mode dark
      body.classList.remove('bg-[#d0dddd]');
      body.classList.add('bg-[#142829]');
      themeIcon.classList.remove('fa-sun');
      themeIcon.classList.add('fa-moon');
      loginSection.classList.add('bg-[#142829]')
      loginSection.classList.remove('bg-[#d0dddd]')
      navbar.classList.add('text-[#d0dddd]');
      navbar.classList.remove('text-black');
    } else {
      // Mode light
      body.classList.remove('bg-[#142829]');
      body.classList.add('bg-[#d0dddd]');
      themeIcon.classList.remove('fa-moon');
      themeIcon.classList.add('fa-sun');
      loginSection.classList.remove('bg-[#142829]')
      loginSection.classList.add('bg-[#d0dddd]')
      navbar.classList.add('text-black')
    }
    
  
  }

 


});
