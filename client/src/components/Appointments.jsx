// src/components/Appointments.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]); // State for patients
  const [newAppointment, setNewAppointment] = useState({
    patientId: "", // Change to patientId
    doctorId: "",
    date: "",
  });
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    // Fetch appointments
    axios
      .get("http://localhost:5000/appointments")
      .then((response) => setAppointments(response.data))
      .catch((error) => console.error("Error fetching appointments:", error));

    // Fetch doctors
    axios
      .get("http://localhost:5000/doctors")
      .then((response) => setDoctors(response.data))
      .catch((error) => console.error("Error fetching doctors:", error));

    // Fetch patients
    axios
      .get("http://localhost:5000/patients") // Assume this endpoint exists
      .then((response) => setPatients(response.data))
      .catch((error) => console.error("Error fetching patients:", error));
  }, []);

  const handleAddAppointment = (e) => {
    e.preventDefault();
    if (
      !newAppointment.patientId ||
      !newAppointment.doctorId ||
      !newAppointment.date
    ) {
      console.error("All fields are required.");
      return;
    }
    const appointmentData = {
      patientId: newAppointment.patientId,
      doctorId: newAppointment.doctorId,
      date: newAppointment.date,
      patientName: patients.find(
        (patient) => patient._id === newAppointment.patientId
      )?.name, // Get the patient's name based on the patientId
      doctorName: doctors.find(
        (doctor) => doctor._id === newAppointment.doctorId
      )?.name, // Get the doctor's name based on the doctorId
    };
    axios
      .post("http://localhost:5000/appointments/add", appointmentData)
      .then((response) => {
        console.log(response.data);
        setAppointments([...appointments, response.data]);
        setNewAppointment({
          patientId: "",
          doctorId: "",
          date: "",
        });
      })
      .catch((error) => console.error("Error adding appointment:", error));
  };

  const handleUpdateAppointment = (id, e) => {
    e.preventDefault();
    if (
      !selectedAppointment.patientId ||
      !selectedAppointment.doctorId ||
      !selectedAppointment.date
    ) {
      console.error("All fields are required.");
      return;
    }
    const appointmentData = {
      patientId: selectedAppointment.patientId,
      doctorId: selectedAppointment.doctorId,
      date: selectedAppointment.date,
      patientName: patients.find(
        (patient) => patient._id === selectedAppointment.patientId
      )?.name, // Get the patient's name based on the patientId
      doctorName: doctors.find(
        (doctor) => doctor._id === selectedAppointment.doctorId
      )?.name, // Get the doctor's name based on the doctorId
    };
    axios
      .post(`http://localhost:5000/appointments/update/${id}`, appointmentData)
      .then((response) => {
        console.log(response.data);
        const updatedApp = {
          ...selectedAppointment,
          _id: id,
        };
        setAppointments(
          appointments.map((appointment) =>
            appointment._id === id ? updatedApp : appointment
          )
        );
        setSelectedAppointment(null);
        setIsEditMode(false);
      })
      .catch((error) => console.error("Error updating appointment:", error));
  };

  const handleDeleteAppointment = (id) => {
    axios
      .delete(`http://localhost:5000/appointments/delete/${id}`)
      .then((response) => {
        console.log(response.data);
        setAppointments(
          appointments.filter((appointment) => appointment._id !== id)
        );
      })
      .catch((error) => console.error("Error deleting appointment:", error));
  };

  const handleEditAppointment = (appointment) => {
    setSelectedAppointment(appointment);
    setIsEditMode(true);
  };

  const handleViewHistory = (type, name) => {
    const url =
      type === "patient"
        ? `http://localhost:5000/appointments/history/patient/${name}`
        : `http://localhost:5000/appointments/history/doctor/${name}`;
    axios
      .get(url)
      .then((response) => setHistory(response.data))
      .catch((error) => console.error("Error fetching history:", error));
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-body">
              <h4 className="card-title text-center">
                {isEditMode ? "Edit Appointment" : "Add New Appointment"}
              </h4>
              <form
                onSubmit={
                  isEditMode
                    ? (e) => handleUpdateAppointment(selectedAppointment._id, e)
                    : handleAddAppointment
                }
              >
                <div className="mb-3">
                  <label className="form-label">Patient Name:</label>
                  <select
                    className="form-select"
                    value={
                      isEditMode
                        ? selectedAppointment.patientId
                        : newAppointment.patientId
                    }
                    onChange={(e) =>
                      isEditMode
                        ? setSelectedAppointment({
                            ...selectedAppointment,
                            patientId: e.target.value,
                          })
                        : setNewAppointment({
                            ...newAppointment,
                            patientId: e.target.value,
                          })
                    }
                  >
                    <option value="">Select Patient</option>
                    {patients.map((patient) => (
                      <option key={patient._id} value={patient._id}>
                        {patient.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Doctor:</label>
                  <select
                    className="form-select"
                    value={
                      isEditMode
                        ? selectedAppointment.doctorId
                        : newAppointment.doctorId
                    }
                    onChange={(e) =>
                      isEditMode
                        ? setSelectedAppointment({
                            ...selectedAppointment,
                            doctorId: e.target.value,
                          })
                        : setNewAppointment({
                            ...newAppointment,
                            doctorId: e.target.value,
                          })
                    }
                  >
                    <option value="">Select Doctor</option>
                    {doctors.map((doctor) => (
                      <option key={doctor._id} value={doctor._id}>
                        {doctor.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Date:</label>
                  <input
                    type="date"
                    className="form-control"
                    value={
                      isEditMode
                        ? new Date(selectedAppointment.date)
                            .toISOString()
                            .split("T")[0]
                        : newAppointment.date
                    }
                    onChange={(e) =>
                      isEditMode
                        ? setSelectedAppointment({
                            ...selectedAppointment,
                            date: e.target.value,
                          })
                        : setNewAppointment({
                            ...newAppointment,
                            date: e.target.value,
                          })
                    }
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  {isEditMode ? "Update Appointment" : "Add Appointment"}
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <h4 className="text-center mb-4">Appointments List</h4>
          <ul className="list-group">
            {appointments.map((appointment) => (
              <li key={appointment._id} className="list-group-item">
                <div>
                  <strong>Patient:</strong> {appointment.patientName}
                </div>
                <div>
                  <strong>Doctor:</strong> {appointment.doctorName}
                </div>
                <div>
                  <strong>Date:</strong>{" "}
                  {new Date(appointment.date).toLocaleDateString()}
                </div>
                <button
                  className="btn btn-warning me-2"
                  onClick={() => handleEditAppointment(appointment)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteAppointment(appointment._id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
};

export default Appointments;
