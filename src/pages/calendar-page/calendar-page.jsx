import React from "react";
import "./calendar-page.css";
import CalendarComponent from "../../components/calendar/calendar.component";
import { useGlobalContext } from "../../shared/context";
import StudentList from "../../components/listing/student-list/student-list";

const CalendarPage = () => {
  const { currentUserDetails, isAppAdmin } = useGlobalContext();

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

  return (
    <div className="calendar-page">
      {isAppAdmin && (
        <>
          <div className="student-list-calendar">
            <StudentList
              students={students}
              size="half"
              hideEmotion={true}
              hideOptions={true}
              isItemClickable={true}
            />
          </div>
        </>
      )}

      <div className="calendar-component-page">
        <CalendarComponent data={mockData} />
      </div>
    </div>
  );
};

export default CalendarPage;
