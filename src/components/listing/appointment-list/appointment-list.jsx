import React from "react";
import "./appointment-list.css";
import AppointmentCard from "../../cards/appointment-card/appointment-card.component";

const AppointmentCardList = ({ appointments }) => {
  const handleApprove = (id) => {
    console.log(`Appointment Approved: ${id}`);
  };

  const handleReject = (id) => {
    console.log(`Appointment Rejected: ${id}`);
  };

  return (
    <div className="appointment-list shadow">
      {!appointments || appointments.length === 0 ? (
        <p>No appointments available.</p>
      ) : (
        appointments.map((appointment, index) =>
          appointment && appointment.student ? (
            <AppointmentCard
              key={index}
              student={appointment.student}
              date={appointment.date || "Date not available"}
              onApprove={() => handleApprove(appointment.id)}
              onReject={() => handleReject(appointment.id)}
            />
          ) : (
            <p key={index}>Invalid appointment data</p>
          )
        )
      )}
    </div>
  );
};

export default AppointmentCardList;
