// src/components/StudentManagement.js
import React, { useState } from 'react';
import StudentForm from './StudentForm';
import StudentTable from './StudentTable';

const StudentManagement = () => {
  const [students, setStudents] = useState([
    { id: 1, name: 'Nguyen Van A', code: 'CODE12345', active: true },
    { id: 2, name: 'Tran Van B', code: 'CODE67890', active: false },
  ]);
  const [selectedCount, setSelectedCount] = useState(0);
  const [newStudent, setNewStudent] = useState({ name: '', code: '', active: false });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewStudent(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Add new student to the top of the list
  const handleAddStudent = () => {
    if (newStudent.name && newStudent.code) {
      setStudents(prevStudents => [
        { id: prevStudents.length + 1, ...newStudent }, // New student at the top
        ...prevStudents,
      ]);
      setNewStudent({ name: '', code: '', active: false });
    }
  };

  // Clear form inputs and remove all students
  const handleClear = () => {
    setNewStudent({ name: '', code: '', active: false });
    setStudents([]);
    setSelectedCount(0); // Reset total selected students
  };

  // Handle checkbox select and update total selected count
  const handleSelect = (id) => {
    const updatedStudents = students.map(student =>
      student.id === id ? { ...student, selected: !student.selected } : student
    );
    setStudents(updatedStudents);
    const selectedCount = updatedStudents.filter(student => student.selected).length;
    setSelectedCount(selectedCount);
  };

  // Handle delete student
  const handleDelete = (id) => {
    const updatedStudents = students.filter(student => student.id !== id);
    setStudents(updatedStudents);
    const selectedCount = updatedStudents.filter(student => student.selected).length;
    setSelectedCount(selectedCount);
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '900px' }}>
      <h3 className="text-center mb-4" style={{ fontWeight: '500' }}>Student Management</h3>

      <h4 className="mb-4 text-left" style={{ fontWeight: '500', fontSize: '1.5rem', color: 'blue' }}>
        Total Selected Student: {selectedCount}
      </h4>

      {/* Form to Add Student */}
      <div className="card p-4 mb-4" style={{ borderRadius: '10px', border: '1px solid #eee' }}>
        <StudentForm
          newStudent={newStudent}
          handleChange={handleChange}
          handleAddStudent={handleAddStudent}
          handleClear={handleClear}
        />
      </div>

      {/* Student List Table */}
      <div className="card p-4 mb-4" style={{ borderRadius: '10px', border: '1px solid #eee' }}>
        <h4 className="text-center mb-3" style={{ fontWeight: '500' }}>Student List</h4>
        <StudentTable 
          students={students} 
          handleSelect={handleSelect} 
          handleDelete={handleDelete} 
        />
      </div>
    </div>
  );
    
};

export default StudentManagement;
