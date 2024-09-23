import React, { useEffect, useState } from "react";
import "./upcoming-events.component.css";
import { STORAGE_KEY } from "../../shared";

// Helper function to format the date
const formatDate = (dateString) => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, options);
};

const UpcomingEventsCard = ({ event }) => {
  const { title, date, description } = event;

  return (
    <div className="event-card shadow">
      <div className="event-card-header">
        <h1>{title}</h1>
        <p>{formatDate(date)}</p>
      </div>
      <div className="event-card-body">
        <p className="event-description">
          <b>Reason:</b> {description}
        </p>
      </div>
    </div>
  );
};

const UpcomingEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const savedAppointments =
      JSON.parse(localStorage.getItem(STORAGE_KEY.APPOINTMENTS)) || [];

    const formattedEvents = savedAppointments.map((appointment) => ({
      title: "Counseling Appointment",
      date: appointment.date,
      description: appointment.reason,
    }));

    setEvents(formattedEvents);
  }, []);

  return (
    <div className="upcoming-events-container">
      <h1>
        {events && events.length > 0
          ? "Upcoming Appointments"
          : "No upcoming appointments"}
      </h1>
      <div className="events-divider"></div>
      <div className="upcoming-events-list">
        {events && events.length > 0 ? (
          events.map((event, index) => (
            <UpcomingEventsCard key={index} event={event} />
          ))
        ) : (
          <div className="no-events-message">
            <p>Schedule a personal appointment with a guidance counselor?</p>
            <button className="schedule-btn">
              Schedule Now <i className="bi bi-arrow-right"></i>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpcomingEvents;
