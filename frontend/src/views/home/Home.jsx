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

  return (
    <div className="player-container">
      {users.map((user) => (
        <PlayerCard key={user.id} name={user.name} />
      ))}
    </div>
  );
};

export default Home;
