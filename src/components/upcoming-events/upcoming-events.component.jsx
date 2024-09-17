import React from "react";
import "./upcoming-events.component.css";

const UpcomingEventsCard = ({ event }) => {
  const { title, date, description } = event;

  return (
    <div className="event-card shadow">
      <div className="event-card-header">
        <h1>{title}</h1>
        <p>{date}</p>
      </div>
      <div className="event-card-body">
        <p className="event-description">{description}</p>
      </div>
    </div>
  );
};

const UpcomingEvents = ({ events }) => {
  return (
    <div className="upcoming-events-container">
      <h1>
        {events && events.length > 0 ? "Upcoming Events" : "No upcoming events"}
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
