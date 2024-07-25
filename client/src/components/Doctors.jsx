// src/components/Doctors.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Form,
  Button,
  Row,
  Col,
  Table,
  Card,
} from "react-bootstrap";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [newDoctor, setNewDoctor] = useState({ name: "", specialty: "" });
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = () => {
    axios
      .get("http://localhost:5000/doctors")
      .then((response) => setDoctors(response.data))
      .catch((error) => console.error("Error fetching doctors:", error));
  };

  const handleAddDoctor = (e) => {
    e.preventDefault();
    if (!newDoctor.name || !newDoctor.specialty) {
      console.error("All fields are required.");
      return;
    }
    axios
      .post("http://localhost:5000/doctors/add", newDoctor)
      .then((response) => {
        setDoctors([...doctors, response.data]);
        setNewDoctor({ name: "", specialty: "" });
      })
      .catch((error) => console.error("Error adding doctor:", error));
  };

  const handleUpdateDoctor = (id, e) => {
    e.preventDefault();
    if (!selectedDoctor.name || !selectedDoctor.specialty) {
      console.error("All fields are required.");
      return;
    }
    axios
      .post(`http://localhost:5000/doctors/update/${id}`, selectedDoctor)
      .then((response) => {
        const updatedDoc = { ...selectedDoctor, _id: id };
        setDoctors(
          doctors.map((doctor) => (doctor._id === id ? updatedDoc : doctor))
        );
        setSelectedDoctor(null);
        setIsEditMode(false);
      })
      .catch((error) => console.error("Error updating doctor:", error));
  };

  const handleDeleteDoctor = (id) => {
    axios
      .delete(`http://localhost:5000/doctors/delete/${id}`)
      .then((response) => {
        setDoctors(doctors.filter((doctor) => doctor._id !== id));
      })
      .catch((error) => console.error("Error deleting doctor:", error));
  };

  const handleEditDoctor = (doctor) => {
    setSelectedDoctor(doctor);
    setIsEditMode(true);
  };

  return (
    <Container>
      <Row className='mt-4'>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title className='text-center'>
                {isEditMode ? "Edit Doctor" : "Add New Doctor"}
              </Card.Title>
              <Form
                onSubmit={
                  isEditMode
                    ? (e) => handleUpdateDoctor(selectedDoctor._id, e)
                    : handleAddDoctor
                }
              >
                <Form.Group controlId='formDoctorName' className='mb-3'>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter doctor name'
                    value={isEditMode ? selectedDoctor.name : newDoctor.name}
                    onChange={(e) =>
                      isEditMode
                        ? setSelectedDoctor({
                            ...selectedDoctor,
                            name: e.target.value,
                          })
                        : setNewDoctor({
                            ...newDoctor,
                            name: e.target.value,
                          })
                    }
                  />
                </Form.Group>
                <Form.Group controlId='formSpecialty' className='mb-3'>
                  <Form.Label>Specialty</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter specialty'
                    value={
                      isEditMode
                        ? selectedDoctor.specialty
                        : newDoctor.specialty
                    }
                    onChange={(e) =>
                      isEditMode
                        ? setSelectedDoctor({
                            ...selectedDoctor,
                            specialty: e.target.value,
                          })
                        : setNewDoctor({
                            ...newDoctor,
                            specialty: e.target.value,
                          })
                    }
                  />
                </Form.Group>
                <Button variant='primary' type='submit' className='w-100 mt-3'>
                  {isEditMode ? "Update Doctor" : "Add Doctor"}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <h4 className='text-center mb-4'>Doctors List</h4>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Specialty</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((doctor) => (
                <tr key={doctor._id}>
                  <td>{doctor.name}</td>
                  <td>{doctor.specialty}</td>
                  <td>
                    <div className='d-flex justify-content-between'>
                      <Button
                        variant='warning'
                        className='me-2'
                        onClick={() => handleEditDoctor(doctor)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant='danger'
                        onClick={() => handleDeleteDoctor(doctor._id)}
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

export default Doctors;
