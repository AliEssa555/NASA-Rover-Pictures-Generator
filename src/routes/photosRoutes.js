const express = require('express');
const router = express.Router();
const photosController = require('../controllers/photosController');

router.get('/', photosController.getPhotos);
router.get('/download', photosController.downloadImages);
router.get('/:rover', photosController.getPhotosByRover);

module.exports = router;