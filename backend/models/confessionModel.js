// backend/models/confessionModel.js
const db = require('../db');

// Add a new confession for a user
const addConfession = (userId, message, callback) => {
  const query = 'INSERT INTO confessions (user_id, message) VALUES (?, ?)';
  db.query(query, [userId, message], callback);
};

// Get all confessions for a specific user (ordered by newest first)
const getConfessionsByUser = (userId, callback) => {
  const query = 'SELECT * FROM confessions WHERE user_id = ? ORDER BY created_at DESC';
  db.query(query, [userId], callback);
};

module.exports = {
  addConfession,
  getConfessionsByUser,
};
