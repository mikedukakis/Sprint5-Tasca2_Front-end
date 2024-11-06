import React from 'react';

function DeleteButton({ petId, onDelete }) {
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`http://localhost:8080/virtualpet/pet/delete/${petId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        onDelete(petId);
      } else {
        console.error("Failed to delete the pet.");
      }
    } catch (error) {
      console.error("Connection error:", error);
    }
  };

  return (
    <button onClick={handleDelete} className="delete-button">
      Delete
    </button>
  );
}

export default DeleteButton;
