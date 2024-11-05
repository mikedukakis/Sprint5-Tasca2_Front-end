import React, { useState } from 'react';
import axios from 'axios';
import BASE_URL from '../config';
import { Link } from 'react-router-dom';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/virtualpet/auth/register`, {
        username,
        password,
      });
      setMessage('Signup successful! You can now log in.');
    } catch (error) {
      setMessage('Signup failed. Please try a different username.');
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Sign Up</button>
      </form>
      {message && (
        <p>
          {message} {message.includes('Signup successful') && <Link to="/">log in</Link>}
        </p>
      )}
    </div>
  );
}

export default Signup;
