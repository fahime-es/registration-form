const signupTab = document.getElementById('signupTab');
const signinTab = document.getElementById('signinTab');
const signupForm = document.getElementById('signupForm');
const signinForm = document.getElementById('signinForm');

signupTab.addEventListener('click', () => {
    signupTab.classList.add('active');
    signinTab.classList.remove('active');
    signupForm.classList.add('active');
    signinForm.classList.remove('active');
});

signinTab.addEventListener('click', () => {
    signinTab.classList.add('active');
    signupTab.classList.remove('active');
    signinForm.classList.add('active');
    signupForm.classList.remove('active');
});

const passwordInput = document.getElementById('password');
const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const fullnameInput = document.getElementById('fullname');

const reqStrength = document.getElementById('reqStrength');
const reqName = document.getElementById('reqName');
const reqLength = document.getElementById('reqLength');
const reqNumber = document.getElementById('reqNumber');

function validatePassword() {
    const password = passwordInput.value;
    const username = usernameInput.value.toLowerCase();
    const email = emailInput.value.toLowerCase();
    const fullname = fullnameInput.value.toLowerCase();

    if (password.length >= 8) {
        reqLength.classList.add('valid');
    } else {
        reqLength.classList.remove('valid');
    }

    if (/[0-9!@#$%^&*(),.?":{}|<>]/.test(password)) {
        reqNumber.classList.add('valid');
    } else {
        reqNumber.classList.remove('valid');
    }

    const passwordLower = password.toLowerCase();
    const containsName = (username && passwordLower.includes(username)) || 
                        (email && passwordLower.includes(email.split('@')[0])) ||
                        (fullname && passwordLower.includes(fullname));

    if (!containsName && password.length > 0) {
        reqName.classList.add('valid');
    } else {
        reqName.classList.remove('valid');
    }

    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;

    if (strength <= 2) {
        reqStrength.textContent = 'Password Strength - Weak';
        reqStrength.classList.remove('valid');
    } else if (strength <= 4) {
        reqStrength.textContent = 'Password Strength - Medium';
        reqStrength.classList.add('valid');
    } else {
        reqStrength.textContent = 'Password Strength - Strong';
        reqStrength.classList.add('valid');
    }
}

passwordInput.addEventListener('input', validatePassword);
usernameInput.addEventListener('input', validatePassword);
emailInput.addEventListener('input', validatePassword);
fullnameInput.addEventListener('input', validatePassword);

signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = {
        username: document.getElementById('username').value,
        fullname: document.getElementById('fullname').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
    };
    console.log('Sign Up:', data);
    alert(`Account created!

Username: ${data.username}
Email: ${data.email}`);
});

signinForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = {
        email: document.getElementById('signinEmail').value,
        password: document.getElementById('signinPassword').value
    };
    console.log('Sign In:', data);
    alert(`Signed in successfully!

Email: ${data.email}`);
});

document.querySelectorAll('.forgot-password').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Password reset link sent to your email!');
    });
});
