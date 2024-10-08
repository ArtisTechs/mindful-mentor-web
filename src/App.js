import React, { useState, useEffect } from "react";
import {
  HashRouter as Router,
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
import { useGlobalContext } from "./shared/context";

function App() {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("success");
  const [isLoading, setIsLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const { currentUserDetails, setCurrentUserDetails, setIsAppAdmin } =
    useGlobalContext();

  const appAdmin = {
    email: "appadmin@gmail.com",
    firstName: "App",
    lastName: "Admin",
    middleName: "",
    password: "Test1234!",
    phoneNumber: "9511682096",
    reEnterPassword: "Test1234!",
    isAdmin: true,
  };

  // Check if the app admin is already registered based on email
  const registeredUsers =
    JSON.parse(localStorage.getItem(STORAGE_KEY.USERS)) || [];

  const adminExists = registeredUsers.some(
    (user) => user.email === appAdmin.email
  );

  if (!adminExists) {
    const updatedUsers = [...registeredUsers, appAdmin];
    localStorage.setItem(STORAGE_KEY.USERS, JSON.stringify(updatedUsers));
  }

  useEffect(() => {
    const storedProfile = localStorage.getItem(STORAGE_KEY.PROFILE_DETAILS);
    if (storedProfile) {
      const profileData = JSON.parse(storedProfile);
      setCurrentUserDetails(profileData);
      setLoggedIn(true);
      setIsAppAdmin(profileData.isAdmin);
    }

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [setCurrentUserDetails, setIsAppAdmin]);

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
    setCurrentUserDetails(profileData); // Update global state on login
    setLoggedIn(true);
    setIsAppAdmin(profileData.isAdmin); // Update admin status on login
  };

  // Handle logout and clear localStorage
  const handleLogout = () => {
    localStorage.removeItem(STORAGE_KEY.PROFILE_DETAILS);
    setCurrentUserDetails(null); // Clear global state on logout
    setLoggedIn(false);
    setIsAppAdmin(false); // Reset admin status on logout
  };

  return (
    <Router>
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
