export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validateStudentNumber = (studentNumber) => {
  const studentNumberRegex = /^[0-9]{6,12}$/;
  return studentNumberRegex.test(studentNumber);
};

export const validatePhoneNumber = (phoneNumber) => {
  const phoneNumberRegex = /^[0-9]{10,11}$/;
  return phoneNumberRegex.test(phoneNumber);
};

// validation.js
export const validatePassword = (password) => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  if (password.length < minLength) {
    return `Password must be at least ${minLength} characters long.`;
  } else if (!hasUpperCase) {
    return "Password must contain at least one uppercase letter.";
  } else if (!hasLowerCase) {
    return "Password must contain at least one lowercase letter.";
  } else if (!hasNumber) {
    return "Password must contain at least one number.";
  } else if (!hasSpecialChar) {
    return "Password must contain at least one special character.";
  } else {
    return ""; // No errors, password is valid.
  }
};


// Toast service
class ToastService {
  constructor() {
    this.showToastCallback = null;
  }

  registerShowToastCallback(callback) {
    this.showToastCallback = callback;
  }

  show(message, variant = "success") {
    if (this.showToastCallback) {
      this.showToastCallback(message, variant);
    }
  }
}

export const toastService = new ToastService();
