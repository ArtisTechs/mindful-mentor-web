import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./styles/_variables.css";
import "./styles/_globalStyles.css";
import LoginPage from "./pages/login/login-page";
import ToastMessage from "./components/toast-message/toast-message";
import { toastService } from "./shared";
import FullLoaderComponent from "./components/full-loader/full-loader-component";
import DashboardPage from "./pages/dashboard/dashboard-page";

function App() {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("success");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate an initial loading process
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

  return (
    <div className="app">
      {isLoading && <FullLoaderComponent isLoading={isLoading} />}

      <header className="app-header"></header>
      <div className="app-body">
        {/* <LoginPage setFullLoadingHandler={setIsLoading} /> */}
        <DashboardPage />
      </div>
      <footer className="app-footer"></footer>

      <ToastMessage
        show={showToast}
        setShow={setShowToast}
        message={toastMessage}
        variant={toastVariant}
      />
    </div>
  );
}

export default App;
