const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');

// Logger configurations
const bunyan = require('bunyan');
global.log = bunyan.createLogger({ name: 'sample-auth-service' });

// All configurations loaded to global
global.config = require('./config');

// Environment
global.ENV = require('./config').ENV;

const routes = require('./routes');

// Express app init
const app = express();

// Connect to MongoDB
(async () => {
    try {
        const db = await mongoose.connect(global.config.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB');
    } catch (err) {
        global.log.info(
            `Database connection error: , ${JSON.stringify(err)}`
        );
    }
})();

/**
 * Middlewares
 */
// Default Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Dev Middlewares
if (global.ENV === 'dev') {
    app.use(require('morgan')('dev'));
}

// Prod Middlewares
if (global.ENV === 'prod') {
    app.use(require('helmet')());
    app.use(require('compression')());
}

// Register all routes
routes(app);

// Celebrate request validation middleware
// This must added after routes middlewares
app.use(errors());

module.exports = app;