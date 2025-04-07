// frontend/src/components/ManageBills/ManageBills.jsx
import React, { useState, useEffect, useCallback } from "react";

const ManageBills = ({ userId }) => {
  const [bills, setBills] = useState([]);
  const [transactionItem, setTransactionItem] = useState("");
  const [transactionAmount, setTransactionAmount] = useState("");
  const [currency, setCurrency] = useState("TWD");
  const [selectedParticipants, setSelectedParticipants] = useState([]);
  const [availableParticipants, setAvailableParticipants] = useState([]);

  // Fetch bills for the given user from the backend
  const fetchBills = useCallback(async () => {
    try {
      const res = await fetch(`/api/bills/${userId}`);
      if (!res.ok) throw new Error("Failed to fetch bills");
      const data = await res.json();
      setBills(data);
    } catch (error) {
      console.error("Error fetching bills:", error);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      fetchBills();
    }
  }, [userId, fetchBills]);

  // Fetch available participants from the SQL database (GET /api/users)
  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const res = await fetch("/api/users");
        if (!res.ok) throw new Error("Failed to fetch participants");
        const data = await res.json();
        // Filter out the current user from the list (assuming user_id is a number)
        const participants = data.filter(u => u.user_id !== Number(userId));
        setAvailableParticipants(participants);
      } catch (error) {
        console.error("Error fetching participants:", error);
      }
    };

    if (userId) {
      fetchParticipants();
    }
  }, [userId]);

  // Toggle selection for a participant checkbox.
  const handleCheckboxChange = (participantName) => {
    if (selectedParticipants.includes(participantName)) {
      setSelectedParticipants(selectedParticipants.filter(p => p !== participantName));
    } else {
      setSelectedParticipants([...selectedParticipants, participantName]);
    }
  };

  // Add a new bill to the SQL database.
  const handleAddBill = async (e) => {
    e.preventDefault();

    if (!transactionItem || !transactionAmount) {
      alert("Please fill in all required fields.");
      return;
    }

    const newBill = {
      user_id: userId,
      transaction_item: transactionItem,
      transaction_amount: transactionAmount,
      currency,
      // Assuming the backend expects a comma-separated string.
      participants: selectedParticipants.join(","),
    };

    try {
      const res = await fetch(`/api/bills/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBill),
      });
      if (!res.ok) throw new Error("Failed to add bill");
      await fetchBills();
    } catch (error) {
      console.error("Error adding bill:", error);
      alert("Failed to add bill");
    }

    setTransactionItem("");
    setTransactionAmount("");
    setCurrency("TWD");
    setSelectedParticipants([]);
  };

  // Delete a bill from the SQL database.
  const handleDeleteBill = async (billId) => {
    try {
      const res = await fetch(`/api/bills/${billId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete bill");
      await fetchBills();
    } catch (error) {
      console.error("Error deleting bill:", error);
      alert("Failed to delete bill");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      {/* <h2>Manage Bills</h2> */}

      {/* Bills Table */}
      <table border="1" cellPadding="5" cellSpacing="0" style={{ marginBottom: "20px", width: "100%" }}>
        <thead>
          <tr>
            <th>Transaction Item</th>
            <th>Amount</th>
            <th>Currency</th>
            <th>Participants</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {bills.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>No bills added.</td>
            </tr>
          ) : (
            bills.map(bill => (
              <tr key={bill.bill_id}>
                <td>{bill.transaction_item}</td>
                <td>{bill.transaction_amount}</td>
                <td>{bill.currency}</td>
                <td>{bill.participants}</td>
                <td>
                  <button onClick={() => handleDeleteBill(bill.bill_id)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Add New Bill Form */}
      <h3>Add New Bill</h3>
      <form onSubmit={handleAddBill}>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Transaction Item:{" "}
            <input
              type="text"
              value={transactionItem}
              onChange={(e) => setTransactionItem(e.target.value)}
              required
            />
          </label>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Transaction Amount:{" "}
            <input
              type="number"
              value={transactionAmount}
              onChange={(e) => setTransactionAmount(e.target.value)}
              required
            />
          </label>{" "}
          <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
            <option value="TWD">TWD</option>
            <option value="SGD">SGD</option>
          </select>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <p>Include for this payment:</p>
          {availableParticipants.length === 0 ? (
            <p>Loading participants...</p>
          ) : (
            availableParticipants.map((participant) => (
              <label key={participant.user_id} style={{ marginRight: "10px" }}>
                <input
                  type="checkbox"
                  checked={selectedParticipants.includes(participant.name)}
                  onChange={() => handleCheckboxChange(participant.name)}
                />
                {participant.name}
              </label>
            ))
          )}
        </div>
        <button type="submit">Add Bill</button>
      </form>
    </div>
  );
};

export default ManageBills;
