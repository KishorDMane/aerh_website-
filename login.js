document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    console.log("_________________login____________________")

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Clear previous errors
    document.getElementById('emailError').textContent = '';
    document.getElementById('passwordError').textContent = '';
    document.querySelector('.message').textContent = '';

    // Basic front-end validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        document.getElementById('emailError').textContent = 'Please enter a valid email address';
        return;
    }

 

    // Perform login request to the backend
    try {
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (!response.ok) {
            document.querySelector('.message').textContent = data.msg || 'Login failed';
            document.querySelector('.message').style.color = 'red';
            return;
        }

        // If successful, store the token and redirect the user
        localStorage.setItem('token', data.token);
        document.querySelector('.message').textContent = 'Login successful!';
        document.querySelector('.message').style.color = 'green';

        // Redirect to dashboard or another page after successful login
        setTimeout(() => {
            window.location.href = '/dashboard'; // Change this to the appropriate route
        }, 1000);

    } catch (error) {
        console.error('Error during login:', error);
        document.querySelector('.message').textContent = 'Server error. Please try again later.';
        document.querySelector('.message').style.color = 'red';
    }
});
