// backend/models/userModel.js
const db = require('../db');

const getAllUsers = (callback) => {
  db.query('SELECT * FROM users', callback);
};

const updateProfilePicture = (userId, imageUrl, callback) => {
  const query = 'UPDATE users SET imageUrl = ? WHERE user_id = ?';
  db.query(query, [imageUrl, userId], (err, result) => {
    if (err) {
      console.error("SQL Error:", err);
      return callback(err);
    }
    console.log("Rows affected:", result.affectedRows);
    callback(null, result);
  });
};

module.exports = {
  getAllUsers,
  updateProfilePicture
};
