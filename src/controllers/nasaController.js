// src/controllers/nasaController.js
const nasaService = require('../services/nasaService');

const nasaController = {
  // Search images
  searchImages: async (req, res) => {
    try {
      const { q, page } = req.query;
      const results = await nasaService.search(q, page);
      res.json(results);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get image details
  getImageDetails: async (req, res) => {
    try {
      const { nasa_id } = req.params;
      const details = await nasaService.getAssetDetails(nasa_id);
      res.json(details);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get popular space images
  getPopularImages: async (req, res) => {
    try {
      const images = await nasaService.getPopularImages();
      res.json(images);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get images by mission (Apollo, Hubble, etc.)
  getMissionImages: async (req, res) => {
    try {
      const { mission } = req.params;
      const images = await nasaService.search(mission);
      res.json(images);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = nasaController;