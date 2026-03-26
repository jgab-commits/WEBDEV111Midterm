document.addEventListener('DOMContentLoaded', function() {
    // Access the form element
    const loginForm = document.querySelector('form');

    // Add an event listener for the form submission
    loginForm.addEventListener('submit', function(event) {
        // Prevent the default form submission
        event.preventDefault();

        // Get the values entered by the user
        const email = document.querySelector('input[type="email"]').value;
        const password = document.querySelector('input[type="password"]').value;

        // Simple validation (for demo purposes only - not secure)
        if (email.trim() === '' || password.trim() === '') {
            alert('Please enter both email and password.');
            return;
        }

        // Simulate successful login (in a real app, send to server)
        alert('Login successful! Redirecting to home...');
        
        // Redirect to home page
        window.location.href = 'index.html';
    });
});