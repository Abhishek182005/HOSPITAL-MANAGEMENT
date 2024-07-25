// src/components/Navbar.js
import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const isLinkActive = (path) => location.pathname === path;

  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light'>
      <div className='container'>
        <Link className='navbar-brand' to='/'>
          Hospital Management System
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='navbar-nav ms-auto'>
            <li className='nav-item'>
              <Link
                to='/appointments'
                className={`nav-link ${
                  isLinkActive("/appointments") ? "active" : ""
                }`}
              >
                Appointments
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/doctors'
                className={`nav-link ${
                  isLinkActive("/doctors") ? "active" : ""
                }`}
              >
                Doctors
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/patients'
                className={`nav-link ${
                  isLinkActive("/patients") ? "active" : ""
                }`}
              >
                Patients
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/history'
                className={`nav-link ${
                  isLinkActive("/history") ? "active" : ""
                }`}
              >
                Appointment History
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
