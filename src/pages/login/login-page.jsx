import React, { useState } from "react";
import {
  validateEmail,
  validateStudentNumber,
  validatePhoneNumber,
} from "../../shared";
import "./login-page.css";
import IntroCarouselComponent from "../../components/intro-carousel/intro-carousel";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    reEnterPassword: "",
    firstName: "",
    middleName: "",
    lastName: "",
    studentNumber: "",
    phoneNumber: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    reEnterPassword: "",
    firstName: "",
    middleName: "",
    lastName: "",
    studentNumber: "",
    phoneNumber: "",
  });

  const [isSignUp, setIsSignUp] = useState(false);
  const [formStep, setFormStep] = useState(1); // Track form step

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let formIsValid = true;
    let newErrors = {
      email: "",
      password: "",
      reEnterPassword: "",
      firstName: "",
      middleName: "",
      lastName: "",
      studentNumber: "",
      phoneNumber: "",
    };

    if (isSignUp) {
      if (formStep === 1) {
        // Step 1 validation
        if (!formData.firstName) {
          newErrors.firstName = "First name is required";
          formIsValid = false;
        }
        if (!formData.middleName) {
          newErrors.middleName = "Middle name is required";
          formIsValid = false;
        }
        if (!formData.lastName) {
          newErrors.lastName = "Last name is required";
          formIsValid = false;
        }
        if (!formData.studentNumber) {
          newErrors.studentNumber = "Student number is required";
          formIsValid = false;
        } else if (!validateStudentNumber(formData.studentNumber)) {
          newErrors.studentNumber = "Student number is not valid";
          formIsValid = false;
        }
        if (!formData.phoneNumber) {
          newErrors.phoneNumber = "Phone number is required";
          formIsValid = false;
        } else if (!validatePhoneNumber(formData.phoneNumber)) {
          newErrors.phoneNumber = "Phone number is not valid";
          formIsValid = false;
        }
      } else if (formStep === 2) {
        // Step 2 validation
        if (!formData.email) {
          newErrors.email = "Email is required";
          formIsValid = false;
        } else if (!validateEmail(formData.email)) {
          newErrors.email = "Email is not valid";
          formIsValid = false;
        }
        if (!formData.password) {
          newErrors.password = "Password is required";
          formIsValid = false;
        }
        if (formData.password !== formData.reEnterPassword) {
          newErrors.reEnterPassword = "Passwords do not match";
          formIsValid = false;
        }
      }

      if (formIsValid) {
        if (formStep === 1) {
          setFormStep(2); // Move to the next step
        } else {
          console.log("Form submitted:", formData);
          // Perform form validation or send data to an API
        }
      } else {
        setErrors(newErrors);
      }
    } else {
      // Handle Sign In submission
      if (!formData.email) {
        newErrors.email = "Email is required";
        formIsValid = false;
      } else if (!validateEmail(formData.email)) {
        newErrors.email = "Email is not valid";
        formIsValid = false;
      }

      if (!formData.password) {
        newErrors.password = "Password is required";
        formIsValid = false;
      }

      if (formIsValid) {
        console.log("Login form submitted:", formData);
        // Perform login validation or send data to an API
      } else {
        setErrors(newErrors);
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleForm = () => {
    setIsSignUp((prev) => !prev);
    setFormStep(1);
    setFormData({
      email: "",
      password: "",
      reEnterPassword: "",
      firstName: "",
      middleName: "",
      lastName: "",
      studentNumber: "",
      phoneNumber: "",
    });
    setErrors({
      email: "",
      password: "",
      reEnterPassword: "",
      firstName: "",
      middleName: "",
      lastName: "",
      studentNumber: "",
      phoneNumber: "",
    });
  };

  return (
    <div className="login-page">
      <div className="get-started-container">
        <div className="get-started-title">
          <div className="logo-large mb-3"></div>
          <h1 className="gradient-color-text">Mindful Mentor</h1>
        </div>
        <div className="get-started-body">
          <IntroCarouselComponent />
        </div>
      </div>

      <div className="login-form d-flex flex-column">
        <div className="login-title mb-3">
          <h1 className="primary-color fw-bold">
            {isSignUp
              ? formStep === 1
                ? "Sign Up - Step 1"
                : "Sign Up - Step 2"
              : "Login"}
          </h1>
        </div>
        <form onSubmit={handleSubmit}>
          {isSignUp && formStep === 1 && (
            <>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control primary-input"
                  id="firstName"
                  name="firstName"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={handleChange}
                />
                <label htmlFor="firstName">
                  First Name<span className="text-danger">*</span>
                </label>
                {errors.firstName && (
                  <div className="text-danger error-input-text">
                    {errors.firstName}
                  </div>
                )}
              </div>

              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control primary-input"
                  id="middleName"
                  name="middleName"
                  placeholder="Middle name"
                  value={formData.middleName}
                  onChange={handleChange}
                />
                <label htmlFor="middleName">
                  Middle Name<span className="text-danger">*</span>
                </label>
                {errors.middleName && (
                  <div className="text-danger error-input-text">
                    {errors.middleName}
                  </div>
                )}
              </div>

              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control primary-input"
                  id="lastName"
                  name="lastName"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={handleChange}
                />
                <label htmlFor="lastName">
                  Last Name<span className="text-danger">*</span>
                </label>
                {errors.lastName && (
                  <div className="text-danger error-input-text">
                    {errors.lastName}
                  </div>
                )}
              </div>

              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control primary-input"
                  id="studentNumber"
                  name="studentNumber"
                  placeholder="Student number"
                  value={formData.studentNumber}
                  onChange={handleChange}
                />
                <label htmlFor="studentNumber">
                  Student Number<span className="text-danger">*</span>
                </label>
                {errors.studentNumber && (
                  <div className="text-danger error-input-text">
                    {errors.studentNumber}
                  </div>
                )}
              </div>

              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control primary-input"
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder="Phone number"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
                <label htmlFor="phoneNumber">
                  Phone Number<span className="text-danger">*</span>
                </label>
                {errors.phoneNumber && (
                  <div className="text-danger error-input-text">
                    {errors.phoneNumber}
                  </div>
                )}
              </div>
            </>
          )}

          {isSignUp && formStep === 2 && (
            <>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control primary-input"
                  id="email"
                  name="email"
                  placeholder="Your email here"
                  value={formData.email}
                  onChange={handleChange}
                />
                <label htmlFor="email">Email</label>
                {errors.email && (
                  <div className="text-danger error-input-text">
                    {errors.email}
                  </div>
                )}
              </div>

              <div className="form-floating mb-3 position-relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control primary-input"
                  id="password"
                  name="password"
                  placeholder="Your password here"
                  value={formData.password}
                  onChange={handleChange}
                />
                <label htmlFor="password">Password</label>
                <button
                  type="button"
                  className="btn position-absolute end-0 top-0 mt-2 me-2"
                  onClick={togglePasswordVisibility}
                >
                  <i
                    className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}
                  ></i>
                </button>
                {errors.password && (
                  <div className="text-danger error-input-text">
                    {errors.password}
                  </div>
                )}
              </div>

              <div className="form-floating mb-3 position-relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control primary-input"
                  id="reEnterPassword"
                  name="reEnterPassword"
                  placeholder="Re-enter your password"
                  value={formData.reEnterPassword}
                  onChange={handleChange}
                />
                <label htmlFor="reEnterPassword">Re-enter Password</label>
                {errors.reEnterPassword && (
                  <div className="text-danger error-input-text">
                    {errors.reEnterPassword}
                  </div>
                )}
              </div>
            </>
          )}

          {!isSignUp && (
            <>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control primary-input"
                  id="email"
                  name="email"
                  placeholder="Your email here"
                  value={formData.email}
                  onChange={handleChange}
                />
                <label htmlFor="email">Email</label>
                {errors.email && (
                  <div className="text-danger error-input-text">
                    {errors.email}
                  </div>
                )}
              </div>

              <div className="form-floating mb-3 position-relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control primary-input"
                  id="password"
                  name="password"
                  placeholder="Your password here"
                  value={formData.password}
                  onChange={handleChange}
                />
                <label htmlFor="password">Password</label>
                <button
                  type="button"
                  className="btn position-absolute end-0 top-0 mt-2 me-2"
                  onClick={togglePasswordVisibility}
                >
                  <i
                    className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}
                  ></i>
                </button>
                {errors.password && (
                  <div className="text-danger error-input-text">
                    {errors.password}
                  </div>
                )}
              </div>
            </>
          )}

          <div className="d-flex flex-column mt-3 align-items-center">
            <button className="primary-button mb-3" type="submit">
              {isSignUp ? (formStep === 1 ? "Next" : "Sign Up") : "Sign In"}
            </button>
            <button
              type="button"
              className="secondary-button"
              onClick={toggleForm}
            >
              {isSignUp ? "Back to Sign In" : "Sign Up"}
            </button>
            <p className="fs-small mt-2">
              {isSignUp
                ? "Already have an account?"
                : "Don't have an account?"}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
