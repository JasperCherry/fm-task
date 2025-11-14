const fs = require("fs");
const db = require('./db.js');


const setupLogic = () => {
    // ensure folders exist
    if (!fs.existsSync("uploads")) fs.mkdirSync("uploads");
    if (!fs.existsSync("temp_uploads")) fs.mkdirSync("temp_uploads");

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
}


module.exports = {
  setupLogic,
};
