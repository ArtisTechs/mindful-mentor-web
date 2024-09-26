import React from "react";
import "./home-page.css";
import EmotionPicker from "../../components/emotion-picker/emotion-picker.component";
import UpcomingEvents from "../../components/upcoming-events/upcoming-events.component";
import StudentList from "../../components/listing/student-list/student-list";
import logo from "../../assets/img/mindful-mentor-logo.png";
import { useGlobalContext } from "../../shared";

const HomePage = () => {
  const { currentUserDetails, isAppAdmin } = useGlobalContext();

  const students = [
    {
      id: 1,
      firstName: "Juan",
      lastName: "Dela Cruz",
      avatar: "avatar1.png", // Replace with actual avatar image URL
      emotionIcon: logo, // Replace with actual emotion icon URL
    },
    {
      id: 2,
      firstName: "Juan",
      lastName: "Cruz",
      avatar: "avatar2.png",
      emotionIcon: logo,
    },
    {
      id: 3,
      firstName: "Juan",
      lastName: "Dela Cruz",
      avatar: "avatar3.png",
      emotionIcon: logo,
    },
    {
      id: 4,
      firstName: "Juan",
      lastName: "Dela Cruz",
      avatar: "avatar3.png",
      emotionIcon: logo,
    },
    {
      id: 5,
      firstName: "Juan",
      lastName: "Dela Cruz",
      avatar: "avatar3.png",
      emotionIcon: logo,
    },
    {
      id: 6,
      firstName: "Juan",
      lastName: "Dela Cruz",
      avatar: "avatar3.png",
      emotionIcon: logo,
    },
  ];

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

      <div className="home-page-cards">
        <UpcomingEvents events={events} />
        {isAppAdmin && (
          <>
            <StudentList students={students} size="half" />
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;
