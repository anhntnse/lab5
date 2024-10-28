// src/components/StudentDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const StudentDetail = () => {
    const { id } = useParams();
    const [student, setStudent] = useState(null);

    useEffect(() => {
        const fetchStudentDetail = async () => {
            try {
                const response = await fetch(`https://student-api-nestjs.onrender.com/students/${id}`);
                const data = await response.json();
                setStudent(data.data); // Assuming data structure matches
            } catch (error) {
                console.error("Error fetching student detail:", error);
            }
        };

        fetchStudentDetail();
    }, [id]);

    if (!student) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>{student.name}</h2>
            <p>Student Code: {student.studentCode}</p>
            <p>Status: {student.isActive ? 'Active' : 'Inactive'}</p>
            {/* Add more fields as necessary */}
        </div>
    );
};

export default StudentDetail;
