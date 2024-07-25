import React, { useState, useEffect } from "react";
import axios from "axios";
import DoctorCard from "./DoctorCard.jsx";
import { Container, Form, Button, Row, Col } from "react-bootstrap";

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
    axios
      .put(`http://localhost:5000/doctors/update/${id}`, selectedDoctor)
      .then((response) => {
        setDoctors(
          doctors.map((doctor) =>
            doctor._id === id ? { ...selectedDoctor, _id: id } : doctor
          )
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
          <h4>{isEditMode ? "Edit Doctor" : "Add New Doctor"}</h4>
          <Form
            onSubmit={
              isEditMode
                ? (e) => handleUpdateDoctor(selectedDoctor._id, e)
                : handleAddDoctor
            }
          >
            <Form.Group className='mb-3'>
              <Form.Label>Name:</Form.Label>
              <Form.Control
                type='text'
                value={isEditMode ? selectedDoctor.name : newDoctor.name}
                onChange={(e) =>
                  isEditMode
                    ? setSelectedDoctor({
                        ...selectedDoctor,
                        name: e.target.value,
                      })
                    : setNewDoctor({ ...newDoctor, name: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Specialty:</Form.Label>
              <Form.Control
                as='select'
                value={
                  isEditMode ? selectedDoctor.specialty : newDoctor.specialty
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
              >
                <option value=''>Select Specialty</option>
                <option value='Cardiologist'>Cardiologist</option>
                <option value='Radiologist'>Radiologist</option>
                <option value='Neurologist'>Neurologist</option>
                <option value='Pediatrician'>Pediatrician</option>
                <option value='Orthopedic'>Orthopedic</option>
                <option value='Gastroenterologist'>Gastroenterologist</option>
                <option value='Dermatologist'>Dermatologist</option>
                <option value='Oncologist'>Oncologist</option>
                <option value='Endocrinologist'>Endocrinologist</option>
                <option value='Ophthalmologist'>Ophthalmologist</option>
                <option value='Psychiatrist'>Psychiatrist</option>
                <option value='Urologist'>Urologist</option>
                <option value='Pulmonologist'>Pulmonologist</option>
                <option value='Hematologist'>Hematologist</option>
                {/* Add more specialties as needed */}
              </Form.Control>
            </Form.Group>
            <Button type='submit' variant='primary'>
              {isEditMode ? "Update Doctor" : "Add Doctor"}
            </Button>
          </Form>
        </Col>
        <Col md={6}>
          <h4>Doctors List</h4>
          <div className='d-flex flex-column'>
            {doctors.map((doctor) => (
              <DoctorCard
                key={doctor._id}
                doctor={doctor}
                onEdit={handleEditDoctor}
                onDelete={handleDeleteDoctor}
              />
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Doctors;
