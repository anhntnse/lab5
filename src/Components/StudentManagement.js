// src/components/StudentManagement.js
import React, { useState, useEffect} from 'react';
import StudentForm from './StudentForm';
import StudentTable from './StudentTable';
import UpdateStudentModal from './UpdateStudentModal'; // Import the modal

const StudentManagement = () => {
  const [students, setStudents] = useState([]);
  const [selectedCount, setSelectedCount] = useState(0);
  const [newStudent, setNewStudent] = useState({ name: '', studentCode: '', isActive: false });
  const [showModal, setShowModal] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch("https://student-api-nestjs.onrender.com/students");
        const data = await response.json();
        console.log(data.data);
        const transformedData = data.data.map((std) => ({
          id: std._id,
          name: std.name,
          studentCode: std.studentCode,
          isActive: std.isActive,
        }));
        setStudents(transformedData || []);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };
    fetchStudents();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewStudent(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };


  // Add new student to the top of the list
  const handleAddStudent = async() => {
    if (newStudent.name && newStudent.code) {
      try {
        const response = await fetch("https://student-api-nestjs.onrender.com/students", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newStudent),
      });
      if (response.ok) {        
      setStudents(prevStudents => [
        { id: prevStudents.length + 1, ...newStudent }, // New student at the top
        ...prevStudents,
      ]);
      setNewStudent({ name: '', studentCode: '', isActive: false });
    }
    else {
      console.error("Error adding student:", response.statusText);
    }
  } catch (error) {
    console.error("Error adding student:", error);
  }
}
};

  // Clear form inputs and remove all students
  const handleClear = () => {
    setNewStudent({ name: '', studentCode: '', isActive: false });
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
  const handleDelete = async(id) => {

    try {
      const response = await fetch(`https://student-api-nestjs.onrender.com/students/${id}`, {
        method: 'DELETE',
        });
        if (response.ok) {
          const updatedStudents = students.filter(student => student.id !== id);
          setStudents(updatedStudents);
          const selectedCount = updatedStudents.filter(student => student.selected).length;
          setSelectedCount(selectedCount);

        } else {
          console.error("Error delete student: ",  response.statusText);
        }
      } catch(error) {
        console.error("Error delete student: ", error);
      }

  };

  const handleEdit = async(student) => {
    setCurrentStudent(student);
    setShowModal(true);
  }

  const handleUpdate = async (updatedStudent) => {
    try {
      const response = await fetch(`https://student-api-nestjs.onrender.com/students/${updatedStudent.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: updatedStudent.name,
          isActive: updatedStudent.isActive,
        }),
      });
      if (response.ok) {
        const updatedStudents = students.map(student =>
          student.id === updatedStudent.id ? { ...student, ...updatedStudent } : student
        );
        setStudents(updatedStudents);
      } else {
        console.error("Error updating student:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating student:", error);
    }
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
          handleEdit={handleEdit}

        />
        <UpdateStudentModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        studentData={currentStudent}
        handleUpdate={handleUpdate}
      />
      </div>
    </div>
  );
    
};

export default StudentManagement;
