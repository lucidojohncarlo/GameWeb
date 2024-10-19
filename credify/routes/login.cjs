const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../db.cjs');

const router = express.Router();

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  console.log('Received login request:', { email, password });

  if (!email || !password) {
    console.log('Missing email or password');
    return res.status(400).send({ success: false, message: 'Email and password are required' });
  }

  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], async (err, results) => {
    if (err) {
      console.error('Error during login:', err);
      return res.status(500).send({ success: false, message: 'Login failed' });
    }
    if (results.length === 0) {
      console.log('Invalid credentials');
      return res.status(401).send({ success: false, message: 'Invalid credentials' });
    }

    const user = results[0];
    try {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        console.log('Password does not match');
        return res.status(401).send({ success: false, message: 'Invalid credentials' });
      }

      console.log('Login successful');
      res.send({ success: true, message: 'Login successful', user: { username: user.username, email: user.email } });
    } catch (error) {
      console.error('Error comparing passwords:', error);
      res.status(500).send({ success: false, message: 'Login failed' });
    }
  });
});

module.exports = router;