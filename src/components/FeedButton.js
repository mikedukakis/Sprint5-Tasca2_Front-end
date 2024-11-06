import React from 'react';

function FeedButton({ pet, onUpdate }) {
  const handleFeed = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`http://localhost:8080/virtualpet/pet/feed/${pet.id}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const updatedPet = await response.json();
        onUpdate(updatedPet);
      } else {
        console.error("Failed to feed the pet.");
      }
    } catch (error) {
      console.error("Connection error:", error);
    }
  };

  return (
    <button onClick={handleFeed} disabled={!pet.hungry}>
      Feed
    </button>
  );
}

export default FeedButton;