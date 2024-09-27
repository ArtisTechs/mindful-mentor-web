import React from "react";
import "./home-page.css";
import EmotionPicker from "../../components/emotion-picker/emotion-picker.component";
import UpcomingEvents from "../../components/upcoming-events/upcoming-events.component";
import StudentList from "../../components/listing/student-list/student-list";
import logo from "../../assets/img/mindful-mentor-logo.png";
import { useGlobalContext } from "../../shared";

import JoyfulImage from "../../assets/img/Joyful.png";
import MotivatedImage from "../../assets/img/Motivated.png";
import CalmImage from "../../assets/img/Calm.png";
import AnxiousImage from "../../assets/img/Anxious.png";
import SadImage from "../../assets/img/Sad.png";
import FrustratedImage from "../../assets/img/Frustrated.png";

const HomePage = () => {
  const { currentUserDetails, isAppAdmin } = useGlobalContext();

  const students = [
    {
      id: 1,
      firstName: "Miguel",
      lastName: "Santos",
      avatar: "avatar1.png",
      emotion: { code: "motivated", description: "Motivated" },
    },
    {
      id: 2,
      firstName: "Carlos",
      lastName: "Reyes",
      avatar: "avatar2.png",
      emotion: { code: "anxious", description: "Anxious" },
    },
    {
      id: 3,
      firstName: "Isabel",
      lastName: "Garcia",
      avatar: "avatar3.png",
      emotion: { code: "frustrated", description: "Frustrated" },
    },
    {
      id: 4,
      firstName: "Diego",
      lastName: "Morales",
      avatar: "avatar3.png",
      emotion: { code: "joy", description: "Joyful" },
    },
    {
      id: 5,
      firstName: "Lucia",
      lastName: "Torres",
      avatar: "avatar3.png",
      emotion: { code: "calm", description: "Calm" },
    },
    {
      id: 6,
      firstName: "Emilio",
      lastName: "Fernandez",
      avatar: "avatar3.png",
      emotion: { code: "sad", description: "Sad" },
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
      {!isAppAdmin && (
        <>
          <div className="emotion-picker-container">
            <EmotionPicker />
          </div>
        </>
      )}

      <div className="home-page-cards">
        {isAppAdmin && (
          <>
            <StudentList students={students} size="half" />
          </>
        )}
        <UpcomingEvents events={events} />
      </div>
    </div>
  );
};

export default HomePage;
