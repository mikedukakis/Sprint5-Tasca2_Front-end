import React from 'react';

function FeedButton({ pet, onUpdate }) {
  const handleFeedClick = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`http://localhost:8080/virtualpet/pet/feed/${pet.id}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const updatedPet = await response.json();
        onUpdate(updatedPet);
        window.location.reload();
      } else {
        console.error('Failed to feed the pet.');
      }
    } catch (error) {
      console.error('Connection error:', error);
    }
  };

  return (
    <button onClick={handleFeedClick} disabled={pet.hungry === false}>
      Feed
    </button>
  );
}

export default FeedButton;