const express = require('express');
const cors = require('cors');
const path = require('path');

const simulateRoutes = require('./routes/simulate');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for Vite dev server & production
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Request logger for diagnostic tracing
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// API Routes
app.use('/api', simulateRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    service: 'WHAT IF — Alternate Timeline Simulator API',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🌌 WHAT IF — Multiverse Simulation Engine Online`);
  console.log(`📡 Listening on http://localhost:${PORT}`);
  console.log(`⚡ Health check at http://localhost:${PORT}/api/health`);
  console.log(`====================================================`);
});
