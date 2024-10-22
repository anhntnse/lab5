import React from 'react';
import { Table, Button, Badge, Form } from 'react-bootstrap';

const StudentTable = ({ students, handleSelect, handleDelete }) => {
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
            <td>{student.name}</td>
            <td>{student.code}</td>
            <td>
              <Badge bg={student.active ? 'success' : 'danger'}>
                {student.active ? 'Active' : 'In-active'}
              </Badge>
            </td>
            <td>
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
