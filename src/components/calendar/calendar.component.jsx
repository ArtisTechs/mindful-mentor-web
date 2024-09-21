import React, { useState } from "react";
import { Button, OverlayTrigger, Popover } from "react-bootstrap";
import "./calendar.component.css";
import { daysOfWeekShort, daysOfWeek } from "../../shared";
import logo from "../../assets/img/mindful-mentor-logo.png";

const CalendarComponent = ({ data }) => {
  const [view, setView] = useState("month"); // 'month' or 'week'
  const [currentDate, setCurrentDate] = useState(new Date());

  const handlePrev = () => {
    if (view === "month") {
      setCurrentDate(
        new Date(currentDate.setMonth(currentDate.getMonth() - 1))
      );
    } else if (view === "week") {
      setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() - 7)));
    }
  };

  const handleNext = () => {
    if (view === "month") {
      setCurrentDate(
        new Date(currentDate.setMonth(currentDate.getMonth() + 1))
      );
    } else if (view === "week") {
      setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() + 7)));
    }
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(Date.UTC(year, month, 1));
    const lastDay = new Date(Date.UTC(year, month + 1, 0));
    const days = [];

    for (let i = 1; i <= lastDay.getUTCDate(); i++) {
      days.push(new Date(Date.UTC(year, month, i)));
    }

    const startDay = firstDay.getUTCDay();
    const daysToDisplay = [];

    for (let i = 0; i < startDay; i++) {
      daysToDisplay.push(null);
    }

    daysToDisplay.push(...days);

    const endDay = lastDay.getUTCDay();
    if (endDay < 6) {
      for (let i = 1; i <= 6 - endDay; i++) {
        daysToDisplay.push(null);
      }
    }

    return daysToDisplay;
  };

  const getDayColor = (day) => {
    const dateStr = day.toISOString().split("T")[0]; // Convert to YYYY-MM-DD format
    const entry = data.find((data) => data.date.startsWith(dateStr));
    if (entry) {
      switch (entry.emotion.code) {
        case "joy":
          return "yellow";
        case "motivated":
          return "green";
        case "calm":
          return "blue";
        case "anxious":
          return "orange";
        case "sad":
          return "gray";
        case "frustrated":
          return "red";
        default:
          return "default";
      }
    }
    return "default";
  };

  const getDaysInWeek = (date) => {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());

    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(day.getDate() + i);
      days.push(day);
    }

    return days;
  };

  const renderDays = () => {
    const days =
      view === "month"
        ? getDaysInMonth(currentDate)
        : getDaysInWeek(currentDate);

    return days.map((day, index) => {
      if (day) {
        const dateStr = day.toISOString().split("T")[0]; // Format date as YYYY-MM-DD
        const entry = data.find((data) => data.date.startsWith(dateStr));

        return (
          <div
            key={index}
            className={`calendar-day calendar-day-${getDayColor(day)}`}
          >
            <div className="day-number">{day.getDate()}</div>
            {view === "week" && (
              <>
                <div className="day-name">{daysOfWeek[day.getDay()]}</div>
                {entry && (
                  <div className="emotion-info">
                    <div className="emotion-description">
                      {entry.emotion.description}
                    </div>
                    <img
                      src={entry.icon || logo}
                      alt={entry.emotion.code}
                      className="emotion-icon"
                    />
                  </div>
                )}
              </>
            )}
          </div>
        );
      } else {
        return <div key={index} className="calendar-day-empty"></div>;
      }
    });
  };

  const renderCalendar = () => {
    if (view === "month") {
      return (
        <div className="calendar-month">
          {daysOfWeekShort.map((day) => (
            <div key={day} className="calendar-header">
              {day}
            </div>
          ))}
          {renderDays()}
        </div>
      );
    } else if (view === "week") {
      return <div className="calendar-week">{renderDays()}</div>;
    }
  };

  const getMonthYearHeader = () => {
    const options = { year: "numeric", month: "long" };
    return new Intl.DateTimeFormat("en-US", options).format(currentDate);
  };

  const popover = (
    <Popover id="popover-basic">
      <Popover.Header className="background-white" as="h3">
        Mood Colors
      </Popover.Header>
      <Popover.Body>
        <p className="d-flex align-items-center">
          <div className="info-dot calendar-day-yellow me-2"></div> Joyful
        </p>
        <p className="d-flex align-items-center">
          <div className="info-dot calendar-day-green me-2"></div> Motivated
        </p>
        <p className="d-flex align-items-center">
          <div className="info-dot calendar-day-blue me-2"></div> Calm
        </p>
        <p className="d-flex align-items-center">
          <div className="info-dot calendar-day-orange me-2"></div> Anxious
        </p>
        <p className="d-flex align-items-center">
          <div className="info-dot calendar-day-gray me-2"></div> Sad
        </p>
        <p className="d-flex align-items-center">
          <div className="info-dot calendar-day-red me-2"></div> Frustrated
        </p>
      </Popover.Body>
    </Popover>
  );

  return (
    <div className="custom-calendar">
      <div className="calendar-view-controls d-flex align-items-center">
        <button
          className={view === "month" ? "active" : ""}
          onClick={() => setView("month")}
        >
          Monthly
        </button>
        <button
          className={view === "week" ? "active" : ""}
          onClick={() => setView("week")}
        >
          Weekly
        </button>
      </div>

      <div className="calendar-header-month">
        <h2>{getMonthYearHeader()}</h2>
        <div className="calendar-controls">
          <OverlayTrigger trigger="click" placement="right" overlay={popover}>
            <Button variant="info" className="calendar-info-btn">
              ?
            </Button>
          </OverlayTrigger>
          <button onClick={handlePrev}>
            <i className="fas fa-angle-double-left"></i>
          </button>
          <button onClick={handleToday}>Today</button>
          <button onClick={handleNext}>
            <i className="fas fa-angle-double-right"></i>
          </button>
        </div>
      </div>

      <div className="calendar-content">{renderCalendar()}</div>
    </div>
  );
};

export default CalendarComponent;
