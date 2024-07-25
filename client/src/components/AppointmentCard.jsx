import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

const AppointmentCard = ({ appointment, onEdit, onDelete }) => {
  return (
    <div className='col-12 col-sm-6 col-md-4 col-lg-3 mb-3'>
      <div className='card h-100'>
        <div className='card-body d-flex flex-column'>
          <p className='card-text'>
            <strong>Patient: </strong>
            {appointment.patientName}
          </p>
          <p className='card-text'>
            <strong>Doctor: </strong>
            {appointment.doctorName}
          </p>
          <p className='card-text'>
            <strong>Date: </strong>
            {new Date(appointment.date).toLocaleDateString()}
          </p>
          <p className='card-text'>
            <strong>Status: </strong>
            {appointment.status}
          </p>
          {appointment.status === "Postponed" && (
            <p className='card-text'>
              <strong>New Date: </strong>
              {appointment.newDate
                ? new Date(appointment.newDate).toLocaleDateString()
                : "N/A"}
            </p>
          )}
          <div className='mt-auto d-flex justify-content-between'>
            <button
              className='btn btn-warning'
              onClick={() => onEdit(appointment)}
            >
              Edit
            </button>
            <button
              className='btn btn-danger'
              onClick={() => onDelete(appointment._id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;
