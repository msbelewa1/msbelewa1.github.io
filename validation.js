// Get form elements
const form = document.getElementById('userForm');
const submitBtn = document.getElementById('submitBtn');
const clearBtn = document.getElementById('clearBtn');

// Regular expressions for validation
const regexPatterns = {
    // Username: only lowercase letters or numbers, 4-12 characters
    username: /^[a-z0-9]{4,12}$/,
    
    // Email: must contain @ and end with .net, .com, .org, or .edu
    email: /^[^\s@]+@[^\s@]+\.(net|com|org|edu)$/,
    
    // Phone: (123)-456-7890 format
    phone: /^\(\d{3}\)-\d{3}-\d{4}$/,
    
    // Password: lowercase, uppercase, numbers, or underscores, length > 8
    password: /^[a-zA-Z0-9_]{9,}$/,
    
    // Bonus: at least 1 uppercase, 1 lowercase, 1 number, 1 special character
    passwordBonus: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{9,}$/
};

// Clear all error messages and reset label colors
function clearErrors() {
    const labels = ['username', 'email', 'phone', 'password', 'confirmPassword', 'gender', 'ageGroup'];
    
    labels.forEach(field => {
        const label = document.getElementById(field + 'Label');
        const errorDiv = document.getElementById(field + 'Error');
        
        if (label) {
            label.style.color = 'black';
        }
        if (errorDiv) {
            errorDiv.textContent = '';
            errorDiv.className = 'validation-message';
        }
    });
}

// Validate individual field
function validateField(fieldName, value, regex, errorMessage) {
    const label = document.getElementById(fieldName + 'Label');
    const errorDiv = document.getElementById(fieldName + 'Error');
    let isValid = true;
    
    // Check if empty
    if (!value || value.trim() === '') {
        label.style.color = 'red';
        errorDiv.textContent = 'Please Enter ' + fieldName.charAt(0).toUpperCase() + fieldName.slice(1).replace(/([A-Z])/g, ' $1');
        errorDiv.className = 'validation-message error';
        isValid = false;
    }
    // Check if invalid format
    else if (regex && !regex.test(value)) {
        label.style.color = 'orange';
        errorDiv.textContent = errorMessage;
        errorDiv.className = 'validation-message warning';
        isValid = false;
    }
    // Valid
    else {
        label.style.color = 'black';
        errorDiv.textContent = '';
    }
    
    return isValid;
}

// Validate form on submit
function validateForm() {
    clearErrors();
    let isValid = true;
    
    // 1. Validate Username
    const username = document.getElementById('username').value;
    if (!validateField('username', username, regexPatterns.username, 
        'Please Enter valid username')) {
        isValid = false;
    }
    
    // 2. Validate Email
    const email = document.getElementById('email').value;
    if (!validateField('email', email, regexPatterns.email, 
        'Please Enter valid email')) {
        isValid = false;
    }
    
    // 3. Validate Phone
    const phone = document.getElementById('phone').value;
    if (!validateField('phone', phone, regexPatterns.phone, 
        'Please Enter valid phone number')) {
        isValid = false;
    }
    
    // 4. Validate Password
    const password = document.getElementById('password').value;
    // Try bonus pattern first, then fall back to regular pattern
    const passwordRegex = regexPatterns.passwordBonus.test(password) ? 
        regexPatterns.passwordBonus : regexPatterns.password;
    
    if (!validateField('password', password, passwordRegex, 
        'Please Enter Password')) {
        isValid = false;
    }
    
    // 5. Validate Confirm Password
    const confirmPassword = document.getElementById('confirmPassword').value;
    const confirmLabel = document.getElementById('confirmPasswordLabel');
    const confirmErrorDiv = document.getElementById('confirmPasswordError');
    
    if (!confirmPassword || confirmPassword.trim() === '') {
        confirmLabel.style.color = 'red';
        confirmErrorDiv.textContent = 'Please Enter Confirm Password';
        confirmErrorDiv.className = 'validation-message error';
        isValid = false;
    } else if (password !== confirmPassword) {
        // Show alert for password mismatch
        alert('passwords do not match');
        confirmLabel.style.color = 'orange';
        isValid = false;
    } else {
        confirmLabel.style.color = 'black';
        confirmErrorDiv.textContent = '';
    }
    
    // 6. Validate Gender
    const genderInputs = document.getElementsByName('gender');
    let genderSelected = false;
    for (let i = 0; i < genderInputs.length; i++) {
        if (genderInputs[i].checked) {
            genderSelected = true;
            break;
        }
    }
    
    const genderLabel = document.getElementById('genderLabel');
    const genderErrorDiv = document.getElementById('genderError');
    
    if (!genderSelected) {
        genderLabel.style.color = 'red';
        genderErrorDiv.textContent = 'Please Select Gender';
        genderErrorDiv.className = 'validation-message error';
        isValid = false;
    } else {
        genderLabel.style.color = 'black';
        genderErrorDiv.textContent = '';
    }
    
    // 7. Validate Age Group
    const ageGroup = document.getElementById('ageGroup').value;
    const ageGroupLabel = document.getElementById('ageGroupLabel');
    const ageGroupErrorDiv = document.getElementById('ageGroupError');
    
    if (!ageGroup || ageGroup === '') {
        ageGroupLabel.style.color = 'red';
        ageGroupErrorDiv.textContent = 'Please Select Age Group';
        ageGroupErrorDiv.className = 'validation-message error';
        isValid = false;
    } else {
        ageGroupLabel.style.color = 'black';
        ageGroupErrorDiv.textContent = '';
    }
    
    // If all validations pass
    if (isValid) {
        alert('Form submitted successfully!');
        // You can add form submission logic here
    }
    
    return isValid;
}

// Submit button event listener
submitBtn.addEventListener('click', function(e) {
    e.preventDefault();
    validateForm();
});

// Clear button event listener
clearBtn.addEventListener('click', function() {
    clearErrors();
    form.reset();
});

// Optional: Clear errors when user starts typing
document.getElementById('username').addEventListener('input', function() {
    if (this.value) {
        document.getElementById('usernameLabel').style.color = 'black';
        document.getElementById('usernameError').textContent = '';
    }
});

document.getElementById('email').addEventListener('input', function() {
    if (this.value) {
        document.getElementById('emailLabel').style.color = 'black';
        document.getElementById('emailError').textContent = '';
    }
});

document.getElementById('phone').addEventListener('input', function() {
    if (this.value) {
        document.getElementById('phoneLabel').style.color = 'black';
        document.getElementById('phoneError').textContent = '';
    }
});

document.getElementById('password').addEventListener('input', function() {
    if (this.value) {
        document.getElementById('passwordLabel').style.color = 'black';
        document.getElementById('passwordError').textContent = '';
    }
});

document.getElementById('confirmPassword').addEventListener('input', function() {
    if (this.value) {
        document.getElementById('confirmPasswordLabel').style.color = 'black';
        document.getElementById('confirmPasswordError').textContent = '';
    }
});
