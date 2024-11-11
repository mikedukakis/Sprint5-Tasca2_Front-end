import React from 'react';

function PetButton({ pet, onUpdate }) {
  const handlePetClick = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`http://localhost:8080/virtualpet/pet/pet/${pet.id}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const updatedPet = await response.json();
        onUpdate(updatedPet);
        window.location.reload();// Update parent state with the new pet state
      } else {
        console.error("Failed to pet the pet.");
      }
    } catch (error) {
      console.error("Connection error:", error);
    }
  };

  return (
    <button onClick={handlePetClick} disabled={pet.happy}>
      Pet
    </button>
  );
}

export default PetButton;
