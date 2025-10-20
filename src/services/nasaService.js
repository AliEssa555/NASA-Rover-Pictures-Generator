const axios = require('axios');
const fs = require('fs');
const path = require('path');

class NasaService {
    constructor() {
        this.baseURL = 'https://api.nasa.gov/mars-photos/api/v1';
        this.apiKey = process.env.NASA_API_KEY || 'DEMO_KEY';
    }

    async fetchMarsPhotos(rover = 'curiosity', sol = 1000) {
        try {
            const response = await axios.get(
                `${this.baseURL}/rovers/${rover}/photos`,
                {
                    params: { sol, api_key: this.apiKey }
                }
            );
            return response.data;
        } catch (error) {
            throw new Error(`NASA API error: ${error.message}`);
        }
    }

    async fetchPhotosByRover(rover) {
        return this.fetchMarsPhotos(rover);
    }

    async downloadLatestImages() {
        const data = await this.fetchMarsPhotos();
        const downloadDir = './downloads';
        
        if (!fs.existsSync(downloadDir)) {
            fs.mkdirSync(downloadDir);
        }

        const downloadPromises = data.photos.slice(0, 5).map(async (photo, index) => {
            // Implementation for downloading images
            console.log(`Would download: ${photo.img_src}`);
            return photo.img_src;
        });

        return Promise.all(downloadPromises);
    }
}

module.exports = new NasaService();