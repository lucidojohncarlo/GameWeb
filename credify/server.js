import express from 'express';
import bcrypt from 'bcrypt';
import bodyParser from 'body-parser';
import cors from 'cors';
import mysql from 'mysql2/promise'; // Use promise-based mysql2

const app = express();
const port = 5002; // Ensure this matches the port used in the frontend

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '12345', // Replace with your MySQL password
  database: 'credify' // Replace with your database name
};

let db;
async function connectToDatabase() {
  try {
    db = await mysql.createConnection(dbConfig);
    console.log('Connected to the database');
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
}

connectToDatabase();

app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:5173' // Adjust this to match your frontend's origin
}));

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length === 0) {
      return res.status(401).send({ success: false, message: 'Invalid credentials' });
    }

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({ success: false, message: 'Invalid credentials' });
    }

    // Assuming you have a token generation logic
    const token = 'your-generated-token'; // Replace with actual token generation logic
    res.send({ success: true, message: 'Login successful', token, user: { username: user.username, email: user.email, points: user.points } });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).send({ success: false, message: 'Login failed' });
  }
});

app.post('/api/topup', async (req, res) => {
  const { amount } = req.body;
  if (!amount) {
    return res.status(400).json({ message: 'Amount is required' });
  }

  const randomPoints = Math.floor(Math.random() * 5) + 1; // Generate random points between 1 and 5

  // Assuming you have a single global points counter
  const query = 'UPDATE global_points SET points = points + ? WHERE id = 1';
  try {
    const [results] = await db.execute(query, [randomPoints]);
    res.send({ success: true, message: `Top-up successful. You received ${randomPoints} points.`, points: randomPoints });
  } catch (err) {
    console.error('Error during top-up:', err);
    res.status(500).send({ success: false, message: 'Top-up failed' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});