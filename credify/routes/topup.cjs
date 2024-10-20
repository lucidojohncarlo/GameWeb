const express = require('express');
const router = express.Router();
const pool = require('../db.cjs');

router.post('/topup', async (req, res) => {
  const { email, token, amount } = req.body;

  if (!email || !token || amount === undefined) {
    return res.status(400).send({ success: false, message: 'Email, token, and amount are required' });
  }

  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    // Update points for the user
    const [result] = await connection.execute(
      'UPDATE users SET points = points + ? WHERE email = ?',
      [amount, email]
    );

    if (result.affectedRows === 0) {
      await connection.rollback();
      return res.status(404).send({ success: false, message: 'User not found' });
    }

    await connection.commit();
    res.send({ success: true, message: 'Top-up successful', points: amount });
  } catch (error) {
    await connection.rollback();
    console.error('Error during top-up:', error);
    res.status(500).send({ success: false, message: 'Failed to top-up' });
  } finally {
    connection.release();
  }
});

module.exports = router;