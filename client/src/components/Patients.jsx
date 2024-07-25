// src/components/Patients.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Form,
  Button,
  Row,
  Col,
  Card,
  Table,
} from "react-bootstrap";

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [newPatient, setNewPatient] = useState({
    name: "",
    age: "",
    gender: "",
  });
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/patients")
      .then((response) => setPatients(response.data))
      .catch((error) => console.error("Error fetching patients:", error));
  }, []);

  const handleAddPatient = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/patients/add", newPatient)
      .then((response) => {
        setPatients([...patients, response.data]);
        setNewPatient({ name: "", age: "", gender: "" });
      })
      .catch((error) => console.error("Error adding patient:", error));
  };

  const handleUpdatePatient = (id, e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:5000/patients/update/${id}`, selectedPatient)
      .then((response) => {
        const updatedPatient = { ...selectedPatient, _id: id };
        setPatients(
          patients.map((patient) =>
            patient._id === id ? updatedPatient : patient
          )
        );
        setSelectedPatient(null);
        setIsEditMode(false);
      })
      .catch((error) => console.error("Error updating patient:", error));
  };

  const handleDeletePatient = (id) => {
    axios
      .delete(`http://localhost:5000/patients/delete/${id}`)
      .then((response) => {
        setPatients(patients.filter((patient) => patient._id !== id));
      })
      .catch((error) => console.error("Error deleting patient:", error));
  };

  const handleEditPatient = (patient) => {
    setSelectedPatient(patient);
    setIsEditMode(true);
  };

  return (
    <Container>
      <Row className='mt-4'>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>
                {isEditMode ? "Edit Patient" : "Add New Patient"}
              </Card.Title>
              <Form
                onSubmit={
                  isEditMode
                    ? (e) => handleUpdatePatient(selectedPatient._id, e)
                    : handleAddPatient
                }
              >
                <Form.Group className='mb-3'>
                  <Form.Label>Name:</Form.Label>
                  <Form.Control
                    type='text'
                    value={isEditMode ? selectedPatient.name : newPatient.name}
                    onChange={(e) =>
                      isEditMode
                        ? setSelectedPatient({
                            ...selectedPatient,
                            name: e.target.value,
                          })
                        : setNewPatient({ ...newPatient, name: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group className='mb-3'>
                  <Form.Label>Age:</Form.Label>
                  <Form.Control
                    type='text'
                    value={isEditMode ? selectedPatient.age : newPatient.age}
                    onChange={(e) =>
                      isEditMode
                        ? setSelectedPatient({
                            ...selectedPatient,
                            age: e.target.value,
                          })
                        : setNewPatient({ ...newPatient, age: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group className='mb-3'>
                  <Form.Label>Gender:</Form.Label>
                  <Form.Select
                    value={
                      isEditMode ? selectedPatient.gender : newPatient.gender
                    }
                    onChange={(e) =>
                      isEditMode
                        ? setSelectedPatient({
                            ...selectedPatient,
                            gender: e.target.value,
                          })
                        : setNewPatient({
                            ...newPatient,
                            gender: e.target.value,
                          })
                    }
                  >
                    <option value=''>Select Gender</option>
                    <option value='Male'>Male</option>
                    <option value='Female'>Female</option>
                    <option value='Other'>Other</option>
                  </Form.Select>
                </Form.Group>
                <Button type='submit' variant='primary'>
                  {isEditMode ? "Update Patient" : "Add Patient"}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <h3>
            <center>Patients List</center>
          </h3>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient) => (
                <tr key={patient._id}>
                  <td>{patient.name}</td>
                  <td>{patient.age}</td>
                  <td>{patient.gender}</td>
                  <td>
                    <div className='d-flex justify-content-start'>
                      <Button
                        variant='primary'
                        onClick={() => handleEditPatient(patient)}
                        className='me-2'
                      >
                        Edit
                      </Button>
                      <Button
                        variant='danger'
                        onClick={() => handleDeletePatient(patient._id)}
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

export default Patients;
