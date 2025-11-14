const fs = require('fs');
const db = require('./db.js');
const { config } = require('./config');


const setupLogic = () => {
    // ensure folders exist
    if (!fs.existsSync(config.uploadsFolder)) fs.mkdirSync(config.uploadsFolder);
    if (!fs.existsSync(config.tempUploadsFolder)) fs.mkdirSync(config.tempUploadsFolder);

    // prepare sqllite table
    db.prepare(`
    CREATE TABLE IF NOT EXISTS images (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        url TEXT,
        width INTEGER,
        height INTEGER
    )
    `).run();
};


module.exports = {
    setupLogic,
};
