const express = require('express');
const path = require('path');
const cons = require('consolidate');
const dust = require('dustjs-helpers')
const methodOverride = require('method-override');
const morgan = require('morgan');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const cors = require('cors');
const hpp = require('hpp');
const compression = require('compression');

const AppError = require('../utils/appError');
const globalErrorHandler = require('../controller/errorController');
const recipeRoute = require('../routes/recipe');
const viewRoute = require('../routes/view');
const index = require('../routes/index');

module.exports = app => {

    // Implement cors
    app.use(cors());

    // Access-Control-Allow-Origin
    app.options('*', cors());

    // Assign Dust Engine To .dust Files
    app.engine('dust', cons.dust);

    // Set Default Ext .dust
    app.set('view engine', 'dust');
    app.set('views', path.join(`${__dirname}/../views`));

    // Set security http headers
    app.use(helmet());

    // Set Public Folder
    app.use(express.static(path.join(`${__dirname}/../public`)));

    // Body Parser Middleware
    app.use(express.json({ limit: '10kb' }));
    app.use(express.urlencoded({ extended: true, limit: '10kb' }));

    // Set security http headers
    app.use(helmet());

    // Development logging
    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    }

    // Method Override Middleware
    app.use(methodOverride('_method'));

    // Data sanitization against NoSQL query injection
    app.use(mongoSanitize());

    // Data sanitization against XSS
    app.use(xss());

    // Prevent parameter pollution
    app.use(hpp({
        whitelist: [
            'name',
            'ingredients',
            'directions'
        ]
    }));

    app.use(compression());

    // Test middleware
    app.use((req, res, next) => {
        req.requestTime = new Date().toISOString();
        next();
    });

    app.use('/', viewRoute);
    // app.use('/', index);
    app.use('/api/v1/recipes', recipeRoute);

    app.all('*', (req, res, next) => {
        next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
    });

    app.use(globalErrorHandler);
};