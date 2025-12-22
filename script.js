const form = document.getElementById("registerForm");
const usernameInput = document.getElementById("username");
const fullNameInput = document.getElementById("fullName");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

const usernameError = document.getElementById("usernameError");
const fullNameError = document.getElementById("fullNameError");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");

const submitBtn = document.getElementById("submitBtn");
const successMessage = document.getElementById("successMessage");

// Password rule items
const ruleLength = document.getElementById("rule-length");
const ruleNumberSymbol = document.getElementById("rule-number-symbol");
const ruleNoName = document.getElementById("rule-no-name");
const ruleNoEmail = document.getElementById("rule-no-email");

const state = {
  username: false,
  fullName: false,
  email: false,
  password: false,
};

function updateSubmitState() {
  const allValid = Object.values(state).every(Boolean);
  if (allValid) {
    submitBtn.disabled = false;
    submitBtn.classList.add("enabled");
  } else {
    submitBtn.disabled = true;
    submitBtn.classList.remove("enabled");
  }
}

function setInputState(input, isValid, messageElement, message) {
  if (isValid) {
    input.classList.remove("invalid");
    input.classList.add("valid");
    if (messageElement) messageElement.textContent = "";
  } else {
    input.classList.remove("valid");
    input.classList.add("invalid");
    if (messageElement) messageElement.textContent = message || "";
  }
}

/* ---------- Username Validation ---------- */
function validateUsername() {
  const value = usernameInput.value.trim();
  const usernameRegex = /^[a-zA-Z0-9]+$/;

  if (value.length < 3 || value.length > 15) {
    setInputState(
      usernameInput,
      false,
      usernameError,
      "Username must be between 3 and 15 characters"
    );
    state.username = false;
  } else if (!usernameRegex.test(value)) {
    setInputState(
      usernameInput,
      false,
      usernameError,
      "Username can only contain letters and numbers"
    );
    state.username = false;
  } else {
    setInputState(usernameInput, true, usernameError, "");
    state.username = true;
  }
  updateSubmitState();
}

/* ---------- Full Name Validation ---------- */
function validateFullName() {
  const value = fullNameInput.value.trim();
  // Only letters and spaces
  const fullNameRegex = /^[A-Za-z\s]+$/;

  if (!value) {
    setInputState(
      fullNameInput,
      false,
      fullNameError,
      "Please enter your full name"
    );
    state.fullName = false;
  } else if (!fullNameRegex.test(value)) {
    setInputState(
      fullNameInput,
      false,
      fullNameError,
      "Full name must contain only letters and spaces"
    );
    state.fullName = false;
  } else {
    // at least two words
    const parts = value.split(/\s+/).filter(Boolean);
    if (parts.length < 2) {
      setInputState(
        fullNameInput,
        false,
        fullNameError,
        "Please enter your full name"
      );
      state.fullName = false;
    } else {
      setInputState(fullNameInput, true, fullNameError, "");
      state.fullName = true;
    }
  }
  validatePassword(); // 
  updateSubmitState();
}

/* ---------- Email Validation ---------- */
function validateEmail() {
  const value = emailInput.value.trim();
  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  if (!emailRegex.test(value)) {
    setInputState(
      emailInput,
      false,
      emailError,
      "Please enter a valid email address"
    );
    state.email = false;
  } else {
    setInputState(emailInput, true, emailError, "");
    state.email = true;
  }

  validatePassword(); // 
  updateSubmitState();
}