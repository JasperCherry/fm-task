const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const imagesRouter = require('./routes/images');
const { setupLogic } = require('./setupLogic');
const { config } = require('./config');


const app = express();


app.use(cors({
    origin: '*', // allow this origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // allowed methods
    credentials: true, // allow credentials (cookies, authorization headers, etc.)
    optionsSuccessStatus: 204 // some legacy browsers (IE11, various SmartTVs) choke on 204
}));
app.use(express.json());
app.use('/uploads', express.static(config.uploadsFolder));
app.use('/images', imagesRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.listen(3000, async () => {
    await setupLogic();
    console.log('Server running at http://localhost:3000');
    console.log('API Docs available at http://localhost:3000/api-docs');
});
