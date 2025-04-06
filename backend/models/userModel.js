// backend/models/userModel.js
const db = require('../db');

const getAllUsers = (callback) => {
  db.query('SELECT * FROM users', callback);
};

const updateProfilePicture = (userId, imageUrl, callback) => {
  const query = 'UPDATE users SET imageUrl = ? WHERE user_id = ?';
  db.query(query, [imageUrl, userId], callback);
};

module.exports = {
  getAllUsers,
  updateProfilePicture
};
