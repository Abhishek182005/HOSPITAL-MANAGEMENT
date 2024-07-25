import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Appointments from "./components/Appointments.jsx";
import Doctors from "./components/Doctors.jsx";
import Patients from "./components/Patients.jsx";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "./App.css";
import Navbar from "./components/navbaar.jsx";

const App = () => {
  return (
    <Router>
      <div className='container mt-4'>
        <h1 className='text-center mb-4' style={{ color: "green" }}>
          Hospital Management App
        </h1>
        <Navbar/>
        <div className='content'>
          <Routes>
            <Route path='/appointments' element={<Appointments />} />
            <Route path='/' element={<Appointments />} />
            <Route path='/doctors' element={<Doctors />} />
            <Route path='/patients' element={<Patients />} />

          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
