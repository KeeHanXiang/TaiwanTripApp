// backend/routes/confessionRoutes.js
const express = require('express');
const router = express.Router();
const { addConfession, getConfessions } = require('../controllers/confessionController');

// POST /api/confessions/  -> add a confession
router.post('/', addConfession);

// GET /api/confessions/:userId -> get confessions for a user
router.get('/:userId', getConfessions);

module.exports = router;
