import React, { useEffect, useRef, useState } from "react";
import "./chat-page.css";
import { useGlobalContext } from "../../shared/context";
import StudentList from "../../components/listing/student-list/student-list";
import { Avatar } from "@mui/material";
import { stringAvatar } from "../../shared";

const ChatPage = () => {
  const { currentUserDetails, isAppAdmin } = useGlobalContext();
  const chatBodyRef = useRef(null);

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

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [messages, setMessages] = useState([
    { text: "Hi!", sender: "student" },
    { text: "I have a problem", sender: "student" },
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleSelectStudent = (student) => {
    console.log(student);
    setMessages([
      { text: "Hi!", sender: "student" },
      { text: "I have a problem", sender: "student" },
    ]);
    setSelectedStudent(student);
  };

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const newMessage = { text: inputValue, sender: "user" };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInputValue(""); // Clear the input field
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="chat-page">
      <div className="student-list-chat">
        <StudentList
          students={students}
          size="half"
          hideEmotion={true}
          hideOptions={true}
          isItemClickable={true}
          isGetLatestStudent={true}
          onSelectStudent={handleSelectStudent}
        />
      </div>

      <div className="chat-window-page shadow">
        {selectedStudent ? (
          <>
            <div className="chat-header-page">
              <div className="chat-avatar-page">
                <Avatar
                  {...stringAvatar(
                    `${selectedStudent.firstName}`,
                    `${selectedStudent.lastName}`,
                    52,
                    24
                  )}
                  src={selectedStudent.avatar}
                />
                <div
                  className={`is-active-page ${
                    selectedStudent.isActive ? "active" : "inactive"
                  }`}
                ></div>
                <h3>{`${selectedStudent.firstName} ${selectedStudent.lastName}`}</h3>
              </div>
            </div>
            <div className="chat-body-page" ref={chatBodyRef}>
              {messages.length > 0 ? (
                messages.map((msg, index) => (
                  <div key={index} className={`chat-bubble-page ${msg.sender}`}>
                    {msg.text}
                  </div>
                ))
              ) : (
                <p className="mb-0">No messages yet. Start the conversation!</p>
              )}
            </div>
          </>
        ) : (
          <p>Please select a student to start chatting.</p>
        )}

        <div className="chat-footer-page">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
          />
          <button className="send-btn" onClick={handleSendMessage}>
            <i className="fas fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
