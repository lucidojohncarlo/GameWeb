const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const signupRoute = require('./routes/signup.cjs');
const pointsRoute = require('./routes/points.cjs');
const topupRoute = require('./routes/topup.cjs');
const updatePointsRoute = require('./routes/updatePoints.cjs'); // Add this line

const app = express();
const PORT = 5003;

app.use(cors());
app.use(bodyParser.json());
app.use('/api/signup', signupRoute);
app.use('/api/points', pointsRoute);
app.use('/api/topup', topupRoute);
app.use('/api/points', updatePointsRoute); // Add this line

// Add logging to confirm route registration
app.use((req, res, next) => {
  console.log(`Received request: ${req.method} ${req.url}`);
  next();
});

app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});