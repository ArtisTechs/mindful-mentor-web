import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; // Import useLocation
import "./profile-page.css";
import { Avatar } from "@mui/material";
import {
  validateEmail,
  validateStudentNumber,
  validatePhoneNumber,
  EErrorMessages,
  STORAGE_KEY,
  stringAvatar,
} from "../../shared";
import { useGlobalContext } from "../../shared/context";

const ProfilePage = () => {
  const location = useLocation();
  const { student, isViewSelf } = location.state || {};
  const { currentUserDetails, isAppAdmin } = useGlobalContext();

  const [profile, setProfile] = useState(() => {
    return student || currentUserDetails;
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(profile);
  const [errors, setErrors] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    studentNumber: "",
    phoneNumber: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setFormData(profile); // Update form data whenever profile changes
  }, [profile]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    let formIsValid = true;
    let newErrors = {};

    if (!isViewSelf) {
      if (!formData.firstName) {
        newErrors.firstName = EErrorMessages.FIRST_NAME_REQUIRED;
        formIsValid = false;
      }
      if (!formData.lastName) {
        newErrors.lastName = EErrorMessages.LAST_NAME_REQUIRED;
        formIsValid = false;
      }
      if (!formData.email) {
        newErrors.email = EErrorMessages.EMAIL_REQUIRED;
        formIsValid = false;
      }
      if (!formData.studentNumber) {
        newErrors.studentNumber = EErrorMessages.STUDENT_NUMBER_REQUIRED;
        formIsValid = false;
      } else if (!validateStudentNumber(formData.studentNumber)) {
        newErrors.studentNumber = EErrorMessages.STUDENT_NUMBER_INVALID;
        formIsValid = false;
      }
    } else {
      if (!formData.firstName) {
        newErrors.firstName = EErrorMessages.FIRST_NAME_REQUIRED;
        formIsValid = false;
      }
      if (!formData.lastName) {
        newErrors.lastName = EErrorMessages.LAST_NAME_REQUIRED;
        formIsValid = false;
      }
      if (!formData.email) {
        newErrors.email = EErrorMessages.EMAIL_REQUIRED;
        formIsValid = false;
      } else if (!validateEmail(formData.email)) {
        newErrors.email = EErrorMessages.EMAIL_INVALID;
        formIsValid = false;
      }
      if (!formData.studentNumber) {
        newErrors.studentNumber = EErrorMessages.STUDENT_NUMBER_REQUIRED;
        formIsValid = false;
      } else if (!validateStudentNumber(formData.studentNumber)) {
        newErrors.studentNumber = EErrorMessages.STUDENT_NUMBER_INVALID;
        formIsValid = false;
      }
      if (!formData.phoneNumber) {
        newErrors.phoneNumber = EErrorMessages.PHONE_NUMBER_REQUIRED;
        formIsValid = false;
      } else if (!validatePhoneNumber(formData.phoneNumber)) {
        newErrors.phoneNumber = EErrorMessages.PHONE_NUMBER_INVALID;
        formIsValid = false;
      }
    }

    if (formIsValid) {
      setProfile((prev) => ({
        ...prev,
        firstName: formData.firstName,
        middleName: formData.middleName,
        lastName: formData.lastName,
        email: formData.email,
        studentNumber: formData.studentNumber,
        phoneNumber: formData.phoneNumber,
        password: formData.password,
      }));
      localStorage.setItem(
        STORAGE_KEY.PROFILE_DETAILS,
        JSON.stringify({
          ...profile,
          ...formData,
        })
      );
      setIsEditing(false);
    } else {
      setErrors(newErrors);
    }
  };

  const handleEditClick = () => {
    if (isEditing) {
      setFormData(profile);

      setErrors({
        firstName: "",
        middleName: "",
        lastName: "",
        email: "",
        studentNumber: "",
        phoneNumber: "",
        password: "",
      });
    }
    setIsEditing(!isEditing);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, avatar: fileURL }));
    }
  };

  const renderError = (field) => {
    return isEditing && errors[field] ? (
      <div className="text-danger error-input-text">{errors[field]}</div>
    ) : null;
  };

  return (
    <div className="profile-page">
      <div className="profile-container shadow">
        <div className="profile-header">
          <div className="profile-avatar">
            <Avatar
              {...stringAvatar(
                `${profile.firstName}`,
                `${profile.lastName}`,
                150,
                42
              )}
              src={isEditing ? formData.avatar : profile.avatar}
            />
            {isEditing && (
              <div className="change-profile-icon">
                <input
                  type="file"
                  id="avatar-upload"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
                <label htmlFor="avatar-upload" className="avatar-upload-label">
                  <i className="fas fa-camera"></i>
                </label>
              </div>
            )}
          </div>
          <button className="edit-profile-button" onClick={handleEditClick}>
            {isEditing ? (
              <i className="fas fa-arrow-left"></i>
            ) : (
              <i className="fas fa-edit"></i>
            )}
          </button>
        </div>

        {isEditing ? (
          <div className="profile-details-edit">
            <form onSubmit={handleFormSubmit} className="profile-edit-form">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control primary-input"
                  id="firstName"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
                <label htmlFor="firstName">
                  First Name<span className="text-danger">*</span>
                </label>
                {renderError("firstName")}
              </div>

              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control primary-input"
                  id="middleName"
                  name="middleName"
                  placeholder="Middle Name"
                  value={formData.middleName}
                  onChange={handleInputChange}
                />
                <label htmlFor="middleName">Middle Name</label>
                {renderError("middleName")}
              </div>

              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control primary-input"
                  id="lastName"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
                <label htmlFor="lastName">
                  Last Name<span className="text-danger">*</span>
                </label>
                {renderError("lastName")}
              </div>

              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control primary-input"
                  id="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  disabled={isAppAdmin}
                  onChange={handleInputChange}
                />
                <label htmlFor="email">
                  Email<span className="text-danger">*</span>
                </label>
                {renderError("email")}
              </div>

              {!isAppAdmin && (
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control primary-input"
                    id="studentNumber"
                    name="studentNumber"
                    placeholder="Student Number"
                    value={formData.studentNumber}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="studentNumber">
                    Student Number<span className="text-danger">*</span>
                  </label>
                  {renderError("studentNumber")}
                </div>
              )}

              {!isViewSelf && (
                <>
                  <div className="form-floating mb-3">
                    <input
                      type="tel"
                      className="form-control primary-input"
                      id="phoneNumber"
                      name="phoneNumber"
                      placeholder="Phone Number"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="phoneNumber">Phone Number</label>
                    {renderError("phoneNumber")}
                  </div>
                </>
              )}

              <div className="form-floating mb-3 position-relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control primary-input"
                  id="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
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
                {renderError("password")}
              </div>

              <div className="button-container">
                <button type="submit" className="white-button shadow">
                  Save
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="profile-details">
            <h1 className="text-label">Name</h1>
            <p className="text-value">
              {`${profile.firstName} ${
                profile.middleName ? profile.middleName + " " : ""
              }${profile.lastName}` || "N/A"}
            </p>
            <h1 className="text-label">Email</h1>
            <p className="text-value">{profile.email || "N/A"}</p>
            {!isAppAdmin && (
              <>
                <h1 className="text-label">Student Number</h1>
                <p className="text-value">{profile.studentNumber || "N/A"}</p>
              </>
            )}
            <h1 className="text-label">Phone Number</h1>
            <p className="text-value">{profile.phoneNumber || "N/A"}</p>
            <h1 className="text-label">Counselor</h1>
            <p className="text-value">
              {profile.counselor ? profile.counselor : "N/A"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
