// backend/routes/confessionRoutes.js
const express = require('express');
const router = express.Router();
const { addConfession, getConfessions, getAllConfessions } = require('../controllers/confessionController');

// POST /api/confessions/ -> add a confession
router.post('/', addConfession);

// New route: GET /api/confessions/all -> get all confessions
router.get('/all', getAllConfessions);

// GET /api/confessions/:userId -> get confessions for a specific user
router.get('/:userId', getConfessions);

module.exports = router;
