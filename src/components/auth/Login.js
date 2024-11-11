import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Step 1: Login to get access and refresh tokens
      const loginResponse = await fetch('http://localhost:8080/virtualpet/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (loginResponse.ok) {
        const loginData = await loginResponse.json();
        // Save tokens in localStorage
        localStorage.setItem('access_token', loginData.access_token);
        localStorage.setItem('refresh_token', loginData.refresh_token);

        // Step 2: Fetch profile information for username and role
        const profileResponse = await fetch(`http://localhost:8080/virtualpet/user/profile/${username}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${loginData.access_token}`,
            'Content-Type': 'application/json'
          },
        });

        if (profileResponse.ok) {
          const profileData = await profileResponse.json();

          // Save username and role in localStorage
          localStorage.setItem('username', profileData.username);
          localStorage.setItem('role', profileData.role);

          // Step 3: Redirect based on role
          if (profileData.role === 'ROLE_ADMIN') {
            navigate('/adminpets');
          } else {
            navigate('/mypets');
          }
        } else {
          setError("Failed to retrieve user profile.");
          console.error("Profile fetch error:", profileResponse.status);
        }
      } else {
        setError('Wrong credentials. Try again.');
        console.error("Login error:", loginResponse.status);
      }
    } catch (error) {
      setError('Connection error. Try again later.');
      console.error("Connection error:", error);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>
        No account? <a href="/signup">Signup here</a>
      </p>
    </div>
  );
}

export default Login;