import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import "./appointment-page.css";
import { Avatar } from "@mui/material";
import { stringAvatar } from "../../shared";
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
  const [appointments, setAppointments] = useState([]);

  // Load saved appointments from localStorage when the component mounts
  useEffect(() => {
    const savedAppointments = localStorage.getItem("appointments");
    if (savedAppointments) {
      setAppointments(JSON.parse(savedAppointments));
    }
  }, []);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleReasonChange = (event) => {
    setReason(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Create a new appointment object
    const newAppointment = {
      date: selectedDate,
      reason: reason,
    };

    // Update the list of appointments
    const updatedAppointments = [...appointments, newAppointment];

    // Save the updated list of appointments to localStorage
    localStorage.setItem("appointments", JSON.stringify(updatedAppointments));

    // Update the state to reflect the new appointment
    setAppointments(updatedAppointments);

    // Clear the form inputs after saving
    setSelectedDate("");
    setReason("");
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
            <h3>{`${counselor.firstName} ${counselor.lastName}`}</h3>
            <p>Counselor</p>
            <p className="available-schedule">
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
            <button className="secondary-button shadow" type="button">
              Cancel
            </button>
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
