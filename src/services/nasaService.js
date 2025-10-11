// src/services/nasaService.js
const axios = require('axios');

class NasaService {
  constructor() {
    this.baseURL = 'https://images-api.nasa.gov';
  }

  // Search NASA images
  async search(query, page = 1) {
    try {
      const response = await axios.get(`${this.baseURL}/search`, {
        params: {
          q: query,
          media_type: 'image',
          page: page
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(`NASA API error: ${error.message}`);
    }
  }

  // Get asset details by NASA ID
  async getAssetDetails(nasaId) {
    try {
      const response = await axios.get(`${this.baseURL}/asset/${nasaId}`);
      return response.data;
    } catch (error) {
      throw new Error(`NASA API error: ${error.message}`);
    }
  }

  // Get popular or recent images
  async getPopularImages() {
    try {
      const response = await axios.get(`${this.baseURL}/search`, {
        params: {
          q: 'galaxy,mars,earth,moon',
          media_type: 'image'
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(`NASA API error: ${error.message}`);
    }
  }
}

module.exports = new NasaService();