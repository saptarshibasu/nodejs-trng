// This will gzip our api response improving performance
const compression = require('compression');

// This will add certain common security HTTP headers to our responses
const helmet = require('helmet');

module.exports = function (app) {

    // To add security headers to HTTP responses
    app.use(helmet());
    // To gzip our responses
    app.use(compression());
}

