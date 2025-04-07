// frontend/src/components/ConfessionList.jsx
import React, { useEffect, useState } from 'react';

const ConfessionList = () => {
  const [confessions, setConfessions] = useState([]);

  const fetchConfessions = async () => {
    try {
      const res = await fetch('/api/confessions/all');
      if (!res.ok) throw new Error('Failed to fetch confessions');
      const data = await res.json();
      setConfessions(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchConfessions();
  }, []);

  return (
    <div style={{ padding: '20px', width: '90%', maxWidth: '800px', margin: '20px auto' }}>
      <h2>Latest Confessions</h2>
      {confessions.length === 0 ? (
        <p>No confessions yet.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {confessions.map(confession => (
            <li key={confession.confession_id} style={{ borderBottom: '1px solid #ccc', padding: '10px 0' }}>
              <p>{confession.message}</p>
              <small>
                By User {confession.user_id} on {new Date(confession.created_at).toLocaleString()}
              </small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ConfessionList;
