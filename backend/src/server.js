require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const authRoutes = require('./routes/authRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: 'http://localhost:5173,https://home-aseesment.vercel.app/login'
  })
);
app.use(express.json());

app.get('/api/health', (req, res) => {
  return res.json({ status: 'ok' });
});

app.use('/api/auth', authRoutes);
app.use('/api', dashboardRoutes);

app.use((err, req, res, next) => {
  return res.status(500).json({ message: 'Unexpected server error' });
});

async function start() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log("MongoDb connected Successfully to the backend server" );
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
}

start();
