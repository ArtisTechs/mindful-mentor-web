import React from "react";
import "./calendar-page.css";
import CalendarComponent from "../../components/calendar/calendar.component";

const CalendarPage = () => {
  const mockData = [
    {
      id: "1234",
      emotion: { code: "joy", description: "Joyful" },
      date: "2024-09-17T07:22:43Z",
      icon: "",
    },
    {
      id: "12345",
      emotion: { code: "sad", description: "Sad" },
      date: "2024-09-18T07:22:43Z",
      icon: "",
    },
    {
      id: "12346",
      emotion: { code: "motivated", description: "Motivated" },
      date: "2024-09-19T07:22:43Z",
      icon: "",
    },
    {
      id: "12346",
      emotion: { code: "calm", description: "Calm" },
      date: "2024-09-20T07:22:43Z",
      icon: "",
    },
    {
      id: "12346",
      emotion: { code: "anxious", description: "Anxious" },
      date: "2024-09-21T07:00:43Z",
      icon: "",
    },
    {
      id: "12346",
      emotion: { code: "frustrated", description: "Frustrated" },
      date: "2024-09-16T07:22:43Z",
      icon: "",
    },
  ];

  return (
    <div className="calendar-page">
      <CalendarComponent data={mockData} />
    </div>
  );
};

export default CalendarPage;
