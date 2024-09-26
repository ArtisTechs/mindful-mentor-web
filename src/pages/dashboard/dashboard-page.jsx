import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./dashboard-page.css";
import Navbar from "../../components/navbar/navbar.component";
import OffCanvasDashboardMenu from "../../components/offcanvas/off-canvas-dashboard-menu/off-canvas-dashboard-menu";
import { ROUTES, STORAGE_KEY, useGlobalContext } from "../../shared";
import { Route, Routes } from "react-router-dom";
import HomePage from "../home-page/home-page";
import ProfilePage from "../profile-page/profile-page";
import CalendarPage from "../calendar-page/calendar-page";
import AppointmentPage from "../appointment-page/appointment-page";
import ChatWindow from "../../components/chat-window/chat-window.component";
import StudentListPage from "../student-list-page/student-list-page";

const DashboardPage = ({ onLogout }) => {
  const { currentUserDetails, isAppAdmin } = useGlobalContext();
  const [pageTitle, setPageTitle] = useState("Dashboard");
  const [showOffCanvas, setShowOffCanvas] = useState(false);
  const profileDetails =
    JSON.parse(localStorage.getItem(STORAGE_KEY.PROFILE_DETAILS)) || {};
  const location = useLocation();

  useEffect(() => {
    const routeTitles = {
      [`${ROUTES.WEB}${ROUTES.DASHBOARD}`]: "Dashboard",
      [`${ROUTES.WEB}${ROUTES.PROFILE}`]: "Profile",
      [`${ROUTES.WEB}${ROUTES.CALENDAR}`]: "Calendar",
      [`${ROUTES.WEB}${ROUTES.APPOINTMENTS}`]: "Appointments",
      [`${ROUTES.WEB}${ROUTES.STUDENTS}`]: "Students",
    };

    setPageTitle(routeTitles[location.pathname] || "Dashboard");
  }, [location.pathname]);

  const handleToggleOffCanvas = () => {
    setShowOffCanvas(!showOffCanvas);
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <Navbar
          title={pageTitle}
          toggleOffCanvas={handleToggleOffCanvas}
          onLogout={onLogout}
          profile={profileDetails}
        />
      </div>
      <div className="dashboard-content">
        <Routes>
          <Route path={ROUTES.DASHBOARD} element={<HomePage />} />
          <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
          <Route path={ROUTES.CALENDAR} element={<CalendarPage />} />
          <Route path={ROUTES.APPOINTMENTS} element={<AppointmentPage />} />

          {isAppAdmin && (
            <>
              <Route path={ROUTES.STUDENTS} element={<StudentListPage />} />
            </>
          )}
        </Routes>
      </div>
      <ChatWindow />

      <OffCanvasDashboardMenu
        show={showOffCanvas}
        handleClose={handleToggleOffCanvas}
      />
    </div>
  );
};

export default DashboardPage;
