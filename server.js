const express = require('express');
const cors = require('cors');
const imagesRouter = require('./routes/images');
const { setupLogic } = require('./setupLogic');


const app = express();


app.use(cors({
    origin: '*', // allow this origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // allowed methods
    credentials: true, // allow credentials (cookies, authorization headers, etc.)
    optionsSuccessStatus: 204 // some legacy browsers (IE11, various SmartTVs) choke on 204
}));
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use('/images', imagesRouter);


app.listen(3000, async () => {
    await setupLogic();
    console.log('Server running at http://localhost:3000');
});
