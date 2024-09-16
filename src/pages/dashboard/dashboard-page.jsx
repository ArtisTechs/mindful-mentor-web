// pages/dashboard/DashboardPage.js
import React, { useState } from "react";
import "./dashboard-page.css";
import Navbar from "../../components/navbar/navbar.component";

const DashboardPage = () => {
  const [pageTitle, setPageTitle] = useState("Dashboard");

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <Navbar title={pageTitle} />
      </div>
      <div className="dashboard-content"></div>
    </div>
  );
};

export default DashboardPage;
