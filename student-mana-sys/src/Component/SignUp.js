import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // IMPORT THIS
import axios from 'axios';

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '', email: '', rollno: '', course: '', address: '', password: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const response = await axios.post('http://localhost:8080/auth/signup', formData);
      setMessage(response.data);
      // Optional: Auto redirect to login after 2 seconds
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(typeof err.response?.data === 'object' ? Object.values(err.response.data).join(', ') : err.response?.data);
    }
  };

  return (
    <div className="container">
      <div className="auth-box">
        <h2>Student Registration</h2>
        {message && <div className="alert success">{message}</div>}
        {error && <div className="alert danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Roll Number:</label>
            <input type="number" name="rollno" value={formData.rollno} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Course/Department:</label>
            <input type="text" name="course" value={formData.course} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>City/Address:</label>
            <input type="text" name="address" value={formData.address} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Email Address:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          </div>
          <button type="submit" className="btn-submit">Sign Up</button>
        </form>
        <p className="toggle-text">
          Already registered? <span onClick={() => navigate('/login')}>Login here</span>
        </p>
      </div>
    </div>
  );
}

export default Signup;