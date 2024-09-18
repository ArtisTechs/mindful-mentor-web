// pages/dashboard/DashboardPage.js
import React, { useState } from "react";
import "./dashboard-page.css";
import Navbar from "../../components/navbar/navbar.component";
import OffCanvasDashboardMenu from "../../components/offcanvas/off-canvas-dashboard-menu/off-canvas-dashboard-menu";
import HomePage from "../home-page/home-page";
import ProfilePage from "../profile-page/profile-page";

const DashboardPage = () => {
  const [pageTitle, setPageTitle] = useState("Dashboard");
  const [showOffCanvas, setShowOffCanvas] = useState(false);

  const handleToggleOffCanvas = () => {
    setShowOffCanvas(!showOffCanvas);
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <Navbar title={pageTitle} toggleOffCanvas={handleToggleOffCanvas} />
      </div>
      <div className="dashboard-content">
        {/* <HomePage /> */}
        <ProfilePage />
      </div>
      <OffCanvasDashboardMenu
        show={showOffCanvas}
        handleClose={handleToggleOffCanvas}
      />
    </div>
  );
};

export default DashboardPage;
