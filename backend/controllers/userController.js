// backend/controllers/userController.js
const User = require('../models/userModel');

const getUsers = (req, res) => {
  User.getAllUsers((err, results) => {
    if (err) {
      console.error('Error fetching users:', err);
      return res.status(500).json({ error: 'Failed to retrieve users' });
    }
    res.json(results);
  });
};

module.exports = {
  getUsers,
};
