import React, { useState } from "react";
import "./profile-page.css";
import { Avatar } from "@mui/material";

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    name: "Juan Dela Cruz",
    email: "juandelacruz@gmail.com",
    studentNumber: "13213211",
    phoneNumber: "09511682096",
    counselor: "Jose Rizal",
  });

  return (
    <div className="profile-page">
      <div className="profile-container shadow">
        <div className="profile-header">
          <div className="profile-avatar">
            <Avatar alt={profile.name} sx={{ width: 150, height: 150 }} />
          </div>
          <button className="edit-profile-button">
            <i className="fas fa-edit"></i>
          </button>
        </div>
        <div className="profile-details">
          <h1 className="text-label">Name</h1>
          <p className="text-value">{profile.name || "N/A"}</p>
          <h1 className="text-label">Email</h1>
          <p className="text-value">{profile.email || "N/A"}</p>
          <h1 className="text-label">Student Number</h1>
          <p className="text-value">{profile.studentNumber || "N/A"}</p>
          <h1 className="text-label">Phone Number</h1>
          <p className="text-value">{profile.phoneNumber || "N/A"}</p>
          <h1 className="text-label">Counselor</h1>
          <p className="text-value">{profile.counselor || "N/A"}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
