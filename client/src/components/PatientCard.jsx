// src/components/PatientCard.js
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

const PatientCard = ({ patient, onEdit, onDelete }) => {
  return (
    <div className='card mb-3'>
      <div className='card-body'>
        <h5 className='card-title'>{patient.name}</h5>
        <p className='card-text'>Age: {patient.age}</p>
        <p className='card-text'>Gender: {patient.gender}</p>
        <div className='d-flex justify-content-between'>
          <button
            className='btn btn-primary me-2'
            onClick={() => onEdit(patient)}
          >
            Edit
          </button>
          <button
            className='btn btn-danger'
            onClick={() => onDelete(patient._id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientCard;
