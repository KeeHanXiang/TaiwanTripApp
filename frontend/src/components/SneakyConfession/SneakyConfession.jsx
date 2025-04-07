// frontend/src/components/SneakyConfession/SneakyConfession.jsx
import React, { useState } from "react";

const SneakyConfession = ({ userId, onConfessionAdded }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) {
      alert("Please enter your confession.");
      return;
    }
    try {
      const res = await fetch("/api/confessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, message }),
      });
      if (!res.ok) {
        throw new Error("Failed to submit confession");
      }
      const data = await res.json();
      alert("Confession submitted successfully!");
      setMessage("");
      if (onConfessionAdded) onConfessionAdded(data);
    } catch (error) {
      console.error("Error submitting confession:", error);
      alert("Error submitting confession.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        rows="5"
        cols="50"
        placeholder="Drop your sneaky confession here..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      ></textarea>
      <br />
      <button type="submit">Submit Confession</button>
    </form>
  );
};

export default SneakyConfession;
