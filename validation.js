// Regular expressions for validation
const patterns = {
    username: /^[a-z0-9]{4,12}$/,
    email: /^[^\s@]+@[^\s@]+\.(net|com|org|edu)$/,
    phone: /^\(\d{3}\)-\d{3}-\d{4}$/,
    password: /^[a-zA-Z0-9_]{9,}$/,
    passwordBonus: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{9,}$/
};

// Helper function to set label color and error message
function setError(fieldId, color, message, makeRed = false) {
    const label = document.getElementById(fieldId + 'Label');
    const errorDiv = document.getElementById(fieldId + 'Error');
    
    label.style.color = color;
    
    if (makeRed && message) {
        // Create message with red text for field name
        errorDiv.innerHTML = message;
    } else {
        errorDiv.textContent = message;
    }
}

// Clear all errors
function clearErrors() {
    ['username', 'email', 'phone', 'password', 'confirmPassword', 'gender', 'ageGroup'].forEach(field => {
        setError(field, 'black', '');
    });
}

// Validate a text field
function validateTextField(id, pattern, fieldName) {
    const value = document.getElementById(id).value;
    
    if (!value.trim()) {
        setError(id, 'red', `Please Enter ${fieldName}`);
        return false;
    }
    if (!pattern.test(value)) {
        setError(id, 'orange', `Please Enter valid ${fieldName.toLowerCase()}`);
        return false;
    }
    setError(id, 'black', '');
    return true;
}

// Main validation function
function validateForm() {
    clearErrors();
    let valid = true;
    
    // Validate text fields
    valid &= validateTextField('username', patterns.username, 'Username');
    valid &= validateTextField('email', patterns.email, 'Email');
    valid &= validateTextField('phone', patterns.phone, 'Phone Number');
    
    // Validate password
    const pwd = document.getElementById('password').value;
    const pwdPattern = patterns.passwordBonus.test(pwd) ? patterns.passwordBonus : patterns.password;
    valid &= validateTextField('password', pwdPattern, 'Password');
    
    // Validate confirm password
    const confirmPwd = document.getElementById('confirmPassword').value;
    if (!confirmPwd.trim()) {
        setError('confirmPassword', 'red', 'Please Enter Confirm Password');
        valid = false;
    } else if (pwd !== confirmPwd) {
        alert('passwords do not match');
        setError('confirmPassword', 'orange', '');
        valid = false;
    }
    
    // Validate gender
    if (!document.querySelector('input[name="gender"]:checked')) {
        setError('gender', 'red', 'Please Select Gender');
        valid = false;
    }
    
    // Validate age group
    if (!document.getElementById('ageGroup').value) {
        setError('ageGroup', 'red', 'Please Select Age Group');
        valid = false;
    }
    
    if (valid) alert('Form submitted successfully!');
    return valid;
}

// Event listeners
document.getElementById('submitBtn').addEventListener('click', (e) => {
    e.preventDefault();
    validateForm();
});

document.getElementById('clearBtn').addEventListener('click', () => {
    clearErrors();
    document.getElementById('userForm').reset();
});

// Clear errors on input (optional)
['username', 'email', 'phone', 'password', 'confirmPassword'].forEach(id => {
    document.getElementById(id).addEventListener('input', () => {
        if (document.getElementById(id).value) {
            setError(id, 'black', '');
        }
    });
});
