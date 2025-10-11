// src/routes/nasaRoutes.js
const express = require('express');
const router = express.Router();
const nasaController = require('../controllers/nasaController');

// Search routes
router.get('/search', nasaController.searchImages);
router.get('/popular', nasaController.getPopularImages);

// Mission-specific routes
router.get('/mission/:mission', nasaController.getMissionImages);

// Asset details
router.get('/asset/:nasa_id', nasaController.getImageDetails);

module.exports = router;