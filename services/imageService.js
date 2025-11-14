const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const db = require('../db.js');
const { config } = require('../config');


const processAndStoreImage = async (file, { title, width, height }) => {
    if (!file) throw new Error('image file is required');

    const outputFilename = `img_${Date.now()}.jpg`;
    const outputPath = path.join(config.uploadsFolder, outputFilename);
    let imageWidth = width ? parseInt(width) : null;
    let imageHeight = height ? parseInt(height) : null;
    let imageProcessor = sharp(file.path);
    const metadata = await imageProcessor.metadata();

    if (!imageWidth) {
        imageWidth = metadata.width;
    }
    if (!imageHeight) {
        imageHeight = metadata.height;
    }

    if (width || height) {
        imageProcessor = imageProcessor.resize(width ? parseInt(width) : null, height ? parseInt(height) : null);
    }

    await imageProcessor.toFile(outputPath);
    fs.unlinkSync(file.path);

    const info = db
        .prepare(
            `
            INSERT INTO images (title, url, width, height)
            VALUES (?, ?, ?, ?)
            `
        )
        .run(title || null, `/${config.uploadsFolder}/${outputFilename}`, imageWidth, imageHeight);

    return {
        id: info.lastInsertRowid,
        title,
        url: `/${config.uploadsFolder}/${outputFilename}`,
        width: imageWidth,
        height: imageHeight,
    };
};


const listImages = ({ title, page = 1, limit = 10 }) => {
    const offset = (page - 1) * limit;

    let query = 'SELECT * FROM images WHERE 1=1';
    const params = [];

    if (title) {
        query += ' AND title LIKE ?';
        params.push(`%${title}%`);
    }

    query += ' LIMIT ? OFFSET ?';
    params.push(Number(limit), Number(offset));

    const rows = db.prepare(query).all(...params);

    return {
        page: Number(page),
        limit: Number(limit),
        results: rows,
    };
};


const getImage = (id) => {
    return db.prepare('SELECT * FROM images WHERE id = ?').get(id);
};


module.exports = {
    processAndStoreImage,
    listImages,
    getImage,
};
