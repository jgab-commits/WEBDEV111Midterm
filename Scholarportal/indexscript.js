document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('.login-form');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const studentId = document.getElementById('studentId').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (studentId.trim() === '' || email.trim() === '' || password.trim() === '') {
            alert('Please enter your student ID, school email, and password.');
            return;
        }

        window.location.href = 'home.html';
    });
});