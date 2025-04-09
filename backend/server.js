// backend/server.js
const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config({ path: './backend/.env' });

// Import your routes
const firebaseRoutes = require('./routes/firebaseRoutes');
const userRoutes = require('./routes/userRoutes');
const billRoutes = require('./routes/billRoutes');
const confessionRoutes = require('./routes/confessionRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// API routes
app.use('/api', userRoutes);
app.use('/api/firebase', firebaseRoutes);
app.use('/api/bills', billRoutes);
app.use('/api/confessions', confessionRoutes);

// Serve static files from the React app's build folder
// Assuming your build folder is located in the "frontend/build" folder
app.use(express.static(path.join(__dirname, '..', 'frontend', 'build')));

// The "catchall" handler: for any request that doesn't match an API route,
// send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
