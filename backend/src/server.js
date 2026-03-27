require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const authRoutes = require('./routes/authRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

const defaultAllowedOrigins = [
  'http://localhost:5173',
  'https://home-aseesment.vercel.app'
];
const envAllowedOrigins = (process.env.CORS_ORIGINS || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);
const allowedOrigins = [...new Set([...defaultAllowedOrigins, ...envAllowedOrigins])];

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin) || /^https:\/\/.*\.vercel\.app$/.test(origin)) {
        return callback(null, true);
      }

      return callback(new Error('Not allowed by CORS'));
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
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
