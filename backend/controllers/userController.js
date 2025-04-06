// backend/controllers/userController.js
const User = require('../models/userModel');


//Controller function to get all users from the database.
const getUsers = (req, res) => {
  // Fetch all users from the database
  User.getAllUsers((err, results) => {
    if (err) {
      // Log error and send error response
      console.error('Error fetching users:', err);
      return res.status(500).json({ error: 'Failed to retrieve users' });
    }
    // Send user data as JSON response
    res.json(results);
  });
};

const updateUserProfilePic = (req, res) => {
  const { userId, imageUrl } = req.body;
  console.log("Updating user:", userId, "with imageUrl:", imageUrl);

  User.updateProfilePicture(userId, imageUrl, (err) => {
    if (err) {
      console.error("Error updating profile picture:", err);
      return res.status(500).json({ error: "Failed to update profile picture" });
    }
    res.json({ message: "Profile picture updated successfully" });
  });
};

module.exports = {
  getUsers,
  updateUserProfilePic
};
