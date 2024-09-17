import React from "react";
import "./home-page.css";
import EmotionPicker from "../../components/emotion-picker/emotion-picker.component";

const HomePage = () => {
  return (
    <div className="d-flex justify-content-center w-100 h-100 p-5">
      <EmotionPicker />
    </div>
  );
};

export default HomePage;
