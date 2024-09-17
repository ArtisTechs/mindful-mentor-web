import React from "react";
import {
  Offcanvas,
  OffcanvasHeader,
  OffcanvasBody,
  Button,
} from "react-bootstrap";
import "./off-canvas-dashboard-menu.css";

const OffCanvasDashboardMenu = ({ show, handleClose }) => {
  return (
    <>
      <Offcanvas
        className="dashboard-menu"
        show={show}
        onHide={handleClose}
        placement="start"
      >
        <OffcanvasHeader>
          <button className="arrow-close-btn" onClick={handleClose}>
            <i className="bi bi-arrow-left"></i>
          </button>
        </OffcanvasHeader>
        <OffcanvasBody className="d-flex justify-content-center">
          <ul className="list-unstyled">
            <li>
              <Button className="dashbaord-menu-item" onClick={handleClose}>
                Dashboard
              </Button>
            </li>
            <li>
              <Button className="dashbaord-menu-item" onClick={handleClose}>
                Calendar
              </Button>
            </li>
            <li>
              <Button className="dashbaord-menu-item" onClick={handleClose}>
                Counselors
              </Button>
            </li>
            <li>
              <Button className="dashbaord-menu-item" onClick={handleClose}>
                Appointment
              </Button>
            </li>
          </ul>
        </OffcanvasBody>
      </Offcanvas>
    </>
  );
};

export default OffCanvasDashboardMenu;
