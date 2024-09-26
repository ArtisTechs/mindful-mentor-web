import React, { useState } from "react";
import { Form } from "react-bootstrap";
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
import { useGlobalContext } from "../../shared/context";
import AppointmentCardList from "../../components/listing/appointment-list/appointment-list";

const AppointmentPage = () => {
  const { currentUserDetails, isAppAdmin } = useGlobalContext();

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

    if (!selectedDate) {
      toastService.show(EErrorMessages.DATE_REQUIRED, "danger-toast");
      return;
    }

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
      {!isAppAdmin && (
        <>
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
                  Available Schedule:{" "}
                  <strong>{counselor.availableSchedule}</strong>
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
        </>
      )}
      {isAppAdmin && (
        <>
          <AppointmentCardList appointments={appointments} />
        </>
      )}
    </div>
  );
};

const appointments = [
  {
    id: 1,
    student: {
      firstName: "Juan",
      lastName: "Dela Cruz",
      role: "Student",
      profilePicture: "/path/to/image1.jpg",
    },
    date: "Monday - September 16, 2024",
  },
  {
    id: 2,
    student: {
      firstName: "Anna",
      lastName: "Smith",
      role: "Student",
      profilePicture: "/path/to/image2.jpg",
    },
    date: "Tuesday - September 17, 2024",
  },
  {
    id: 3,
    student: {
      firstName: "John",
      lastName: "Doe",
      role: "Student",
      profilePicture: "/path/to/image3.jpg",
    },
    date: "Wednesday - September 18, 2024", // Added a date instead of null
  },
  {
    id: 4,
    student: {
      firstName: "Emily",
      lastName: "Williams",
      role: "Student",
      profilePicture: "/path/to/image4.jpg",
    },
    date: "Thursday - September 19, 2024", // Added a date instead of missing field
  },
  {
    id: 5,
    student: {
      firstName: "Chris",
      lastName: "Miller",
      role: "Student",
      profilePicture: "/path/to/image5.jpg",
    },
    date: "Friday - September 20, 2024",
  },
  {
    id: 6,
    student: {
      firstName: "David",
      lastName: "Johnson",
      role: "Student",
      profilePicture: "/path/to/image6.jpg",
    },
    date: "Saturday - September 21, 2024",
  },
];



export default AppointmentPage;
