// credify/routes/signup.cjs
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const mysql = require('mysql2/promise');

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '12345',
  database: 'credify',
};

router.post('/', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const db = await mysql.createConnection(dbConfig);

    const [rows] = await db.execute('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword]);

    if (rows.affectedRows === 1) {
      res.status(201).json({ success: true, message: 'User registered successfully' });
    } else {
      res.status(500).json({ success: false, message: 'User registration failed' });
    }
  } catch (error) {
    console.error('Error during signup:', error); // Log the error
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

module.exports = router;