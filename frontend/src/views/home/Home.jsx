import React, { useEffect, useState } from 'react';
import PlayerCard from '../../components/PlayerCard';
import './Home.css';

const Home = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('/api/users')
      .then((res) => res.json())
      .then(setUsers)
      .catch(console.error);
  }, []);

  const backgroundStyle = {
    backgroundImage: "url('/background2.jpg')", // Must be in `public/` folder
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    minHeight: "100vh",
  };

  return (
    <div style={backgroundStyle}>
      <div className="player-container">
        {users.map((user) => (
          <PlayerCard key={user.id} name={user.name} />
        ))}
      </div>
    </div>
  );
};

export default Home;
