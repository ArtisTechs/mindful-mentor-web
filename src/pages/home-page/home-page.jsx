import React, { useEffect, useState } from "react";
import "./home-page.css";
import EmotionPicker from "../../components/emotion-picker/emotion-picker.component";
import UpcomingEvents from "../../components/upcoming-events/upcoming-events.component";
import StudentList from "../../components/listing/student-list/student-list";
import {
  AppointmentStatusEnum,
  EErrorMessages,
  fetchAppointmentList,
  toastService,
  useGlobalContext,
} from "../../shared";

const HomePage = ({ setFullLoadingHandler }) => {
  const { currentUserDetails, isAppAdmin } = useGlobalContext();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUserDetails.id) {
      loadAppointments();
    }
  }, [currentUserDetails.id]);

  const loadAppointments = async () => {
    setLoading(true);
    const today = new Date().toISOString().split("T")[0];
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const finalEndDate = tomorrow.toISOString().split("T")[0];

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Ensure we are passing userId only if the user is not an admin
      const userId = isAppAdmin ? null : currentUserDetails.id;

      const response = await fetchAppointmentList({
        userId: userId,
        sortBy: "scheduledDate",
        sortDirection: "DSC",
        startDate: today,
        endDate: isAppAdmin ? finalEndDate : null,
        status: isAppAdmin ? AppointmentStatusEnum.APPROVED : null,
      });

      setAppointments(response.content);
    } catch (error) {
      toastService.show(EErrorMessages.CONTACT_ADMIN, "danger-toast");
    } finally {
      setLoading(false);
    }
  };

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
    <div className="home-page">
      {!isAppAdmin && (
        <>
          <div className="emotion-picker-container">
            <EmotionPicker />
          </div>
        </>
      )}

      <div className="home-page-cards">
        {isAppAdmin && <StudentList students={students} size="half" />}
        <UpcomingEvents
          appointments={appointments}
          isAppAdmin={isAppAdmin}
          setFullLoadingHandler={setFullLoadingHandler}
        />
      </div>
    </div>
  );
};

export default HomePage;
