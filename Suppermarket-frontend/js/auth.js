/* =============================================
   FreshMart - Auth JavaScript (auth.js)
   Login, register, validation, session
   ============================================= */

'use strict';

// =============================================
// INIT
// =============================================

document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  initLoginForm();
  initRegisterForm();
  initPasswordToggles();
  initRememberMe();
  checkAlreadyLoggedIn();
});

// =============================================
// ALREADY LOGGED IN CHECK
// =============================================

function checkAlreadyLoggedIn() {
  const user = getUser();
  if (user && window.location.pathname.includes('login')) {
    // Redirect if already logged in
    // Don't auto-redirect to allow re-login; just update header
  }
}

// =============================================
// TAB SWITCHING
// =============================================

function initTabs() {
  const tabs = document.querySelectorAll('.auth-tab');
  const panels = document.querySelectorAll('.auth-form-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const target = document.getElementById(tab.dataset.target);
      if (target) target.classList.add('active');

      // Update header text
      updateFormHeader(tab.dataset.target);
    });
  });
}

function updateFormHeader(panel) {
  const header = document.querySelector('.auth-form-header');
  if (!header) return;

  if (panel === 'loginPanel') {
    header.querySelector('h2').textContent = 'Welcome back! 👋';
    header.querySelector('p').innerHTML = `New to FreshMart? <a href="#" onclick="switchToRegister()">Create an account</a>`;
  } else {
    header.querySelector('h2').textContent = 'Create Your Account 🌿';
    header.querySelector('p').innerHTML = `Already have an account? <a href="#" onclick="switchToLogin()">Sign in</a>`;
  }
}

window.switchToLogin = function(e) {
  if (e) e.preventDefault();
  const loginTab = document.querySelector('[data-target="loginPanel"]');
  if (loginTab) loginTab.click();
};

window.switchToRegister = function(e) {
  if (e) e.preventDefault();
  const registerTab = document.querySelector('[data-target="registerPanel"]');
  if (registerTab) registerTab.click();
};

// =============================================
// PASSWORD TOGGLES
// =============================================

function initPasswordToggles() {
  document.querySelectorAll('.form-input-toggle').forEach(toggle => {
    toggle.addEventListener('click', () => {
      const inputId = toggle.dataset.target;
      const input = document.getElementById(inputId);
      if (!input) return;

      const isHidden = input.type === 'password';
      input.type = isHidden ? 'text' : 'password';
      toggle.innerHTML = isHidden
        ? '<i class="fa-regular fa-eye-slash"></i>'
        : '<i class="fa-regular fa-eye"></i>';
    });
  });
}

// =============================================
// REMEMBER ME
// =============================================

function initRememberMe() {
  const emailInput = document.getElementById('loginEmail');
  const remembered = localStorage.getItem('freshmart_remember_email');

  if (remembered && emailInput) {
    emailInput.value = remembered;
    const rememberCheckbox = document.getElementById('rememberMe');
    if (rememberCheckbox) rememberCheckbox.checked = true;
  }
}

// =============================================
// FORM VALIDATION HELPERS
// =============================================

function showError(inputId, message) {
  const input = document.getElementById(inputId);
  const errorEl = document.getElementById(inputId + 'Error');
  if (input) input.classList.add('error');
  if (errorEl) {
    errorEl.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> ${message}`;
    errorEl.classList.add('visible');
  }
}

function clearError(inputId) {
  const input = document.getElementById(inputId);
  const errorEl = document.getElementById(inputId + 'Error');
  if (input) input.classList.remove('error');
  if (errorEl) errorEl.classList.remove('visible');
}

function clearAllErrors(ids) {
  ids.forEach(id => clearError(id));
}

function getVal(id) {
  const el = document.getElementById(id);
  return el ? el.value.trim() : '';
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePassword(pass) {
  return pass.length >= 8;
}

function getPasswordStrength(pass) {
  let score = 0;
  if (pass.length >= 8) score++;
  if (/[A-Z]/.test(pass)) score++;
  if (/[0-9]/.test(pass)) score++;
  if (/[^A-Za-z0-9]/.test(pass)) score++;
  return score; // 0-4
}

// =============================================
// LOGIN FORM
// =============================================

function initLoginForm() {
  const form = document.getElementById('loginForm');
  if (!form) return;

  // Real-time validation
  ['loginEmail', 'loginPassword'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', () => clearError(id));
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    handleLogin();
  });
}

function handleLogin() {
  const email    = getVal('loginEmail');
  const password = getVal('loginPassword');
  const remember = document.getElementById('rememberMe')?.checked;

  clearAllErrors(['loginEmail', 'loginPassword']);

  let valid = true;

  if (!email) {
    showError('loginEmail', 'Email address is required.');
    valid = false;
  } else if (!validateEmail(email)) {
    showError('loginEmail', 'Please enter a valid email address.');
    valid = false;
  }

  if (!password) {
    showError('loginPassword', 'Password is required.');
    valid = false;
  } else if (password.length < 6) {
    showError('loginPassword', 'Password must be at least 6 characters.');
    valid = false;
  }

  if (!valid) return;

  // Remember me
  if (remember) {
    localStorage.setItem('freshmart_remember_email', email);
  } else {
    localStorage.removeItem('freshmart_remember_email');
  }

  // Mock login — accept any valid-format credentials
  // In production, this would call an API
  setLoginLoading(true);

  setTimeout(() => {
    setLoginLoading(false);

    // Store mock user (use name from email prefix)
    const namePart = email.split('@')[0];
    const firstName = namePart.charAt(0).toUpperCase() + namePart.slice(1).split('.')[0];
    const lastName = namePart.includes('.') ? namePart.split('.')[1].charAt(0).toUpperCase() + namePart.split('.')[1].slice(1) : '';

    const user = {
      email,
      firstName,
      lastName,
      phone: '',
      joinedAt: new Date().toISOString()
    };

    localStorage.setItem('freshmart_user', JSON.stringify(user));
    showToast('Welcome back! 🎉', `Signed in as ${firstName}`, 'success');

    setTimeout(() => {
      window.location.href = 'index.html';
    }, 1000);
  }, 1200);
}

function setLoginLoading(loading) {
  const btn = document.getElementById('loginSubmitBtn');
  if (!btn) return;
  if (loading) {
    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Signing In...';
  } else {
    btn.disabled = false;
    btn.innerHTML = '<i class="fa-solid fa-right-to-bracket"></i> Sign In';
  }
}

// =============================================
// REGISTER FORM
// =============================================

function initRegisterForm() {
  const form = document.getElementById('registerForm');
  if (!form) return;

  // Real-time validation
  const fields = ['regFirstName', 'regLastName', 'regEmail', 'regPassword', 'regConfirmPassword', 'regPhone'];
  fields.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', () => {
        clearError(id);
        if (id === 'regPassword') updatePasswordStrength(el.value);
        if (id === 'regConfirmPassword') {
          const pass = getVal('regPassword');
          if (el.value && el.value !== pass) {
            showError('regConfirmPassword', 'Passwords do not match.');
          }
        }
      });
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    handleRegister();
  });
}

function updatePasswordStrength(password) {
  const score = getPasswordStrength(password);
  const bars = document.querySelectorAll('.strength-bar');
  const label = document.querySelector('.strength-label');

  if (!bars.length) return;

  const levels = ['', 'weak', 'weak', 'medium', 'strong'];
  const labels = ['', 'Weak', 'Fair', 'Good', 'Strong'];

  bars.forEach((bar, i) => {
    bar.className = 'strength-bar';
    if (i < score && password.length > 0) {
      bar.classList.add(levels[score]);
    }
  });

  if (label) {
    label.textContent = password.length > 0 ? `Strength: ${labels[score]}` : '';
    label.style.color = ['', '#E53935', '#FF6F00', '#FFC107', '#4CAF50'][score];
  }
}

function handleRegister() {
  const firstName   = getVal('regFirstName');
  const lastName    = getVal('regLastName');
  const email       = getVal('regEmail');
  const password    = getVal('regPassword');
  const confirm     = getVal('regConfirmPassword');
  const phone       = getVal('regPhone');
  const termsEl     = document.getElementById('regTerms');
  const termsChecked = termsEl?.checked;

  clearAllErrors(['regFirstName', 'regLastName', 'regEmail', 'regPassword', 'regConfirmPassword', 'regPhone']);

  let valid = true;

  if (!firstName) {
    showError('regFirstName', 'First name is required.');
    valid = false;
  } else if (firstName.length < 2) {
    showError('regFirstName', 'First name must be at least 2 characters.');
    valid = false;
  }

  if (!lastName) {
    showError('regLastName', 'Last name is required.');
    valid = false;
  }

  if (!email) {
    showError('regEmail', 'Email address is required.');
    valid = false;
  } else if (!validateEmail(email)) {
    showError('regEmail', 'Please enter a valid email address.');
    valid = false;
  }

  if (!password) {
    showError('regPassword', 'Password is required.');
    valid = false;
  } else if (!validatePassword(password)) {
    showError('regPassword', 'Password must be at least 8 characters.');
    valid = false;
  }

  if (!confirm) {
    showError('regConfirmPassword', 'Please confirm your password.');
    valid = false;
  } else if (confirm !== password) {
    showError('regConfirmPassword', 'Passwords do not match.');
    valid = false;
  }

  if (phone && !/^\+?[\d\s\-().]{7,15}$/.test(phone)) {
    showError('regPhone', 'Please enter a valid phone number.');
    valid = false;
  }

  if (!termsChecked) {
    showToast('Terms Required', 'Please accept the Terms & Conditions to continue.', 'warning');
    valid = false;
  }

  if (!valid) return;

  setRegisterLoading(true);

  setTimeout(() => {
    setRegisterLoading(false);

    const user = {
      firstName,
      lastName,
      email,
      phone,
      joinedAt: new Date().toISOString()
    };

    localStorage.setItem('freshmart_user', JSON.stringify(user));
    showToast('Account Created! 🌿', `Welcome to FreshMart, ${firstName}!`, 'success');

    setTimeout(() => {
      window.location.href = 'index.html';
    }, 1200);
  }, 1500);
}

function setRegisterLoading(loading) {
  const btn = document.getElementById('registerSubmitBtn');
  if (!btn) return;
  if (loading) {
    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Creating Account...';
  } else {
    btn.disabled = false;
    btn.innerHTML = '<i class="fa-solid fa-user-plus"></i> Create Account';
  }
}

// =============================================
// SOCIAL AUTH (MOCK)
// =============================================

window.socialLogin = function(provider) {
  showToast(`${provider} Sign-In`, `Connecting to ${provider}... (demo mode)`, 'info');
};

// =============================================
// FORGOT PASSWORD (MOCK)
// =============================================

window.forgotPassword = function(e) {
  e.preventDefault();
  const email = getVal('loginEmail');
  if (!email || !validateEmail(email)) {
    showToast('Enter Your Email', 'Please enter your email address first, then click Forgot Password.', 'warning');
    return;
  }
  showToast('Reset Link Sent', `A password reset link has been sent to ${email}`, 'success');
};
