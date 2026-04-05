// Form Submission Handler
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const rememberMe = document.querySelector('input[name="remember"]').checked;
    
    // Validate inputs
    if (!email || !password) {
        alert('Please fill in all fields');
        return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    // Validate password length
    if (password.length < 6) {
        alert('Password must be at least 6 characters long');
        return;
    }
    
    // Simulate login
    console.log('Login attempt:', {
        email: email,
        password: '***',
        rememberMe: rememberMe
    });
    
    // Show success message
    alert(`Welcome back, ${email}!`);
    
    // Store remember me preference
    if (rememberMe) {
        localStorage.setItem('rememberEmail', email);
    } else {
        localStorage.removeItem('rememberEmail');
    }
    
    // Reset form
    this.reset();
});

// Load saved email if remember me was checked
window.addEventListener('DOMContentLoaded', function() {
    const savedEmail = localStorage.getItem('rememberEmail');
    if (savedEmail) {
        document.getElementById('email').value = savedEmail;
        document.querySelector('input[name="remember"]').checked = true;
    }
});

// Add smooth focus effects
const inputs = document.querySelectorAll('.form-group input');
inputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.opacity = '1';
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.style.opacity = '1';
    });
});

// Forgot Password Link Handler
document.querySelector('.forgot-password').addEventListener('click', function(event) {
    event.preventDefault();
    alert('Password recovery feature coming soon!');
});

// Sign Up Link Handler
document.querySelector('.signup-link').addEventListener('click', function(event) {
    event.preventDefault();
    alert('Sign up page coming soon!');
});
