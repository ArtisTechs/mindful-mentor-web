export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validateStudentNumber = (studentNumber) => {
  const studentNumberRegex = /^[0-9]{6,12}$/;
  return studentNumberRegex.test(studentNumber);
};

export const validatePhoneNumber = (phoneNumber) => {
  const phoneNumberRegex = /^[0-9]{11}$/;
  return phoneNumberRegex.test(phoneNumber);
};