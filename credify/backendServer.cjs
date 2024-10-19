// credify/backendServer.cjs
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2/promise');
const signupRoute = require('./routes/signup.cjs');
const pointsRoute = require('./routes/points.cjs');

const app = express();
const PORT = 5003;

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '12345',
  database: 'credify',
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

app.use(cors());
app.use(bodyParser.json());
app.use('/api/signup', signupRoute);
app.use('/api/points', pointsRoute);

// Add logging to confirm route registration
app.use((req, res, next) => {
  console.log(`Received request: ${req.method} ${req.url}`);
  next();
});

app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});