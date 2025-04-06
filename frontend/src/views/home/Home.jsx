// frontend/src/views/home/Home.jsx
import React, { useEffect, useState } from "react";
import PlayerCard from "../../components/PlayerCard/PlayerCard";
import UserService from "../../services/UserService";
import "./Home.css";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);

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
      <div>
        <h1 className="title">Select your character!</h1>
      </div>
      <div className="player-container">
        {users.map((user) => (
          <PlayerCard
            key={user.id}
            name={user.name}
            imageUrl={user.imageUrl}
            isOwner={selectedUserId === user.id}
            onClick={() => setSelectedUserId(user.id)}
            onUpload={async (url) => {
              try {
                await UserService.uploadProfilePicture(user.id, url);
                setUsers((prev) =>
                  prev.map((u) => (u.id === user.id ? { ...u, imageUrl: url } : u))
                );
              } catch (err) {
                alert("Failed to update profile image");
              }
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;