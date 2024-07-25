import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

const DoctorCard = ({ doctor, onEdit, onDelete }) => {
  return (
    <div className='col-12 col-sm-6 col-md-4 col-lg-3 mb-3'>
      <div className='card h-100'>
        <div className='card-body d-flex flex-column'>
          <h5 className='card-title'>Dr. {doctor.name}</h5>
          <h6 className='card-subtitle mb-2 text-muted'>{doctor.specialty}</h6>
          <div className='mt-auto d-flex justify-content-between'>
            <button className='btn btn-primary' onClick={() => onEdit(doctor)}>
              Edit
            </button>
            <button
              className='btn btn-danger'
              onClick={() => onDelete(doctor._id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
