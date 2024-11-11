import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PetCard from './PetCard';
import LogoutButton from '../buttons/LogoutButton';
import './MyPets.css';

function MyPets() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const response = await fetch('http://localhost:8080/virtualpet/pet/mypets', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        });

        if (response.ok) {
          const data = await response.json();
          setPets(data);
        } else {
          console.error("Error: Couldn't retrieve your pets.");
          setPets([]);
        }
      } catch (error) {
        console.error("Connection error:", error);
        setPets([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, []);

  const handlePetUpdate = (updatedPet) => {
    setPets(prevPets => prevPets.map(pet => pet.id === updatedPet.id ? updatedPet : pet)); // Update the pet state
  };

  const handlePetDelete = (deletedPetId) => {
    setPets(prevPets => prevPets.filter(pet => pet.id !== deletedPetId)); // Remove the deleted pet from state
  };

  return (
    <div className="mypets-container">
      <LogoutButton />
      <h2>My Pets</h2>
      <button className="create-pet-button" onClick={() => navigate('/createpet')}>Create New Pet</button>
      {loading ? (
        <p>Loading your pets...</p>
      ) : pets.length > 0 ? (
        <div className="pets-container">
          {pets.map(pet => (
            <PetCard 
              key={pet.id} 
              pet={pet} 
              onPetDelete={handlePetDelete}  // Pass handlePetDelete to PetCard
              onPetUpdate={handlePetUpdate}  // Pass handlePetUpdate to PetCard
            />
          ))}
        </div>
      ) : (
        <p>You don't have pets yet</p>
      )}
    </div>
  );
}

export default MyPets;