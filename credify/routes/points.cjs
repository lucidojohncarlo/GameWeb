// credify/routes/points.cjs
const express = require('express');
const router = express.Router();
const db = require('../db.cjs');

// Test route to verify the server is working
router.get('/test', (req, res) => {
  res.send('Test route is working');
});

router.post('/update', (req, res) => {
  const { email, points } = req.body;

  if (!email || points === undefined) {
    return res.status(400).send({ success: false, message: 'Email and points are required' });
  }

  const query = 'UPDATE users SET points = points + ? WHERE email = ?';
  db.query(query, [points, email], (err, results) => {
    if (err) {
      console.error('Error updating points:', err);
      return res.status(500).send({ success: false, message: 'Failed to update points' });
    }

    if (results.affectedRows === 0) {
      return res.status(404).send({ success: false, message: 'User not found' });
    }

    res.send({ success: true, message: 'Points updated successfully' });
  });
});

module.exports = router;