import React from "react";
import "./appointment-card.component.css";
import { Avatar } from "@mui/material";
import { stringAvatar } from "../../../shared";

const AppointmentCard = ({ title, student, date, onApprove, onReject }) => {
  return (
    <div className="appointment-card">
      <div className="card-header">
        <h2>{title || "Request"}</h2>
        <div className="appointment-card-divider"></div>
      </div>
      <div className="card-body">
        <div className="user-info">
          <Avatar
            {...stringAvatar(
              `${student.firstName}`,
              `${student.lastName}`,
              80,
              32
            )}
            src={student.avatar}
          />
          <div className="user-details">
            <h3>{`${student.lastName}, ${student.firstName}`}</h3>
            <p>{student.role}</p>
          </div>
        </div>
        <div className="appointment-date">
          <h3>Date</h3>
          <p>{date}</p>
        </div>
      </div>

      <div className="button-container">
        <button className="secondary-button" onClick={onReject}>
          Reject
        </button>
        <button className="primary-button" onClick={onApprove}>
          Approve
        </button>
      </div>
    </div>
  );
};

export default AppointmentCard;
