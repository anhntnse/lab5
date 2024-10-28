import React from 'react';
import { Table, Button, Badge, Form } from 'react-bootstrap';
import {Link} from  'react-router-dom';

const StudentTable = ({ students, handleSelect, handleDelete, handleEdit }) => {
  return (
    <Table bordered hover style={{ borderRadius: '10px' }}>
      <thead>
        <tr>
          <th>Select</th>
          <th>Student Name</th>
          <th>Student Code</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {students.map(student => (
          <tr key={student.id}>
            <td>
              <Form.Check
                type="checkbox"
                checked={student.selected || false}
                onChange={() => handleSelect(student.id)}
              />
            </td>
            <td>
              {/* Make student name clickable */}
              <Link to={`/student/${student.id}`} style={{ textDecoration: 'underline', color: 'blue' }}>
                {student.name}
              </Link>
            </td>
            <td>{student.studentCode}</td>
            <td>
              <Badge bg={student.isActive ? 'success' : 'danger'}>
                {student.isActive ? 'Active' : 'In-active'}
              </Badge>
            </td>
            <td>
              <Button variant="outline-warning" onClick={() => handleEdit(student)}>
                Update
              </Button>
              <Button variant="outline-danger" onClick={() => handleDelete(student.id)}>
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default StudentTable;
