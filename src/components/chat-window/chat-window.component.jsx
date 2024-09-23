import React, { useState, useEffect, useRef } from "react";
import { Popover, OverlayTrigger } from "react-bootstrap";
import "./chat-window.component.css";
import { STORAGE_KEY, stringAvatar } from "../../shared";
import { Avatar } from "@mui/material";

const counselor = {
  email: "suarezestanislaojose@gmail.com",
  firstName: "Maria",
  lastName: "Cruz",
  phoneNumber: "9511682096",
  availableSchedule: "Mon - Fri (8:00 am - 5:00 pm)",
  avatar: "",
  isActive: true,
};

const ChatWindow = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const chatBodyRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);
    const savedMessages =
      JSON.parse(localStorage.getItem(STORAGE_KEY.MESSAGES)) || [];

    if (savedMessages.length === 0) {
      const sampleMessage = {
        text: "Hello! How can I assist you today?",
        sender: "counselor",
      };
      savedMessages.push(sampleMessage);
      localStorage.setItem(STORAGE_KEY.MESSAGES, JSON.stringify(savedMessages));
    }

    setMessages(savedMessages);
  }, []);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const newMessage = { text: inputValue, sender: "user" };
      const updatedMessages = [...messages, newMessage];
      setMessages(updatedMessages);
      localStorage.setItem(
        STORAGE_KEY.MESSAGES,
        JSON.stringify(updatedMessages)
      );
      setInputValue(""); // Clear input field
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const popover = (
    <Popover id="chat-popover">
      <div className={`chat-window ${isVisible ? "open" : "close"}`}>
        <div className="chat-header">
          <div className="chat-avatar">
            <Avatar
              {...stringAvatar(
                `${counselor.firstName}`,
                `${counselor.lastName}`,
                40,
                18
              )}
              src={counselor.avatar}
            />
            <div
              className={`is-active ${
                counselor.isActive ? "active" : "inactive"
              }`}
            ></div>
            <h3>Chat with Counselor</h3>
          </div>

          <button className="close-btn-chat" onClick={handleClose}>
            <i className="fa fa-times"></i>
          </button>
        </div>
        <div className="chat-body" ref={chatBodyRef}>
          {messages.length > 0 ? (
            messages.map((msg, index) => (
              <div key={index} className={`chat-bubble ${msg.sender}`}>
                {msg.text}
              </div>
            ))
          ) : (
            <p className="mb-0">No messages yet. Start the conversation!</p>
          )}
        </div>
        <div className="chat-footer">
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
    </Popover>
  );

  return (
    <OverlayTrigger trigger="click" placement="left" overlay={popover}>
      <button className="chat-head gradient-background shadow">
        <i className="far fa-message"></i>
      </button>
    </OverlayTrigger>
  );
};

export default ChatWindow;
