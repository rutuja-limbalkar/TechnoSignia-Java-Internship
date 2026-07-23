import React, { useState } from 'react';
import Login from './Component/Login';
import Signup from './Component/SignUp';
import Dashboard from './Component/Dashboard';
import StudentList from './Component/StudentList'
import StudentForm from './Component/StudentForm'
import Sidebar from './Component/Sidebar'
import Settings from './Component/Settings'
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <div className="app-root">
      <Routes>
        {/* Default route redirects straight to login */}
        <Route path="/" element={<Navigate to="/login" />} />
        
        {/* Define paths for each component page */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/students-list" element={<StudentList/>}/>
        <Route path="/student-form" element={<StudentForm/>}/>
        <Route path="/sidebar" element={<Sidebar/>}/>
        <Route path="/settings" element={<Settings/>}/>
      </Routes>
    </div>
  );
}

export default App;