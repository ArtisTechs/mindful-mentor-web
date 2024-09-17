import React, { useState } from "react";
import "./emotion-picker.component.css";

// Importing emotion images
import JoyfulImage from "../../assets/img/Joyful.png";
import MotivatedImage from "../../assets/img/Motivated.png";
import CalmImage from "../../assets/img/Calm.png";
import AnxiousImage from "../../assets/img/Anxious.png";
import SadImage from "../../assets/img/Sad.png";
import FrustratedImage from "../../assets/img/Frustrated.png";

const emotions = [
  { name: "Joyful", image: JoyfulImage },
  { name: "Motivated", image: MotivatedImage },
  { name: "Calm", image: CalmImage },
  { name: "Anxious", image: AnxiousImage },
  { name: "Sad", image: SadImage },
  { name: "Frustrated", image: FrustratedImage },
];

const EmotionPicker = () => {
  const [selectedEmotion, setSelectedEmotion] = useState("");

  const handleEmotionClick = (emotionName) => {
    setSelectedEmotion(emotionName);
  };

  return (
    <div className="emotion-picker">
      <h1>How are you feeling today?</h1>

      <div className="emotion-list">
        {emotions.map((emotion, index) => (
          <div
            key={index}
            className={`emotion-btn ${
              selectedEmotion === emotion.name ? "selected" : ""
            }`}
            onClick={() => handleEmotionClick(emotion.name)}
          >
            <img
              src={emotion.image}
              alt={emotion.name}
              className="emotion-image"
            />
            <p className="emotion-name">{emotion.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmotionPicker;
