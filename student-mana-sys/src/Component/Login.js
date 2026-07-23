import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // IMPORT THIS
import axios from 'axios';

function Login() {
  const navigate = useNavigate(); // Initialize navigation tool
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await axios.post('http://localhost:8080/auth/login', { email, password });
      // Successfully authenticated -> Route cleanly to dashboard
      navigate('/dashboard'); 
    } catch (err) {
      setError(err.response?.data || "Connection failed.");
    }
  };

  return (
    <div className="container">
      <div className="auth-box">
        <h2>Student Login</h2>
        {error && <div className="alert danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email Address:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="btn-submit">Login</button>
        </form>
        <p className="toggle-text">
          Don't have an account? <span onClick={() => navigate('/register')}>Create an account here</span>
        </p>
      </div>
    </div>
  );
}

export default Login;