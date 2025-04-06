// frontend/src/components/PlayerCard/PlayerCard.jsx
import React from "react";
import ImageUploader from "../ImageUploader/ImageUploader";
import "./PlayerCard.css";

const PlayerCard = ({ name, imageUrl, isOwner, onClick, onUpload }) => {
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
      {isOwner && (
        <div className="uploader-wrapper">
          <ImageUploader onUpload={onUpload} />
        </div>
      )}
    </div>
  );
};

export default PlayerCard;