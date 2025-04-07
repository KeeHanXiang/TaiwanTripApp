// backend/routes/billRoutes.js
const express = require('express');
const router = express.Router();
const { getBills, addBill, deleteBill } = require('../controllers/billController');

// Get bills for a user, e.g., /api/bills/1 to get bills for user_id = 1
router.get('/:userId', getBills);

// Add a new bill
router.post('/', addBill);

// Delete a bill (e.g., /api/bills/123)
router.delete('/:billId', deleteBill);

module.exports = router;
