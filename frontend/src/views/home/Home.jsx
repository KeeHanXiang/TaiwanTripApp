// frontend/src/views/Home.jsx
import React, { useEffect, useState } from "react";
import PlayerCard from "../../components/PlayerCard/PlayerCard";
import UserService from "../../services/UserService";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    UserService.getUsers()
      .then(setUsers)
      .catch(console.error);
  }, []);

  const backgroundStyle = {
    backgroundImage: "url('/background2.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <div style={backgroundStyle}>
      <h1 className="title">Select your character!</h1>
      <div className="player-container">
        {users.map((user) => (
          <PlayerCard
            key={user.user_id}
            id={user.user_id}
            name={user.name}
            imageUrl={user.imageUrl}
            onClick={() => navigate(`/profile/${user.user_id}`, { state: { user } })}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
