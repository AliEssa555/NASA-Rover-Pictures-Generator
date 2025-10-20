const nasaService = require('../services/nasaService');

exports.getPhotos = async (req, res) => {
    try {
        const photos = await nasaService.fetchMarsPhotos();
        res.json(photos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getPhotosByRover = async (req, res) => {
    try {
        const { rover } = req.params;
        const photos = await nasaService.fetchPhotosByRover(rover);
        res.json(photos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.downloadImages = async (req, res) => {
    try {
        const result = await nasaService.downloadLatestImages();
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};