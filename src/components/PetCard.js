import React, { useState } from 'react';
import FeedButton from './FeedButton';
import PetButton from './PetButton';
import DeleteButton from './DeleteButton';

function PetCard({ pet, onPetDelete, onPetUpdate }) {
  const [selected, setSelected] = useState(false);

  const handleSelect = () => setSelected(!selected);

  const getImagePath = () => {
    const mood = (!pet.happy || pet.hungry) ? 'Sad' : 'Happy';
    return `/pet-images/${mood}${pet.petType}_${pet.colour}.png`;
  };

  return (
    <div className={`pet-card ${selected ? 'selected' : ''}`} onClick={handleSelect}>
      <img src={getImagePath()} alt={`${pet.petType} ${pet.colour}`} className="pet-image" />
      <p>{pet.name}</p>
      {selected && (
        <div className="pet-actions">
          <FeedButton pet={pet} onUpdate={onPetUpdate} />
          <PetButton pet={pet} onUpdate={onPetUpdate} />
          <DeleteButton petId={pet.id} onDelete={onPetDelete} />
        </div>
      )}
    </div>
  );
}

export default PetCard;