// backend/server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: './backend/.env' });
const firebaseRoutes = require('./routes/firebaseRoutes');
const userRoutes = require('./routes/userRoutes');
const billRoutes = require('./routes/billRoutes');
const confessionRoutes = require('./routes/confessionRoutes');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use('/api', userRoutes);
app.use('/api/firebase', firebaseRoutes);
app.use('/api/bills', billRoutes);
app.use('/api/confessions', confessionRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
