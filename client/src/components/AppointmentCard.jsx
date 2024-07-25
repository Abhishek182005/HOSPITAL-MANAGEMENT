import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

const AppointmentCard = ({ appointment, onEdit, onDelete }) => {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <p className="card-text">
          <strong>Patient: </strong>
          {appointment.patientName}
        </p>
        <p className="card-text">
          <strong>Doctor: </strong>
          {appointment.doctorName}
        </p>
        <p className="card-text">
          <strong>Date: </strong>
          {new Date(appointment.date).toLocaleDateString()}
        </p>
        <div className="d-flex justify-content-between">
          <button className="btn btn-warning" onClick={() => onEdit(appointment)}>
            Edit
          </button>
          <button className="btn btn-danger" onClick={() => onDelete(appointment._id)}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;
