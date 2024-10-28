import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

const UpdateStudentModal = ({ show, handleClose, studentData, handleUpdate }) => {
  const [updatedStudent, setUpdatedStudent] = useState({ name: '', studentCode: '', isActive: false });

  useEffect(() => {
    if (studentData) {
      setUpdatedStudent({
        name: studentData.name,
        studentCode: studentData.studentCode,
        isActive: studentData.isActive,
      });
    }
  }, [studentData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUpdatedStudent(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = () => {
    handleUpdate({ id: studentData.id, ...updatedStudent });
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update Student</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="studentName">
            <Form.Label>Student Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={updatedStudent.name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="studentCode">
            <Form.Label>Student Code</Form.Label>
            <Form.Control
              type="text"
              name="studentCode"
              value={updatedStudent.studentCode}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="activeStatus">
            <Form.Check
              type="checkbox"
              label="Still Active"
              name="isActive"
              checked={updatedStudent.isActive}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateStudentModal;
