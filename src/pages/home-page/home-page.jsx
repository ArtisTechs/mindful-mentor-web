import React from "react";
import "./home-page.css";
import EmotionPicker from "../../components/emotion-picker/emotion-picker.component";
import UpcomingEvents from "../../components/upcoming-events/upcoming-events.component";

const HomePage = () => {
  const events = [
    {
      title: "Scheduled Appointment with Counselor",
      date: "September 30, 2024",
      description:
        "Join us for an inspiring workshop on mindfulness and mentorship.",
    },
    {
      title: "Scheduled Appointment with Counselor",
      date: "October 5, 2024",
      description:
        "A seminar on mental wellness and stress management techniques.",
    },
  ];
  return (
    <div className="home-page">
      <div className="emotion-picker-container">
        <EmotionPicker />
      </div>
      <UpcomingEvents events={events} />
    </div>
  );
};

export default HomePage;
