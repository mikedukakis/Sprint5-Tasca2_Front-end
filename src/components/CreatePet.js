import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreatePet() {
  const [name, setName] = useState('');
  const [petType, setPetType] = useState('DOG');
  const [colour, setColour] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleCreatePet = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('access_token');
      const owner = localStorage.getItem('username'); // Obtener el nombre del propietario

      const response = await fetch('http://localhost:8080/virtualpet/pet/new', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          owner,
          petType,
          colour
        })
      });

      if (response.ok) {
        navigate('/mypets');
      } else {
        setError('Error while creating the pet. Please check the input.');
      }
    } catch (error) {
      setError('Connection error. Please try again later.');
    }
  };

  return (
    <div className="createpet-container">
      <h2>Crear Mascota</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleCreatePet}>
        <div>
          <label htmlFor="name">Pet name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="petType">Pet type:</label>
          <select
            id="petType"
            value={petType}
            onChange={(e) => setPetType(e.target.value)}
          >
            <option value="DOG">Dog</option>
            <option value="CAT">Cat</option>
          </select>
        </div>
        <div>
          <label htmlFor="colour">Pet colour:</label>
          <select
            id="colour"
            value={colour}
            onChange={(e) => setColour(e.target.value)}
            required
          >
            <option value="">Select a colour</option>
            <option value="White">White</option>
            <option value="Brown">Brown</option>
            <option value="Black">Black</option>
          </select>
        </div>
        <button type="submit">Create pet</button>
      </form>
    </div>
  );
}

export default CreatePet;