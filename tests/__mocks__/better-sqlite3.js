const runMock = jest.fn(() => ({ lastInsertRowid: 1 }));
const allMock = jest.fn(() => []);
const getMock = jest.fn(() => null);


class MockStatement {
    run = runMock;
    all = allMock;
    get = getMock;
}


class MockDatabase {
    prepare = jest.fn(() => new MockStatement());
}


module.exports = MockDatabase;
