import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/virtualpet/auth/register', {
        username: username,
        password: password
      });

      // If signup is successful, redirect to login page
      if (response.status === 200) {
        navigate('/login');  // Redirect to the login page after successful signup
      } else {
        setError('Signup failed. Please try another username.');
      }
    } catch (error) {
      console.error('Signup error:', error.response || error.message);  // Log the error for debugging
      if (error.response) {
        // Handle specific errors from the backend, e.g. duplicate username
        setError(error.response.data.message || 'Signup failed. Could not establish connection.');
      } else {
        setError('Connection error. Please try again later.');
      }
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <div>
          <label>Username:</label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Password:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account? <a href="/login">Login</a>
      </p>
    </div>
  );
};

export default Signup;