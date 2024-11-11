import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreatePet = () => {
  const [name, setName] = useState('');
  const [petType, setType] = useState('');
  const [colour, setColour] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleCreatePet = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('access_token'); // Retrieve the token from localStorage

    if (!token) {
        setError('You must be logged in to create a pet.');
        return;
    }

    try {
        const response = await axios.post(
            'http://localhost:8080/virtualpet/pet/new', 
            { name, petType, colour },
            {
                headers: {
                    Authorization: `Bearer ${token}` // Send token in the header
                }
            }
        );
        navigate('/MyPets');  // Redirect to MyPets page on success
    } catch (err) {
        const errorMessage = err.response?.data?.message || 'Failed to create pet. Please try again.';
        setError(errorMessage);
    }
};

    return (
      <div>
        <h2>Create Pet</h2>
        <form onSubmit={handleCreatePet}>
          <div>
            <label>Name:</label>
            <input petType="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div>
            <label>Type:</label>
            <select value={petType} onChange={(e) => setType(e.target.value)} required>
              <option value="">Select Type</option>
              <option value="CAT">Cat</option>
              <option value="DOG">Dog</option>
            </select>
          </div>
          <div>
            <label>Colour:</label>
            <select value={colour} onChange={(e) => setColour(e.target.value)} required>
              <option value="">Select Colour</option>
              <option value="White">White</option>
              <option value="Brown">Brown</option>
              <option value="Black">Black</option>
            </select>
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button type="submit">Create Pet</button>
        </form>
      </div>
      );
};

export default CreatePet;