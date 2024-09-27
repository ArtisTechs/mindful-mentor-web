import React, { useEffect, useRef } from "react";
import "./student-list.css";
import { Avatar } from "@mui/material";
import { emotionCode, ROUTES, stringAvatar } from "../../../shared";
import JoyfulImage from "../../../assets/img/Joyful.png";
import MotivatedImage from "../../../assets/img/Motivated.png";
import CalmImage from "../../../assets/img/Calm.png";
import AnxiousImage from "../../../assets/img/Anxious.png";
import SadImage from "../../../assets/img/Sad.png";
import FrustratedImage from "../../../assets/img/Frustrated.png";
import { useNavigate } from "react-router-dom";

const getEmotionImage = (code) => {
  switch (code) {
    case emotionCode.JOY:
      return JoyfulImage;
    case emotionCode.MOTIVATED:
      return MotivatedImage;
    case emotionCode.CALM:
      return CalmImage;
    case emotionCode.ANXIOUS:
      return AnxiousImage;
    case emotionCode.SAD:
      return SadImage;
    case emotionCode.FRUSTRATED:
      return FrustratedImage;
    default:
      return null;
  }
};

const StudentList = ({
  students,
  size = "full",
  showHeader = true,
  hideOptions,
  hideEmotion,
  isGetLatestStudent,
  isItemClickable,
  onSelectStudent,
}) => {
  const hasInitialized = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (
      isGetLatestStudent &&
      onSelectStudent &&
      students.length > 0 &&
      !hasInitialized.current
    ) {
      onSelectStudent(students[0]); // Select the first student
      hasInitialized.current = true; // Mark as initialized to prevent future triggers
    }
  }, [isGetLatestStudent, onSelectStudent, students]);

  const handleItemClick = (student) => {
    if (isItemClickable && onSelectStudent) {
      onSelectStudent(student); // Always pass the selected student on click
    }
  };

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
              onClick={() => handleItemClick(student)}
              style={{ cursor: isItemClickable ? "pointer" : "default" }}
            >
              <div className="student-info">
                <Avatar
                  {...stringAvatar(
                    `${student.firstName}`,
                    `${student.lastName}`,
                    size === "full" ? 42 : size === "half" ? 32 : 24,
                    size === "full" ? 20 : size === "half" ? 16 : 12
                  )}
                  src={student.avatar}
                />
                <span className={`student-name ms-3 student-name-${size}`}>
                  {student.lastName}, {student.firstName}
                </span>
              </div>

              {!hideOptions && (
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
              )}

              {!hideEmotion && student.emotion && (
                <img
                  src={getEmotionImage(student.emotion.code)}
                  alt={student.emotion.code}
                  className={`emotion-icon emotion-icon-${size}`}
                />
              )}
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
