import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./student-list.css";
import { Avatar } from "@mui/material";
import { ROUTES, stringAvatar } from "../../../shared";

const StudentList = ({ students, size = "full", showHeader = true }) => {
  const navigate = useNavigate(); // Initialize useNavigate

  // Function to handle navigation with student data
  const handleNavigation = (route, student, isCounselorView) => {
    navigate(route, { state: { student, isCounselorView } }); // Pass student data as state
  };

  return (
    <div className={`student-list-container shadow student-list-${size}`}>
      {showHeader && (
        <>
          <h1>Students</h1>
          <div className="student-list-divider"></div>
        </>
      )}

      <div className="student-list">
        {students && students.length > 0 ? (
          students.map((student) => (
            <div
              key={student.id}
              className={`student-card student-card-${size}`}
            >
              <div className="student-info">
                <Avatar
                  {...stringAvatar(
                    `${student.firstName}`,
                    `${student.lastName}`,
                    size === "full" ? 42 : size === "half" ? 32 : 24, // Adjust size
                    size === "full" ? 24 : size === "half" ? 18 : 14 // Adjust font size
                  )}
                  src={student.avatar}
                />
                <span className={`student-name ms-3 student-name-${size}`}>
                  {student.lastName}, {student.firstName}
                </span>
              </div>

              <div className={`dropdown student-dropdown-${size}`}>
                <button
                  className="ellipsis-btn"
                  type="button"
                  id={`dropdownMenuButton${student.id}`}
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="fas fa-ellipsis-v"></i>
                </button>
                <ul
                  className="dropdown-menu"
                  aria-labelledby={`dropdownMenuButton${student.id}`}
                >
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() =>
                        handleNavigation(
                          `${ROUTES.WEB}${ROUTES.CALENDAR}`,
                          student
                        )
                      } // Navigate to Calendar
                    >
                      Calendar
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() =>
                        handleNavigation(
                          `${ROUTES.WEB}${ROUTES.CHATS}`,
                          student
                        )
                      } // Navigate to Chat
                    >
                      Chat
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() =>
                        handleNavigation(
                          `${ROUTES.WEB}${ROUTES.PROFILE}`,
                          student,
                          true
                        )
                      }
                    >
                      Profile
                    </button>
                  </li>
                </ul>
              </div>

              <img
                src={student.emotionIcon}
                alt="emotion icon"
                className={`emotion-icon emotion-icon-${size}`}
              />
            </div>
          ))
        ) : (
          <p>No students available</p>
        )}
      </div>
    </div>
  );
};

export default StudentList;
