import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MyPets.css';

function MyPets() {
  const [pets, setPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch pets from the backend
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

  // Determine pet image based on hunger and happiness
  const getImagePath = (pet) => {
    const mood = (!pet.happy || pet.hungry) ? 'Sad' : 'Happy';
    return `/pet-images/${mood}${pet.petType}_${pet.colour}.png`;
  };

  // Update pet in both selectedPet and pets list
  const updatePetState = (updatedPet) => {
    setSelectedPet(updatedPet);
    setPets(prevPets => prevPets.map(pet => pet.id === updatedPet.id ? updatedPet : pet));
    console.log("Updated selectedPet state:", updatedPet);
  };

  // Feed pet handler
  const handleFeed = async () => {
    if (!selectedPet) return;

    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`http://localhost:8080/virtualpet/pet/feed/${selectedPet.id}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const updatedPet = await response.json();
        updatePetState(updatedPet);
      } else {
        console.error("Failed to feed the pet.");
      }
    } catch (error) {
      console.error("Connection error:", error);
    }
  };

  // Pet handler
  const handlePet = async () => {
    if (!selectedPet) return;

    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`http://localhost:8080/virtualpet/pet/pet/${selectedPet.id}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const updatedPet = await response.json();
        updatePetState(updatedPet);
      } else {
        console.error("Failed to pet the pet.");
      }
    } catch (error) {
      console.error("Connection error:", error);
    }
  };

  // Delete pet handler
  const handleDelete = async () => {
    if (!selectedPet) return;

    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`http://localhost:8080/virtualpet/pet/delete/${selectedPet.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        setPets(prevPets => prevPets.filter(pet => pet.id !== selectedPet.id));
        setSelectedPet(null); // Deselect pet after deletion
      } else {
        console.error("Failed to delete the pet.");
      }
    } catch (error) {
      console.error("Connection error:", error);
    }
  };

  // Select a pet and track it as the active pet
  const handleSelectPet = (pet, event) => {
    event.stopPropagation();
    setSelectedPet(pet);
  };

  // Deselect pet when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectedPet && !event.target.closest('.selected')) {
        setSelectedPet(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [selectedPet]);

  return (
    <div className="mypets-container">
      <h2>My Pets</h2>
      <button className="create-pet-button" onClick={() => navigate('/createpet')}>Create New Pet</button>
      {loading ? (
        <p>Loading your pets...</p>
      ) : pets.length > 0 ? (
        <div className="pets-container">
          {pets.map(pet => (
            <div
              key={pet.id}
              className={`pet-card ${selectedPet?.id === pet.id ? 'selected' : ''}`}
              onClick={(e) => handleSelectPet(pet, e)}
            >
              <img
                src={getImagePath(pet)}
                alt={`${pet.petType} ${pet.colour}`}
                className="pet-image"
              />
              <p>{pet.name}</p>

              {selectedPet?.id === pet.id && (
                <div className="pet-actions">
                  <button 
                    onClick={handleFeed} 
                    disabled={!selectedPet.hungry} // Enable only if hungry is true
                  >
                    Feed
                  </button>
                  <button 
                    onClick={handlePet} 
                    disabled={selectedPet.happy} // Enable only if happy is false
                  >
                    Pet
                  </button>
                  <button 
                    onClick={handleDelete} 
                    className="delete-button" // Additional styling for delete button
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>You don't have pets yet</p>
      )}
    </div>
  );
}

export default MyPets;