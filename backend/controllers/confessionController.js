// backend/controllers/confessionController.js
const Confession = require('../models/confessionModel');

// Add a new confession
const addConfession = (req, res) => {
  const { userId, message } = req.body;
  if (!userId || !message) {
    return res.status(400).json({ error: 'User ID and message are required.' });
  }
  Confession.addConfession(userId, message, (err, result) => {
    if (err) {
      console.error("Error adding confession:", err);
      return res.status(500).json({ error: 'Failed to add confession.' });
    }
    res.json({ message: 'Confession added successfully', confessionId: result.insertId });
  });
};

// Get all confessions for a specific user
const getConfessions = (req, res) => {
  const userId = req.params.userId;
  Confession.getConfessionsByUser(userId, (err, results) => {
    if (err) {
      console.error("Error fetching confessions:", err);
      return res.status(500).json({ error: 'Failed to fetch confessions.' });
    }
    res.json(results);
  });
};

module.exports = {
  addConfession,
  getConfessions,
};
