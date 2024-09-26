import React from "react";
import "./student-list-page.css";
import StudentList from "../../components/listing/student-list/student-list";
import logo from "../../assets/img/mindful-mentor-logo.png";

const StudentListPage = () => {
  // Sample student data
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

  return (
    <div className="student-list-page">
      <StudentList students={students} size="full" showHeader={false} />
    </div>
  );
};

export default StudentListPage;
