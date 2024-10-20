import React from "react";
import {
  Offcanvas,
  OffcanvasHeader,
  OffcanvasBody,
  Button,
} from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import "./off-canvas-dashboard-menu.css";
import { ROUTES, useGlobalContext } from "../../../shared";

const OffCanvasDashboardMenu = ({ show, handleClose }) => {
  const { currentUserDetails, isAppAdmin } = useGlobalContext();
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location

  const handleNavigation = (path) => {
    handleClose();
    navigate(path);
  };

  const isActive = (path) => {
    return location.pathname === path ? "dashbaord-menu-item-active" : "";
  };

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
              <Button
                className={`dashbaord-menu-item ${isActive(
                  `${ROUTES.WEB}${ROUTES.DASHBOARD}`
                )}`}
                onClick={() =>
                  handleNavigation(`${ROUTES.WEB}${ROUTES.DASHBOARD}`)
                }
              >
                Dashboard
              </Button>
            </li>
            {isAppAdmin && (
              <>
                <li>
                  <Button
                    className={`dashbaord-menu-item ${isActive(
                      `${ROUTES.WEB}${ROUTES.CHATS}`
                    )}`}
                    onClick={() =>
                      handleNavigation(`${ROUTES.WEB}${ROUTES.CHATS}`)
                    }
                  >
                    Chats
                  </Button>
                </li>
                <li>
                  <Button
                    className={`dashbaord-menu-item ${isActive(
                      `${ROUTES.WEB}${ROUTES.STUDENTS}`
                    )}`}
                    onClick={() =>
                      handleNavigation(`${ROUTES.WEB}${ROUTES.STUDENTS}`)
                    }
                  >
                    Students
                  </Button>
                </li>
              </>
            )}
            <li>
              <Button
                className={`dashbaord-menu-item ${isActive(
                  `${ROUTES.WEB}${ROUTES.CALENDAR}`
                )}`}
                onClick={() =>
                  handleNavigation(`${ROUTES.WEB}${ROUTES.CALENDAR}`)
                }
              >
                Calendar
              </Button>
            </li>

            <li>
              <Button
                className={`dashbaord-menu-item ${isActive(
                  `${ROUTES.WEB}${ROUTES.APPOINTMENTS}`
                )}`}
                onClick={() =>
                  handleNavigation(`${ROUTES.WEB}${ROUTES.APPOINTMENTS}`)
                }
              >
                Appointment
              </Button>
            </li>
            {isAppAdmin && (
              <>
                <li>
                  <Button
                    className={`dashbaord-menu-item ${isActive(
                      `${ROUTES.WEB}${ROUTES.ACCOUNT_REQUEST}`
                    )}`}
                    onClick={() =>
                      handleNavigation(`${ROUTES.WEB}${ROUTES.ACCOUNT_REQUEST}`)
                    }
                  >
                    Account Request
                  </Button>
                </li>
              </>
            )}
          </ul>
        </OffcanvasBody>
      </Offcanvas>
    </>
  );
};

export default OffCanvasDashboardMenu;
