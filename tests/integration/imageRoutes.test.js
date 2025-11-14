// tests/integration/basic.integration.test.js
jest.unmock('sharp');
jest.unmock('fs');
jest.unmock('better-sqlite3');

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

describe('Basic integration test with sample image', () => {
    const tmpFolder = path.join(__dirname, '../../tmp'); // tmp folder in repo root
    const testImagePath = path.join(tmpFolder, 'test-image.png');

    beforeAll(async () => {
        // Ensure tmp folder exists
        if (!fs.existsSync(tmpFolder)) {
            fs.mkdirSync(tmpFolder, { recursive: true });
        }

        // Create a 100x100 red PNG image
        const buffer = await sharp({
            create: {
                width: 100,
                height: 100,
                channels: 4,
                background: { r: 255, g: 0, b: 0, alpha: 1 }
            }
        })
            .png()
            .toBuffer();

        fs.writeFileSync(testImagePath, buffer);
        console.log('Test image created at:', testImagePath);
    });

    afterAll(() => {
        // Clean up
        // if (fs.existsSync(testImagePath)) fs.unlinkSync(testImagePath);
        // if (fs.existsSync(tmpFolder) && fs.readdirSync(tmpFolder).length === 0) {
        //     fs.rmdirSync(tmpFolder);
        // }
    });

    it('creates a sample PNG image', () => {
        expect(fs.existsSync(testImagePath)).toBe(true);
    });

    it('dummy integration check', () => {
        expect(1 + 1).toBe(2);
    });
});
