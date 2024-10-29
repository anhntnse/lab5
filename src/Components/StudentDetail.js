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
        return <div style={{ textAlign: 'center', padding: '20px' }}>Loading...</div>;
    }

    return (
        <div style={styles.card}>
            <h2 style={styles.title}>{student.name}</h2>
            <p style={styles.text}><strong>Student Code:</strong> {student.studentCode}</p>
            <p style={styles.text}><strong>Status:</strong> {student.isActive ? 'Active' : 'Inactive'}</p>
            {/* Additional fields can go here */}
        </div>
    );
};

const styles = {
    card: {
        width: '280px',
        margin: '20px auto',
        padding: '15px',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#f9f9f9',
        textAlign: 'center',
    },
    title: {
        fontSize: '20px',
        color: '#333',
    },
    text: {
        fontSize: '16px',
        color: '#555',
        margin: '8px 0',
    },
};

export default StudentDetail;
