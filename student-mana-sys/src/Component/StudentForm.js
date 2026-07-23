import React, { useState, useEffect } from 'react';
import axios from 'axios';

function StudentForm({ editingStudent, onSuccess, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rollno: '',
    course: '',
    address: '',
    password: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (editingStudent) {
      setFormData({
        name: editingStudent.name,
        email: editingStudent.email,
        rollno: editingStudent.rollno,
        course: editingStudent.course,
        address: editingStudent.address,
        password: ''
      });
    }
  }, [editingStudent]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (editingStudent) {
        await axios.put(`http://localhost:8080/students/${editingStudent.id}`, formData);
        onSuccess('Student record updated successfully!');
      } else {
        await axios.post('http://localhost:8080/students', formData);
        onSuccess('New student inserted successfully!');
      }
    } catch (err) {
      if (err.response && err.response.data) {
        setError(typeof err.response.data === 'object' ? Object.values(err.response.data).join(', ') : err.response.data);
      } else {
        setError('Submission failed.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '500px' }}>
      <h3>{editingStudent ? 'Modify Student Details' : 'Insert New Student Record'}</h3>
      {error && <div className="alert danger">{error}</div>}
      
      <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
      <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
      <input type="number" name="rollno" placeholder="Roll Number" value={formData.rollno} onChange={handleChange} required />
      <input type="text" name="course" placeholder="Course / Department" value={formData.course} onChange={handleChange} required />
      <input type="text" name="address" placeholder="City / Address" value={formData.address} onChange={handleChange} required />
      <input type="password" name="password" placeholder={editingStudent ? "Leave blank to keep current password" : "Password (e.g. Password@123)"} value={formData.password} onChange={handleChange} required={!editingStudent} />

      <div style={{ display: 'flex', gap: '10px' }}>
        <button type="submit" className="btn-submit" style={{ width: 'auto', margin: 0 }}>Save Student</button>
        <button type="button" onClick={onCancel} className="btn-secondary">Cancel</button>
      </div>
    </form>
  );
}

export default StudentForm;