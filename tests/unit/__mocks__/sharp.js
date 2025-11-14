module.exports = jest.fn(() => ({
    metadata: jest.fn().mockResolvedValue({ width: 800, height: 600 }),
    resize: jest.fn().mockReturnThis(),
    toFile: jest.fn().mockResolvedValue({})
}));
