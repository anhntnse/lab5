// src/routes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import StudentManagement from '../Components/StudentManagement';
import StudentDetail from '../Components/StudentDetail';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<StudentManagement />} />
            <Route path="/student/:id" element={<StudentDetail />} />
        </Routes>
    );
};

export default AppRoutes;
