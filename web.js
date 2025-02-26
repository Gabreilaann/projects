const mobileMenu = document.querySelector('.nav__toggle');
const menu = document.querySelector('.navbar__menu');

mobileMenu.addEventListener('click', function(){
    menu.classList.toggle('active');
    mobileMenu.classList.toggle('active');
})

// Login System

function toggleForms() {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    
    // Toggle visibility between login and register forms
    if (loginForm.style.display === 'none') {
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
    } else {
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
    }
}

function validateLogin() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    if (!email || !password) {
        alert('Please fill in all fields.');
        return false;
    }
    
    // Perform more validation as needed (e.g., regex for email format)
    
    alert('Login successful!');
    return false; // Prevent form submission for demonstration
}

function validateRegister() {
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm-password').value;

    if (!email || !password || !confirmPassword) {
        alert('Please fill in all fields.');
        return false;
    }
    
    if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return false;
    }
    
    // Perform more validation as needed (e.g., regex for email format)
    
    alert('Registration successful!');
    return false; // Prevent form submission for demonstration
}
