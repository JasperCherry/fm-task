const app = require('./app');
const { setupLogic } = require('./setupLogic');

app.listen(3000, async () => {
    await setupLogic();
    console.log('Server running on http://localhost:3000');
});