// backend/models/userModel.js
const db = require('../db');

const getAllUsers = (callback) => {
  db.query('SELECT * FROM users', callback);
};

module.exports = {
  getAllUsers,
};
