// frontend/src/components/PlayerCard/PlayerCard.jsx
import React from "react";
import "./PlayerCard.css";

const PlayerCard = ({ id, name, imageUrl, onClick }) => {
  return (
    <div className="player-card" onClick={onClick}>
      <div className="player-icon">
        {imageUrl ? (
          <img src={imageUrl} alt="Profile" className="profile-pic" />
        ) : (
          "👤"
        )}
      </div>
      <div className="player-name">{name}</div>
    </div>
  );
};

export default PlayerCard;
