const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

app.get('/api/users', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
      if (err) return res.status(500).json({ error: 'DB query failed' });
      res.json(results);
    });
  });

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
