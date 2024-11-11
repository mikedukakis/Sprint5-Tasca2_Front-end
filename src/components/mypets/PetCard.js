import React, { useState, useEffect } from 'react';
import FeedButton from '../buttons/FeedButton';
import PetButton from '../buttons/PetButton';
import DeleteButton from '../buttons/DeleteButton';

// Helper function to determine the pet image path based on hunger and happiness
function getImagePath(pet) {
  const mood = pet.happy && !pet.hungry ? 'Happy' : 'Sad';
  return `/pet-images/${mood}${pet.petType}_${pet.colour}.png?timestamp=${new Date().getTime()}`; // Adding timestamp to avoid caching issues
}

function PetCard({ pet, ownerUsername, onPetDelete, onPetUpdate }) {
  const [currentPet, setCurrentPet] = useState(pet);  // Track the current pet state
  const [expanded, setExpanded] = useState(false);    // Track whether the pet card is expanded
  const [imagePath, setImagePath] = useState(getImagePath(pet));  // Set the initial image path

  // Update image whenever the pet's hunger or happiness changes
  useEffect(() => {
    setImagePath(getImagePath(currentPet));  // Update image path whenever pet changes
  }, [currentPet]);  // Use `currentPet` as a dependency

  // Update the pet's state when it is changed
  const handleUpdate = (updatedPet) => {
    setCurrentPet(updatedPet);
    if (onPetUpdate) onPetUpdate(updatedPet);  // Callback to update the parent component with the updated pet
  };

  // Handle the delete action by calling the onPetDelete callback
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`http://localhost:8080/virtualpet/pet/delete/${currentPet.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // After the pet is deleted, call the parent callback to update the UI
        onPetDelete(currentPet.id);  // Pass pet ID to parent to remove it from state
      } else {
        console.error("Failed to delete the pet.");
      }
    } catch (error) {
      console.error("Connection error:", error);
    }
  };

  return (
    <div className={`pet-card ${expanded ? 'expanded' : ''}`} onClick={() => setExpanded(!expanded)}>
      <img src={imagePath} alt={`${currentPet.petType} ${currentPet.colour}`} className="pet-image" />
      <p>{currentPet.name}</p>
      {ownerUsername && <p className="pet-owner">Owner: {ownerUsername}</p>} {/* Display owner name if available */}
      {expanded && (
        <div className="pet-actions">
          <FeedButton pet={currentPet} onUpdate={handleUpdate} />  {/* FeedButton to change hunger state */}
          <PetButton pet={currentPet} onUpdate={handleUpdate} />   {/* PetButton to change happiness state */}
          {onPetDelete && <DeleteButton petId={currentPet.id} onDelete={handleDelete} />}  {/* DeleteButton to remove the pet */}
        </div>
      )}
    </div>
  );
}

export default PetCard;