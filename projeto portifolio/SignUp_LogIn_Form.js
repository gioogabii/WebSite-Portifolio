const container = document.querySelector('.container');
const registerToggleBtn = document.querySelector('.register-btn');
const loginToggleBtn = document.querySelector('.login-btn');
const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');

// Redirecionar para a galeria ao clicar nos botões de login e registro
loginBtn.addEventListener('click', () => {
    window.location.href = "galeria.html";  
});

registerBtn.addEventListener('click', () => {
    window.location.href = "galeria.html";  
});

// Alternar entre os formulários de login e registro
registerToggleBtn.addEventListener('click', () => {
    container.classList.add('active');
});

loginToggleBtn.addEventListener('click', () => {
    container.classList.remove('active');
});
