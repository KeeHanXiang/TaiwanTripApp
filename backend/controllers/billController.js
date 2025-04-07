// backend/controllers/billController.js
const Bill = require('../models/billModel');

// Get all bills for a specific user
const getBills = (req, res) => {
  const userId = req.params.userId;
  Bill.getBillsByUser(userId, (err, results) => {
    if (err) {
      console.error("Error fetching bills:", err);
      return res.status(500).json({ error: "Failed to fetch bills" });
    }
    res.json(results);
  });
};

// Add a new bill
const addBill = (req, res) => {
  const billData = req.body;
  // If participants is an array, join it into a comma-separated string.
  if (Array.isArray(billData.participants)) {
    billData.participants = billData.participants.join(",");
  }
  Bill.addBill(billData, (err, result) => {
    if (err) {
      console.error("Error adding bill:", err);
      return res.status(500).json({ error: "Failed to add bill" });
    }
    res.json({ message: "Bill added successfully", billId: result.insertId });
  });
};

// Delete a bill
const deleteBill = (req, res) => {
  const billId = req.params.billId;
  Bill.deleteBill(billId, (err, result) => {
    if (err) {
      console.error("Error deleting bill:", err);
      return res.status(500).json({ error: "Failed to delete bill" });
    }
    res.json({ message: "Bill deleted successfully" });
  });
};

module.exports = {
  getBills,
  addBill,
  deleteBill,
};
