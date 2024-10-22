import React from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { FaEraser, FaPlusCircle } from "react-icons/fa";

const StudentForm = ({
  newStudent,
  handleChange,
  handleAddStudent,
  handleClear,
}) => {
  return (
    <Form className="mb-4">
      <Row>
        <Form.Group controlId="studentName" className="mb-3">
          <Form.Label style={{ fontWeight: "500"}}>Student Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter student name"
            name="name"
            value={newStudent.name}
            onChange={handleChange}
            style={{ borderRadius: "5px", borderColor: "#ccc"}}
          />
        </Form.Group>
      </Row>
      <Row>
        <Form.Group controlId="studentCode" className="mb-3">
          <Form.Label style={{ fontWeight: "500"}}>Student Code</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter student code"
            name="code"
            value={newStudent.code}
            onChange={handleChange}
            style={{ borderRadius: "5px", borderColor: "#ccc" }}
          />
        </Form.Group>
      </Row>
      <Form.Group controlId="activeStatus" className="mb-4">
        <Form.Check
          type="checkbox"
          label="Still Active"
          name="active"
          checked={newStudent.active}
          onChange={handleChange}
        />
      </Form.Group>

      <Row className="d-flex justify-content-between">
        <Col className="text-center">
          <Button
            variant="primary"
            size="lg"
            onClick={handleAddStudent}
            className="w-100"
            style={{
              borderRadius: "5px",
              backgroundColor: "#007bff",
              border: "none",
            }}
          >
            Add Student
          </Button>
        </Col>
        <Col className="text-center">
          <Button
            variant="outline-danger"
            size="lg"
            onClick={handleClear}
            className="w-100"
            style={{ borderRadius: "5px" }}
          >
            Clear All
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default StudentForm;
