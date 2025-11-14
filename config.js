const config = { 
    corsOptions: {
        origin: '*', // Allow this origin
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed methods
        credentials: true, // Allow credentials (cookies, authorization headers, etc.)
        optionsSuccessStatus: 204 // Some legacy browsers (IE11, various SmartTVs) choke on 204
    },
    serverPort: process.env.PORT || 3000,
    uploadsFolder: 'uploads',
    tempUploadsFolder: 'temp_uploads',
};


module.exports = { config };