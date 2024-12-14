const loginPage = document.getElementById('loginPage');
const signUpPage = document.getElementById('signUpPage');
const toSignUp = document.getElementById('toSignUp');
const toLogin = document.getElementById('toLogin');

toSignUp.addEventListener('click', () => {
    loginPage.style.display = 'none';
    signUpPage.style.display = 'block';
});

toLogin.addEventListener('click', () => {
    loginPage.style.display = 'block';
    signUpPage.style.display = 'none';
});


document.querySelectorAll('.toggle-password').forEach(button => {
    button.addEventListener('click', () => {
        const targetInput = document.getElementById(button.dataset.target);
        const isPassword = targetInput.type === 'password';

        targetInput.type = isPassword ? 'text' : 'password';
        button.textContent = isPassword ? '🙈' : '👁️';
    });
});


document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    const email = document.getElementById('loginEmail');
    const password = document.getElementById('loginPassword');
    const emailError = document.getElementById('loginEmailError');
    const passwordError = document.getElementById('loginPasswordError');

    emailError.textContent = '';
    passwordError.textContent = '';

    
    if (!email.value.match(/^\S+@\S+\.\S+$/)) {
        emailError.textContent = 'Please enter a valid email.';
        isValid = false;
    }

    
    if (password.value.trim() === '') {
        passwordError.textContent = 'Password cannot be empty.';
        isValid = false;
    }

    
    if (!isValid) return;

    
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email.value);

    if (user && user.password === password.value) {
        alert('Login successful!');
        
        window.location.href = '/dashboard';  
    } else {
        alert('Invalid email or password');
    }
});


document.getElementById('signUpForm').addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    const name = document.getElementById('signUpName');
    const email = document.getElementById('signUpEmail');
    const password = document.getElementById('signUpPassword');
    const confirmPassword = document.getElementById('signUpConfirmPassword');

    const nameError = document.getElementById('signUpNameError');
    const emailError = document.getElementById('signUpEmailError');
    const passwordError = document.getElementById('signUpPasswordError');
    const confirmPasswordError = document.getElementById('signUpConfirmPasswordError');

    nameError.textContent = '';
    emailError.textContent = '';
    passwordError.textContent = '';
    confirmPasswordError.textContent = '';

    
    if (name.value.trim() === '') {
        nameError.textContent = 'Full Name cannot be empty.';
        isValid = false;
    }

    
    if (!email.value.match(/^\S+@\S+\.\S+$/)) {
        emailError.textContent = 'Please enter a valid email.';
        isValid = false;
    }


    if (password.value.length < 8) {
        passwordError.textContent = 'Password must be at least 8 characters long.';
        isValid = false;
    }

    
    if (confirmPassword.value !== password.value) {
        confirmPasswordError.textContent = 'Passwords do not match.';
        isValid = false;
    }

    
    if (!isValid) return;

    
    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.some(user => user.email === email.value)) {
        alert('Email already registered!');
        return;
    }

    users.push({ name: name.value, email: email.value, password: password.value });
    localStorage.setItem('users', JSON.stringify(users));

    alert('Sign-Up successful!');
    loginPage.style.display = 'block';
    signUpPage.style.display = 'none';
});