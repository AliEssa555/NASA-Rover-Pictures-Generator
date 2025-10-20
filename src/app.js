// src/app.js
const express = require('express');
const path = require('path');
const nasaRoutes = require('./routes/nasaRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public'))); // Serve static files

// API Routes
app.use('/api/nasa', nasaRoutes);

// Serve frontend for all other routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`NASA Explorer running on port ${PORT}`);
});