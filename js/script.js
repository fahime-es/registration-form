const form = document.getElementById('signupForm');
const usernameInput = document.getElementById('username');
const fullnameInput = document.getElementById('fullname');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const submitBtn = document.getElementById('submitBtn');
const usernameError = document.getElementById('usernameError');
const successMessage = document.getElementById('successMessage');
const req1 = document.getElementById('req1');
const req2 = document.getElementById('req2');
const req3 = document.getElementById('req3');
const req4 = document.getElementById('req4');

// Tab switching
document.getElementById('signUpTab').addEventListener('click', function() {
    this.classList.add('active');
    document.getElementById('signInTab').classList.remove('active');
});

document.getElementById('signInTab').addEventListener('click', function() {
    this.classList.add('active');
    document.getElementById('signUpTab').classList.remove('active');
});

// Password validation
passwordInput.addEventListener('input', function() {
    const password = this.value;
    const username = usernameInput.value.toLowerCase();
    const email = emailInput.value.toLowerCase();
    const fullname = fullnameInput.value.toLowerCase();
    
    let validCount = 0;

    // Check password strength
    let strength = 'Weak';
    if (password.length >= 8 && /[0-9!@#$%^&*]/.test(password)) {
        if (password.length >= 12 && /[A-Z]/.test(password) && /[a-z]/.test(password)) {
            strength = 'Strong';
            validCount++;
        } else if (password.length >= 8) {
            strength = 'Medium';
        }
    }
    
    req1.querySelector('span:last-child').textContent = 'Password Strength : ' + strength;
    
    if (strength === 'Strong') {
        req1.classList.add('valid');
        req1.classList.remove('invalid');
        passwordInput.classList.add('valid');
        passwordInput.classList.remove('error');
    } else if (strength === 'Medium') {
        req1.classList.remove('valid');
        req1.classList.remove('invalid');
        passwordInput.classList.remove('valid');
        passwordInput.classList.remove('error');
    } else {
        req1.classList.remove('valid');
        req1.classList.add('invalid');
        if (password.length > 0) {
            passwordInput.classList.add('error');
            passwordInput.classList.remove('valid');
        }
    }

    // Check if password contains name or email
    const passwordLower = password.toLowerCase();
    const containsInfo = username && passwordLower.includes(username) ||
                        email && passwordLower.includes(email.split('@')[0]) ||
                        fullname && passwordLower.includes(fullname);
    
    if (!containsInfo && password.length > 0) {
        req2.classList.add('valid');
        req2.classList.remove('invalid');
        validCount++;
    } else {
        req2.classList.remove('valid');
        if (password.length > 0) req2.classList.add('invalid');
    }

    // Check length
    if (password.length >= 8) {
        req3.classList.add('valid');
        req3.classList.remove('invalid');
        validCount++;
    } else {
        req3.classList.remove('valid');
        if (password.length > 0) req3.classList.add('invalid');
    }

    // Check for number or symbol
    if (/[0-9!@#$%^&*]/.test(password)) {
        req4.classList.add('valid');
        req4.classList.remove('invalid');
        validCount++;
    } else {
        req4.classList.remove('valid');
        if (password.length > 0) req4.classList.add('invalid');
    }

    // Update button state and input border color
    if (validCount === 4) {
        submitBtn.classList.add('ready');
        passwordInput.classList.add('valid');
        passwordInput.classList.remove('error');
    } else {
        submitBtn.classList.remove('ready');
        if (password.length > 0) {
            passwordInput.classList.add('error');
            passwordInput.classList.remove('valid');
        }
    }
});

// Username validation
usernameInput.addEventListener('blur', function() {
    const username = this.value;
    if (username.length > 0 && (username.length < 3 || username.length > 15)) {
        usernameError.textContent = 'Username must be between 3 and 15 characters';
        this.classList.add('error');
    } else {
        usernameError.textContent = '';
        this.classList.remove('error');
        if (username.length >= 3) {
            this.classList.add('valid');
        }
    }
});

usernameInput.addEventListener('input', function() {
    if (this.classList.contains('error')) {
        const username = this.value;
        if (username.length >= 3 && username.length <= 15) {
            usernameError.textContent = '';
            this.classList.remove('error');
            this.classList.add('valid');
        }
    }
});

// Email validation
emailInput.addEventListener('blur', function() {
    if (this.value && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.value)) {
        this.classList.add('valid');
        this.classList.remove('error');
    } else if (this.value) {
        this.classList.add('error');
        this.classList.remove('valid');
    }
});

// Fullname validation
fullnameInput.addEventListener('blur', function() {
    if (this.value.length > 0) {
        this.classList.add('valid');
        this.classList.remove('error');
    }
});

// Form submission
form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = usernameInput.value;
    const fullname = fullnameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;

    // Validate username
    if (username.length < 3 || username.length > 15) {
        usernameError.textContent = 'Username must be between 3 and 15 characters';
        usernameInput.classList.add('error');
        return;
    }

    // Validate all fields are filled
    if (!fullname || !email || !password) {
        alert('Please fill in all fields');
        return;
    }

    // Check if all password requirements are met
    const allValid = req1.classList.contains('valid') &&
                    req2.classList.contains('valid') &&
                    req3.classList.contains('valid') &&
                    req4.classList.contains('valid');
    
    if (!allValid) {
        alert('Please meet all password requirements');
        return;
    }

    // Show success message
    successMessage.classList.add('show');
    form.style.display = 'none';
    
    setTimeout(() => {
        successMessage.classList.remove('show');
        form.style.display = 'block';
        form.reset();
        
        // Reset password requirements
        [req1, req2, req3, req4].forEach(req => {
            req.classList.remove('valid');
            req.classList.remove('invalid');
        });
        
        // Reset input borders
        [usernameInput, fullnameInput, emailInput, passwordInput].forEach(input => {
            input.classList.remove('valid');
            input.classList.remove('error');
        });
        
        submitBtn.classList.remove('ready');
    }, 3000);
});
