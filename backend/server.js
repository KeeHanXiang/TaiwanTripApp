// backend/server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: './backend/.env' });
console.log("DB USER:", process.env.DB_USER); // temporary debug

const db = require('./db');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use('/api', userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
