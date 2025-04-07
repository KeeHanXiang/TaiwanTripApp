// backend/models/billModel.js
const db = require('../db');

// Retrieve all bills for a given user
const getBillsByUser = (userId, callback) => {
  const query = 'SELECT * FROM bills WHERE user_id = ?';
  db.query(query, [userId], callback);
};

// Insert a new bill
const addBill = (billData, callback) => {
  const query = `
    INSERT INTO bills (user_id, transaction_item, transaction_amount, currency, participants)
    VALUES (?, ?, ?, ?, ?)
  `;
  const { user_id, transaction_item, transaction_amount, currency, participants } = billData;
  db.query(query, [user_id, transaction_item, transaction_amount, currency, participants], callback);
};

// Delete a bill by bill_id
const deleteBill = (billId, callback) => {
  const query = 'DELETE FROM bills WHERE bill_id = ?';
  db.query(query, [billId], callback);
};

module.exports = {
  getBillsByUser,
  addBill,
  deleteBill,
};
