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

/**
 * @swagger
 * tags:
 *   - name: Images
 *     description: API for managing images (upload, list, retrieve)
 *
 * components:
 *   schemas:
 *     Image:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The unique ID of the image.
 *         url:
 *           type: string
 *           description: The URL path to access the image file.
 *         title:
 *           type: string
 *           description: The title given to the image.
 *         width:
 *           type: integer
 *           description: The final width of the stored image.
 *         height:
 *           type: integer
 *           description: The final height of the stored image.
 */

/**
 * @swagger
 * /images:
 *   post:
 *     summary: Upload, resize, and store a new image
 *     tags: [Images]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: The image file to upload.
 *               title:
 *                 type: string
 *                 description: The title of the image (e.g., "Sunset").
 *               width:
 *                 type: integer
 *                 description: Desired width for the resized image.
 *               height:
 *                 type: integer
 *                 description: Desired height for the resized image.
 *     responses:
 *       200:
 *         description: Image successfully processed and stored.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Image'
 *       400:
 *         description: Invalid input, missing file, or processing error.
 */
router.post('/', upload.single('image'), async (req, res) => {
    try {
        const result = await processAndStoreImage(req.file, req.body);
        res.json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

/**
 * @swagger
 * /images:
 *   get:
 *     summary: Retrieve a paginated list of images
 *     tags: [Images]
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: Filter images where the title contains this text.
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page.
 *     responses:
 *       200:
 *         description: A list of images and pagination info.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 page:
 *                   type: integer
 *                 limit:
 *                   type: integer
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Image'
 */
router.get('/', (req, res) => {
    const data = listImages(req.query);
    res.json(data);
});

/**
 * @swagger
 * /images/{id}:
 *   get:
 *     summary: Retrieve a single image object by ID
 *     tags: [Images]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The unique ID of the image.
 *     responses:
 *       200:
 *         description: The requested image object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Image'
 *       404:
 *         description: Image not found.
 */
router.get('/:id', (req, res) => {
    const image = getImage(req.params.id);

    if (!image) {
        return res.status(404).json({ error: 'image not found' });
    }

    res.json(image);
});

module.exports = router;
