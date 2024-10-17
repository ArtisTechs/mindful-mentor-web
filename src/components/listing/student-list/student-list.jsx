import React, { useEffect, useRef, useState } from "react";
import "./student-list.css";
import { Avatar, Skeleton } from "@mui/material";
import {
  AccountStatusEnum,
  changeUserStatus,
  EErrorMessages,
  emotionCode,
  ROUTES,
  stringAvatar,
  toastService,
  modalService,
  deleteUser,
} from "../../../shared";
import JoyfulImage from "../../../assets/img/Joyful.png";
import MotivatedImage from "../../../assets/img/Motivated.png";
import CalmImage from "../../../assets/img/Calm.png";
import AnxiousImage from "../../../assets/img/Anxious.png";
import SadImage from "../../../assets/img/Sad.png";
import FrustratedImage from "../../../assets/img/Frustrated.png";
import logo from "../../../assets/img/mindful-mentor-logo.png";
import { useNavigate } from "react-router-dom";

const getEmotionImage = (code) => {
  switch (code) {
    case emotionCode.JOY.code:
      return JoyfulImage;
    case emotionCode.MOTIVATED.code:
      return MotivatedImage;
    case emotionCode.CALM.code:
      return CalmImage;
    case emotionCode.ANXIOUS.code:
      return AnxiousImage;
    case emotionCode.SAD.code:
      return SadImage;
    case emotionCode.FRUSTRATED.code:
      return FrustratedImage;
    default:
      return logo;
  }
};

const StudentList = ({
  students,
  loading,
  size = "full",
  showHeader = true,
  hideOptions,
  hideEmotion,
  hideDelete,
  isGetLatestStudent,
  isItemClickable,
  onSelectStudent,
  isSelectedStudent,
  isRequest = false,
  refetch,
}) => {
  const [selectedStudent, setSelectedStudent] = useState(
    isSelectedStudent || null
  );
  const hasInitialized = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (
      isGetLatestStudent &&
      onSelectStudent &&
      students.length > 0 &&
      !hasInitialized.current
    ) {
      if (!selectedStudent) {
        onSelectStudent(students[0]);
        setSelectedStudent(students[0]);
      } else {
        onSelectStudent(selectedStudent);
      }

      hasInitialized.current = true;
    }
  }, [isGetLatestStudent, onSelectStudent, students]);

  const handleItemClick = (student) => {
    if (isItemClickable && onSelectStudent) {
      setSelectedStudent(student);
      onSelectStudent(student);
    }
  };

  const handleNavigation = (route, student, isViewSelf) => {
    navigate(route, { state: { student, isViewSelf } });
  };

  const handleApproveClick = (studentDetails) => {
    modalService.show({
      title: "Approve Student?",
      message: `Are you sure you want to approve ${studentDetails.firstName} ${studentDetails.lastName}'s account?`,
      onConfirm: async () => {
        try {
          const status = AccountStatusEnum.ACTIVE;
          const response = await changeUserStatus(studentDetails.id, status);
          toastService.show(
            `${studentDetails.firstName} ${studentDetails.lastName} successfully approved.`,
            "success-toast"
          );
          refetch();
        } catch (error) {
          toastService.show(EErrorMessages.CONTACT_ADMIN, "danger-toast");
        }
      },
      onCancel: () => {
        // console.log("Approval cancelled");
      },
    });
  };

  const handleRejectClick = (studentDetails) => {
    modalService.show({
      title: "Reject Student?",
      message: `Are you sure you want to reject ${studentDetails.firstName} ${studentDetails.lastName}'s account? 
      The account will also be deleted.`,
      onConfirm: async () => {
        try {
          const response = await deleteUser(studentDetails.id);
          toastService.show(
            `${studentDetails.firstName} ${studentDetails.lastName} has been rejected.`,
            "success-toast"
          );
          refetch();
        } catch (error) {
          toastService.show(EErrorMessages.CONTACT_ADMIN, "danger-toast");
        }
      },
      confirmText: "Reject",
      confirmButtonClass: "danger-button",
    });
  };

  const handleDeleteClick = (studentDetails) => {
    modalService.show({
      title: "Delete Student",
      message: `Are you sure you want to Delete ${studentDetails.firstName} ${studentDetails.lastName}'s account?`,
      onConfirm: async () => {
        try {
          const response = await deleteUser(studentDetails.id);
          toastService.show(
            `${studentDetails.firstName} ${studentDetails.lastName} has been deleted.`,
            "danger-toast"
          );
          refetch();
        } catch (error) {
          toastService.show(EErrorMessages.CONTACT_ADMIN, "danger-toast");
        }
      },
      confirmText: "Delete",
      confirmButtonClass: "danger-button",
    });
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
        {loading ? (
          <>
            {[...Array(5)].map((_, index) => (
              <div
                key={index} // Add key here
                className={`student-card-loader student-card-${size}`}
              >
                <Skeleton
                  key={`circular-${index}`}
                  variant="circular"
                  width={42}
                  height={42}
                />
                <div className="student-card-loader-label">
                  <Skeleton
                    key={`text-1-${index}`}
                    variant="text"
                    width="50%"
                    height={32}
                  />
                  <Skeleton
                    key={`text-2-${index}`}
                    variant="text"
                    width="30%"
                    height={20}
                  />
                </div>
              </div>
            ))}
          </>
        ) : students && students.length > 0 ? (
          students.map((student) => (
            <div
              key={student.id}
              className={`student-card student-card-${size} ${
                selectedStudent?.id === student.id ? "selected-student" : ""
              }`}
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
                <div className={`student-labels-${size}`}>
                  <span className={`student-name ms-3 student-name-${size}`}>
                    {student.lastName}, {student.firstName}
                  </span>
                  {student.email && isRequest && size === "full" && (
                    <span className="student-list-subtitle ms-3">
                      {student.email}
                    </span>
                  )}
                  {student.studentNumber && size === "full" && (
                    <span className="student-list-subtitle ms-3">
                      {student.studentNumber}
                    </span>
                  )}
                </div>
              </div>

              {!hideOptions && !isRequest && (
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
                        }
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
                        }
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
                            false
                          )
                        }
                      >
                        Profile
                      </button>
                    </li>
                    {!hideDelete && (
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={() => handleDeleteClick(student)}
                        >
                          Delete
                        </button>
                      </li>
                    )}
                  </ul>
                </div>
              )}

              {!hideEmotion && student.moodCode && !isRequest && (
                <img
                  src={getEmotionImage(student.moodCode)}
                  alt={student.moodCode}
                  className={`emotion-icon emotion-icon-${size}`}
                />
              )}

              {isRequest && (
                <div className="button-container">
                  <button
                    className="danger-button student-list-button"
                    onClick={() => handleRejectClick(student)}
                  >
                    Reject
                  </button>
                  <button
                    className="primary-button student-list-button"
                    onClick={() => handleApproveClick(student)}
                  >
                    Approve
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <span>No students to display</span>
        )}
      </div>
    </div>
  );
};

export default StudentList;
