const express = require('express');
const router = express.Router();
const pool = require('../db.cjs');

// Existing routes...

router.post('/send', async (req, res) => {
  const { senderEmail, receiverEmail, points } = req.body;

  console.log('Received send points request:', { senderEmail, receiverEmail, points });

  if (!senderEmail || !receiverEmail || points === undefined) {
    return res.status(400).send({ success: false, message: 'Sender email, receiver email, and points are required' });
  }

  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    // Deduct points from sender
    const [senderResult] = await connection.execute(
      'UPDATE users SET points = points - ? WHERE email = ? AND points >= ?',
      [points, senderEmail, points]
    );

    if (senderResult.affectedRows === 0) {
      await connection.rollback();
      return res.status(400).send({ success: false, message: 'Insufficient points or sender not found' });
    }

    // Add points to receiver
    const [receiverResult] = await connection.execute(
      'UPDATE users SET points = points + ? WHERE email = ?',
      [points, receiverEmail]
    );

    if (receiverResult.affectedRows === 0) {
      await connection.rollback();
      return res.status(404).send({ success: false, message: 'Receiver not found' });
    }

    await connection.commit();
    res.send({ success: true, message: 'Points sent successfully' });
  } catch (error) {
    await connection.rollback();
    console.error('Error sending points:', error);
    res.status(500).send({ success: false, message: 'Failed to send points' });
  } finally {
    connection.release();
  }
});

module.exports = router;