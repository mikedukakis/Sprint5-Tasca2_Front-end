import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PetCard from './PetCard';
import LogoutButton from '../buttons/LogoutButton';

const AdminPets = () => {
  const [pets, setPets] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllPets = async () => {
      try {
        const response = await axios.get('http://localhost:8080/virtualpet/pet/allpets', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`
          }
        });
        setPets(response.data);
      } catch (err) {
        setError('Failed to load pets.');
      }
    };

    fetchAllPets();
  }, []);

  // Debugging: Log when handlePetDelete is called
  const handlePetDelete = (deletedPetId) => {
    console.log('Deleting pet with ID:', deletedPetId);
    setPets(prevPets => prevPets.filter(pet => pet.id !== deletedPetId)); // Remove the deleted pet from state
  };

  const handlePetUpdate = (updatedPet) => {
    setPets(prevPets => prevPets.map(pet => pet.id === updatedPet.id ? updatedPet : pet)); // Update the pet state
  };

  return (
    <div className="mypets-container">
      <LogoutButton />
      <h2>All Pets</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div className="pets-container">
        {pets.map(pet => (
          <div key={pet.id}>
            <p>Owner: {pet.ownerUsername}</p>
            <PetCard 
              pet={pet}
              onPetDelete={handlePetDelete}  // Pass handlePetDelete to PetCard
              onPetUpdate={handlePetUpdate}  // Pass handlePetUpdate to PetCard
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPets;