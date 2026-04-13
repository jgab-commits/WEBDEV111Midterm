document.addEventListener('DOMContentLoaded', function() {
    // Access the form element
    const loginForm = document.querySelector('form');

    // Add an event listener for the form submission
    loginForm.addEventListener('submit', function(event) {
        // Prevent the default form submission
        event.preventDefault();

        const email = document.querySelector('input[type="email"]').value;
        const password = document.querySelector('input[type="password"]').value;

        if (email.trim() === '' || password.trim() === '') {
            alert('Please enter both email and password.');
            return;
        }

        
        // Redirect to home page
        window.location.href = 'home.html';
    });
});