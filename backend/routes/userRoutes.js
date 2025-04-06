// backend/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const {getUsers, updateUserProfilePic} = require('../controllers/userController');

// Get list of users
router.get('/users', getUsers);

// Update user profile picture
router.post('/upload-profile', updateUserProfilePic); 

module.exports = router;
