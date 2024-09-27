import React from "react";
import "./student-list-page.css";
import StudentList from "../../components/listing/student-list/student-list";
import logo from "../../assets/img/mindful-mentor-logo.png";

const StudentListPage = () => {
  // Sample student data
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
    <div className="student-list-page">
      <StudentList students={students} size="full" showHeader={false} />
    </div>
  );
};

export default StudentListPage;
