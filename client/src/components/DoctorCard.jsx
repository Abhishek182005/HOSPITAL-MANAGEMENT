import React from "react";

const DoctorCard = ({ doctor, onEdit, onDelete }) => {
  return (
    <div className='card'>
      <div className='card-body'>
        <h5 className='card-title'>{doctor.name}</h5>
        <h6 className='card-subtitle mb-2 text-muted'>{doctor.specialty}</h6>
        <button className='btn btn-primary' onClick={() => onEdit(doctor)}>
          Edit
        </button>
        <button className='btn btn-danger' onClick={() => onDelete(doctor._id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default DoctorCard;
