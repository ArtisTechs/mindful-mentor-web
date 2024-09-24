import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./styles/_variables.css";
import "./styles/_globalStyles.css";
import LoginPage from "./pages/login/login-page";
import ToastMessage from "./components/toast-message/toast-message";
import { STORAGE_KEY, toastService, ROUTES } from "./shared";
import FullLoaderComponent from "./components/full-loader/full-loader-component";
import DashboardPage from "./pages/dashboard/dashboard-page";

function App() {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("success");
  const [isLoading, setIsLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // Check localStorage for stored profileDetails
    const storedProfile = localStorage.getItem(STORAGE_KEY.PROFILE_DETAILS);
    if (storedProfile) {
      setLoggedIn(true);
    }

    const timer = setTimeout(() => {
      setIsLoading(false); // Stop loading after 2 seconds
    }, 2000);

    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);

  useEffect(() => {
    toastService.registerShowToastCallback((message, variant) => {
      setToastMessage(message);
      setToastVariant(variant);
      setShowToast(true);
    });
  }, []);

  // Handle successful login and store profile details in localStorage
  const handleLoginSuccess = (profileData) => {
    localStorage.setItem(
      STORAGE_KEY.PROFILE_DETAILS,
      JSON.stringify(profileData)
    );
    setLoggedIn(true);
  };

  // Handle logout and clear localStorage
  const handleLogout = () => {
    localStorage.removeItem(STORAGE_KEY.PROFILE_DETAILS);
    setLoggedIn(false);
  };

  return (
    <Router basename={ROUTES.MINDFUL_MENTOR}>
      {isLoading && <FullLoaderComponent isLoading={isLoading} />}

      <div className="app">
        <header className="app-header"></header>
        <div className="app-body">
          <Routes>
            <Route
              path={ROUTES.LOGIN}
              element={
                loggedIn ? (
                  <Navigate to={`${ROUTES.WEB}${ROUTES.DASHBOARD}`} />
                ) : (
                  <LoginPage
                    setFullLoadingHandler={setIsLoading}
                    onLoginSuccess={handleLoginSuccess}
                  />
                )
              }
            />

            {/* Protected Dashboard route, redirect to login if not logged in */}
            <Route
              path={`${ROUTES.WEB}/*`}
              element={
                loggedIn ? (
                  <DashboardPage onLogout={handleLogout} />
                ) : (
                  <Navigate to={ROUTES.LOGIN} />
                )
              }
            />

            <Route
              path="/"
              element={
                loggedIn ? (
                  <Navigate to={`${ROUTES.WEB}${ROUTES.DASHBOARD}`} />
                ) : (
                  <Navigate to={ROUTES.LOGIN} />
                )
              }
            />

            <Route path="*" element={<Navigate to={ROUTES.LOGIN} />} />
          </Routes>
        </div>
        <footer className="app-footer"></footer>

        <ToastMessage
          show={showToast}
          setShow={setShowToast}
          message={toastMessage}
          variant={toastVariant}
        />
      </div>
    </Router>
  );
}

export default App;
