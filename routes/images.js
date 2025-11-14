const express = require('express');
const multer = require('multer');
const router = express.Router();
const {
    processAndStoreImage,
    listImages,
    getImage,
} = require('../services/imageService');
const { config } = require('../config');


const upload = multer({ dest: `${config.tempUploadsFolder}/` });


router.post('/', upload.single('image'), async (req, res) => {
    try {
        const result = await processAndStoreImage(req.file, req.body);
        res.json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


router.get('/', (req, res) => {
    const data = listImages(req.query);
    res.json(data);
});


router.get('/:id', (req, res) => {
    const image = getImage(req.params.id);

    if (!image) {
        return res.status(404).json({ error: 'image not found' });
    }

    res.json(image);
});


module.exports = router;
