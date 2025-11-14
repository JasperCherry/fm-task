const swaggerJsdoc = require('swagger-jsdoc');
const { config } = require('./config');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Image Management API',
            version: '1.0.0',
            description: 'API for uploading, listing, and retrieving images with resizing and filtering capabilities.',
        },
        servers: [
            {
                url: `http://localhost:${config.port || 3000}`,
                description: 'Development Server',
            },
        ],
    },
    apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;