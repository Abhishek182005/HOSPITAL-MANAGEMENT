// AppointmentHistoryModal.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";

const AppointmentHistoryModal = ({ show, onClose, appointmentId }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (appointmentId) {
      axios
        .get(`http://localhost:5000/appointments/${appointmentId}/history`)
        .then((response) => setHistory(response.data))
        .catch((error) => console.error("Error fetching history:", error));
    }
  }, [appointmentId]);

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Appointment History</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {history.length > 0 ? (
          <ul className='list-group'>
            {history.map((record, index) => (
              <li key={index} className='list-group-item'>
                {new Date(record.date).toLocaleString()}: {record.action}
              </li>
            ))}
          </ul>
        ) : (
          <p>No history available for this appointment.</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AppointmentHistoryModal;
