// backend/models/confessionModel.js
const db = require('../db');

const addConfession = (userId, message, callback) => {
  const query = 'INSERT INTO confessions (user_id, message) VALUES (?, ?)';
  db.query(query, [userId, message], callback);
};

const getConfessionsByUser = (userId, callback) => {
  const query = 'SELECT * FROM confessions WHERE user_id = ? ORDER BY created_at DESC';
  db.query(query, [userId], callback);
};

// New function to get all confessions (for all users)
const getAllConfessions = (callback) => {
  const query = 'SELECT * FROM confessions ORDER BY created_at DESC';
  db.query(query, callback);
};

module.exports = {
  addConfession,
  getConfessionsByUser,
  getAllConfessions,
};
