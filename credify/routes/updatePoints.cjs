const express = require('express');
const router = express.Router();
const pool = require('../db.cjs');

router.post('/update', async (req, res) => {
  const { email, points } = req.body;

  if (!email || points === undefined) {
    return res.status(400).send({ success: false, message: 'Email and points are required' });
  }

  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    // Update points for the user
    const [result] = await connection.execute(
      'UPDATE users SET points = points + ? WHERE email = ?',
      [points, email]
    );

    if (result.affectedRows === 0) {
      await connection.rollback();
      return res.status(404).send({ success: false, message: 'User not found' });
    }

    await connection.commit();
    res.send({ success: true, message: 'Points updated successfully', points });
  } catch (error) {
    await connection.rollback();
    console.error('Error updating points:', error);
    res.status(500).send({ success: false, message: 'Failed to update points' });
  } finally {
    connection.release();
  }
});

module.exports = router;