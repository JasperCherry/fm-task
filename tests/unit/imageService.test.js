jest.mock('better-sqlite3');
jest.mock('sharp');
jest.mock('fs');

const fs = require('fs');
const sharp = require('sharp');
const db = require('../../db');
const { config } = require('../../config');

const {
    processAndStoreImage,
    listImages,
    getImage,
} = require('../../services/imageService');

describe('imageService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('processAndStoreImage', () => {
        it('throws if no file is provided', async () => {
            await expect(processAndStoreImage(null, {}))
                .rejects
                .toThrow('image file is required');
        });

        it('resizes, saves, deletes temp, inserts DB', async () => {
            const mockFile = { path: '/tmp/test.png' };
            const toFileMock = jest.fn().mockResolvedValue(true);

            sharp.mockReturnValue({
                metadata: jest.fn().mockResolvedValue({ width: 800, height: 600 }),
                resize: () => { return { toFile: toFileMock }; },
                toFile: toFileMock
            });

            db.prepare.mockReturnValue({
                run: () => ({ lastInsertRowid: 1 })
            });

            const result = await processAndStoreImage(mockFile, {
                title: 'test-image',
                width: 200,
                height: 100
            });

            expect(fs.unlinkSync).toHaveBeenCalledWith('/tmp/test.png');
            expect(toFileMock).toHaveBeenCalled();
            expect(result.id).toBe(1);
            expect(result.title).toBe('test-image');
            expect(result.width).toBe(200);
            expect(result.height).toBe(100);
            expect(result.url).toContain(config.uploadsFolder);
        });
    });

    describe('listImages', () => {
        it('returns paginated results', () => {
            const randomId = Math.floor(Math.random() * 1000);
            const page = Math.floor(Math.random() * 10) + 1;
            const limit = Math.floor(Math.random() * 10) + 1;

            db.prepare.mockReturnValue({
                all: () => [{ id: randomId }]
            });
            const res = listImages({ page, limit });

            expect(res).toEqual({
                page,
                limit,
                results: [{ id: randomId }]
            });
        });
    });

    describe('getImage', () => {
        it('returns single image', () => {
            const randomId = Math.floor(Math.random() * 1000);

            db.prepare.mockReturnValue({
                get: () => ({ id: randomId })
            });
            const res = getImage(randomId);

            expect(res).toEqual({ id: randomId });
        });
    });

});
