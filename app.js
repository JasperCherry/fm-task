const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const imagesRouter = require('./routes/images');
const { config } = require('./config');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(config.uploadsFolder));
app.use('/images', imagesRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = app;