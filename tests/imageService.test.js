jest.mock('better-sqlite3');
jest.mock('sharp');
jest.mock('fs');


const fs = require('fs');
const sharp = require('sharp');


const db = require('../db');


const {
    processAndStoreImage,
    listImages,
    getImage,
} = require('../services/imageService');

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
                resize: () => ({ toFile: toFileMock }),
                toFile: toFileMock
            });

            db.prepare.mockReturnValue({
                run: () => ({ lastInsertRowid: 1 })
            });

            const result = await processAndStoreImage(mockFile, {
                title: 'MyImg',
                width: 200,
                height: 100
            });

            expect(fs.unlinkSync).toHaveBeenCalledWith('/tmp/test.png');
            expect(toFileMock).toHaveBeenCalled();

            expect(result.id).toBe(1);
            expect(result.title).toBe('MyImg');
            expect(result.width).toBe(200);
            expect(result.height).toBe(100);
            expect(result.url).toContain('/uploads/');
        });
    });

    describe('listImages', () => {
        it('returns paginated results', () => {
            db.prepare.mockReturnValue({
                all: () => [{ id: 5 }]
            });

            const res = listImages({ page: 2, limit: 3 });

            expect(res).toEqual({
                page: 2,
                limit: 3,
                results: [{ id: 5 }]
            });
        });
    });

    describe('getImage', () => {
        it('returns single image', () => {
            db.prepare.mockReturnValue({
                get: () => ({ id: 77 })
            });

            const res = getImage(77);

            expect(res).toEqual({ id: 77 });
        });
    });
});
