import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Hook para redirigir después del registro

  const handleSignup = async (event) => {
    event.preventDefault();
    setError(''); // Limpia errores previos

    try {
      const response = await axios.post('http://localhost:8080/virtualpet/auth/register', {
        username,
        password,
      });

      // Si el registro es exitoso, redirige a la página de inicio de sesión
      console.log("Signup successful", response.data);
      navigate('/login');
    } catch (error) {
      setError('ESignup error. Please try again with another username.');
      console.error("Error al registrarse:", error);
    }
  };

  return (
    <div>
      <h2>Registrarse</h2>
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
        <button type="submit">Signup</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <p>
        Already have an account? <a href="/login">Iniciar sesión aquí</a>
      </p>
    </div>
  );
}

export default Signup;
