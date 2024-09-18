// components/navbar/Navbar.js
import React from "react";
import "./navbar.component.css";
import { Avatar } from "@mui/material";

const Navbar = ({ title, toggleOffCanvas }) => {
  return (
    <nav className="navbar gradient-background shadow-black">
      <div className="navbar-left">
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleOffCanvas}
        >
          <i className="bi bi-list"></i>
        </button>
      </div>
      <div className="navbar-center">
        <h1 className="navbar-title text-capitalize">
          {title || "Page Title"}
        </h1>
      </div>
      <div className="navbar-right">
        <div className="btn-group">
          <button
            type="button"
            className="btn profile-btn"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <Avatar alt="John Doe" sx={{ width: 35, height: 35 }} />
          </button>

          <ul className="dropdown-menu dropdown-menu-end">
            <li>
              <a className="dropdown-item" href="#">
                Profile
              </a>
            </li>
            <li>
              <div className="dropdown-divider"></div>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
