import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

const UpdateStudentModal = ({ show, handleClose, studentData, handleUpdate }) => {
  const [updatedStudent, setUpdatedStudent] = useState(studentData || { name: '', isActive: false });

  useEffect(() => {
    // Update the local state when the student prop changes
    if (studentData) {
      setUpdatedStudent(studentData);
    }
  }, [studentData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUpdatedStudent(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleUpdate(updatedStudent); // Handle the update logic
    handleClose(); // Close the modal after update
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Student</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {studentData ? ( // Check if student is not null
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="studentName">
              <Form.Label>Student Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={updatedStudent.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="activeStatus">
              <Form.Check
                type="checkbox"
                name="isActive"
                label="Still Active"
                checked={updatedStudent.isActive}
                onChange={handleChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">Update</Button>
          </Form>
        ) : (
          <p>Select a student to edit</p> // Show a message if no student is selected
        )}
      </Modal.Body>
    </Modal>
  );
};

export default UpdateStudentModal;
