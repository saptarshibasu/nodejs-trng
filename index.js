// index.js is supposed to do only orchestration
// i.e. it will call only top level functions
// create separate modules for all low-level code


// This will route any error throws from an api or middleware to the error handling middleware
// In our code the error handling middleware is in middleware/error.js
require('express-async-errors');
const winston = require('winston');
// Use "const" for variables that are not going to be reassigned
// Otherwise use "let"
// jslint will throw error if we reassign "const" variables by mistake
const express = require('express');

// This is going to manage our app configurations for different environments
// refer to the configuration files in "/config" folder
// configurations in "default.json" will be applied to all environments
// However, configurations in "default.json" can be overridden by configurations in environment specific files
const config = require('config');

// This will gzip our api response improving performance
const compression = require('compression');

// This will add certain common security HTTP headers to our responses
const helmet = require('helmet');

const posts = require('./routes/posts');
const postsThatThrowError = require('./routes/postsThatThrowError');
const error = require('./middleware/error');

const app = express();

//winston.configure({transports: [new winston.transports.File({ filename: 'logfile.log' }) ]});
winston.configure({ transports: [new winston.transports.Console({ format: winston.format.simple() })] });

// To add security headers to HTTP responses
app.use(helmet());
// To gzip our responses
app.use(compression());

// This will serve the static content from the public folder
app.use(express.static('public'));

app.use(express.json());
// This will make the apis defined in ./routes/posts vailable at /api/posts
app.use('/api/posts', posts);
app.use('/api/postsThatThrowError', postsThatThrowError);

// This has to be the last middleware
app.use(error);

const port = process.env.PORT || 3000;

// Refer to config/default.json
const appName = config.get('app_name');

const server = app.listen(port, () => winston.info(`${appName} Listening on port ${port}...`));

module.exports = server;
