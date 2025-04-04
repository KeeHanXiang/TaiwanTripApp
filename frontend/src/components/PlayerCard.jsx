// src/components/PlayerCard.jsx
import React from 'react';
// import './PlayerCard.css'; // Optional separate styling

const PlayerCard = ({ name }) => {
  return (
    <div className="player-card">
      <div className="player-icon">👤</div>
      <div className="player-name">{name}</div>
    </div>
  );
};

export default PlayerCard;
