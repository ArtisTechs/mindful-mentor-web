import React, { useEffect, useRef, useState } from "react";
import "./chat-page.css";
import { useGlobalContext } from "../../shared/context";
import StudentList from "../../components/listing/student-list/student-list";
import { Avatar } from "@mui/material";
import {
  AccountStatusEnum,
  arrangeMessagesByTimestamp,
  EErrorMessages,
  fetchStudentList,
  getMessagesForReceiver,
  stringAvatar,
  toastService,
  webSocketService,
} from "../../shared";
import { useLocation } from "react-router-dom";

const ChatPage = ({ setFullLoadingHandler }) => {
  const location = useLocation();
  const { student } = location.state || {};
  const { currentUserDetails, isAppAdmin } = useGlobalContext();
  const [students, setStudents] = useState([]);
  const chatBodyRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState(() => {
    return student || null;
  });

  useEffect(() => {
    if (isAppAdmin) {
      loadStudents();
      loadNewMessages();
    }
  }, [isAppAdmin]);

  const loadStudents = async () => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const response = await fetchStudentList({
        status: AccountStatusEnum.ACTIVE,
      });
      setStudents(response.content);
    } catch (error) {
      toastService.show(EErrorMessages.CONTACT_ADMIN, "danger-toast");
    } finally {
      setLoading(false);
    }
  };

  const loadNewMessages = async () => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const recentMessages = await getMessagesForReceiver(
        currentUserDetails.id
      );
      console.log(recentMessages);
    } catch (error) {
      toastService.show(EErrorMessages.CONTACT_ADMIN, "danger-toast");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectStudent = async (student) => {
    setFullLoadingHandler(true);
    setSelectedStudent(student);
    setMessages([]);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const senderhistory = await webSocketService.fetchMessageHistory(
        currentUserDetails.id,
        student.id
      );
      const recieverHistory = await webSocketService.fetchMessageHistory(
        student.id,
        currentUserDetails.id
      );
      const messageHistory = arrangeMessagesByTimestamp(
        senderhistory,
        recieverHistory
      );
      setMessages(messageHistory);
      setFullLoadingHandler(false);
    } catch (error) {
      setFullLoadingHandler(false);
      toastService.show(EErrorMessages.CONTACT_ADMIN, "danger-toast");
      setMessages([]);
    }

    // WebSocket connection to listen for incoming messages
    webSocketService.disconnect();
    setTimeout(() => {
      webSocketService.connect(student.id, (newMessage) => {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });
    }, 500);
  };

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  // Send a message
  const handleSendMessage = () => {
    const messageText = String(inputValue).trim();

    if (messageText) {
      try {
        webSocketService.sendMessage(
          messageText,
          selectedStudent.id,
          currentUserDetails.id,
          selectedStudent.id
        );
      } catch (error) {
        toastService.show(EErrorMessages.CONTACT_ADMIN, "danger-toast");
      }

      setInputValue("");
    }
  };

  // Handle pressing Enter key to send message
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
          isSelectedStudent={selectedStudent}
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
                {/* <div
                  className={`is-active-page ${
                    selectedStudent.isActive ? "active" : "inactive"
                  }`}
                ></div> */}
                <h3>{`${selectedStudent.firstName} ${selectedStudent.lastName}`}</h3>
              </div>
            </div>
            <div className="chat-body-page" ref={chatBodyRef}>
              {messages.length > 0 ? (
                messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`chat-bubble-page ${
                      msg.senderId === currentUserDetails.id
                        ? "user"
                        : "student"
                    }`}
                  >
                    {msg.content}
                  </div>
                ))
              ) : (
                <p className="mb-0">No messages yet. Start the conversation!</p>
              )}
            </div>
            <div className="chat-footer-page">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                maxLength={255}
              />
              <button className="send-btn" onClick={handleSendMessage}>
                <i className="fas fa-paper-plane"></i>
              </button>
            </div>
          </>
        ) : (
          <div className="w-100 h-100 d-flex align-items-center justify-content-center">
            <p>Please select a student to start chatting.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
