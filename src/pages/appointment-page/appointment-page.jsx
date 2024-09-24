import React, { useState, useEffect } from "react";
import { Form, Toast } from "react-bootstrap";
import "./appointment-page.css";
import { Avatar } from "@mui/material";
import {
  EErrorMessages,
  ESuccessMessages,
  STORAGE_KEY,
  stringAvatar,
  toastService,
} from "../../shared";
import DatePicker from "../../components/date-picker/date-picker.component";

const AppointmentPage = () => {
  const counselor = {
    email: "suarezestanislaojose@gmail.com",
    firstName: "Maria",
    lastName: "Cruz",
    phoneNumber: "9511682096",
    availableSchedule: "Mon - Fri (8:00 am - 5:00 pm)",
    avatar: "",
  };

  const [selectedDate, setSelectedDate] = useState("");
  const [reason, setReason] = useState("");

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleReasonChange = (event) => {
    setReason(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const savedAppointments =
      JSON.parse(localStorage.getItem(STORAGE_KEY.APPOINTMENTS)) || [];

    const appointmentExists = savedAppointments.some(
      (appointment) => appointment.date === selectedDate
    );

    if (appointmentExists) {
      toastService.show(EErrorMessages.APPOINTMENT_DUPLICATE, "danger-toast");
    } else {
      const newAppointment = {
        date: selectedDate,
        reason: reason,
      };

      const updatedAppointments = [...savedAppointments, newAppointment];

      localStorage.setItem(
        STORAGE_KEY.APPOINTMENTS,
        JSON.stringify(updatedAppointments)
      );

      toastService.show(ESuccessMessages.APPOINTMENT, "success-toast");

      setSelectedDate("");
      setReason("");
    }
  };

  return (
    <div className="appointment-page">
      <div className="appointment-container shadow">
        <div className="counselor-info">
          <Avatar
            {...stringAvatar(
              `${counselor.firstName}`,
              `${counselor.lastName}`,
              100,
              32
            )}
            src={counselor.avatar}
          />
          <div className="counselor-details">
            <h3 className="mb-0">{`${counselor.firstName} ${counselor.lastName}`}</h3>
            <p className="mb-0">Counselor</p>
            <p className="available-schedule mb-0">
              Available Schedule: <strong>{counselor.availableSchedule}</strong>
            </p>
          </div>
        </div>

        <Form onSubmit={handleSubmit} className="appointment-form">
          <DatePicker
            selectedDate={selectedDate}
            handleDateChange={handleDateChange}
            minDate={new Date().toISOString().split("T")[0]} // today's date
          />

          <Form.Group className="reason-input">
            <Form.Label>
              <strong>Reason:</strong>
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter reason for appointment"
              value={reason}
              onChange={handleReasonChange}
              required
            />
          </Form.Group>

          <div className="button-container mb-2">
            <button className="white-button shadow" type="submit">
              Save Schedule
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AppointmentPage;
