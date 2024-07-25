// src/components/Appointments.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import {
  Container,
  Form,
  Button,
  Row,
  Col,
  Card,
  Table,
} from "react-bootstrap";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [newAppointment, setNewAppointment] = useState({
    patientId: "",
    doctorId: "",
    date: "",
  });
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

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
      .get("http://localhost:5000/patients")
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
      )?.name,
      doctorName: doctors.find(
        (doctor) => doctor._id === newAppointment.doctorId
      )?.name,
    };
    axios
      .post("http://localhost:5000/appointments/add", appointmentData)
      .then((response) => {
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
      )?.name,
      doctorName: doctors.find(
        (doctor) => doctor._id === selectedAppointment.doctorId
      )?.name,
    };
    axios
      .post(`http://localhost:5000/appointments/update/${id}`, appointmentData)
      .then((response) => {
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

  return (
    <Container>
      <Row className='mt-4'>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title className='text-center'>
                {isEditMode ? "Edit Appointment" : "Add New Appointment"}
              </Card.Title>
              <Form
                onSubmit={
                  isEditMode
                    ? (e) => handleUpdateAppointment(selectedAppointment._id, e)
                    : handleAddAppointment
                }
              >
                <Form.Group className='mb-3'>
                  <Form.Label>Patient:</Form.Label>
                  <Form.Select
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
                    <option value=''>Select Patient</option>
                    {patients.map((patient) => (
                      <option key={patient._id} value={patient._id}>
                        {patient.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group className='mb-3'>
                  <Form.Label>Doctor:</Form.Label>
                  <Form.Select
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
                    <option value=''>Select Doctor</option>
                    {doctors.map((doctor) => (
                      <option key={doctor._id} value={doctor._id}>
                        {doctor.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group className='mb-3'>
                  <Form.Label>Date:</Form.Label>
                  <Form.Control
                    type='date'
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
                </Form.Group>
                <Button type='submit' variant='primary'>
                  {isEditMode ? "Update Appointment" : "Add Appointment"}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <h3>
            <center>Appointments List</center>
          </h3>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Patient</th>
                <th>Doctor</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment._id}>
                  <td>{appointment.patientName}</td>
                  <td>{appointment.doctorName}</td>
                  <td>{new Date(appointment.date).toLocaleDateString()}</td>
                  <td>
                    <div className='d-flex justify-content-start'>
                      <Button
                        variant='primary'
                        onClick={() => handleEditAppointment(appointment)}
                        className='me-2'
                      >
                        Edit
                      </Button>
                      <Button
                        variant='danger'
                        onClick={() => handleDeleteAppointment(appointment._id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default Appointments;
