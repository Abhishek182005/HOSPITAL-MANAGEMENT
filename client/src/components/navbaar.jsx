import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const isLinkActive = (path) => location.pathname === path;

  return (
    <nav>
      <ul className='nav nav-pills justify-content-center mb-4'>
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
            className={`nav-link ${isLinkActive("/doctors") ? "active" : ""}`}
          >
            Doctors
          </Link>
        </li>
        <li className='nav-item'>
          <Link
            to='/patients'
            className={`nav-link ${isLinkActive("/patients") ? "active" : ""}`}
          >
            Patients
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
