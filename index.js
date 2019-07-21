const winston = require('winston');

//winston.configure({transports: [new winston.transports.File({ filename: 'logfile.log' }) ]});
winston.configure({ transports: [new winston.transports.Console({ format: winston.format.simple() })] });

// index.js is supposed to do only orchestration
// i.e. it will call only top level functions
// create separate modules for all low-level code

// Use "const" for variables that are not going to be reassigned
// Otherwise use "let"
// jslint will throw error if we reassign "const" variables by mistake
const express = require('express');

const db = require('./startup/dbInitializer')();
const app = express();


// This will serve the static content from the public folder
app.use(express.static('public'));

// This is going to manage our app configurations for different environments
// refer to the configuration files in "/config" folder
// configurations in "default.json" will be applied to all environments
// However, configurations in "default.json" can be overridden by configurations in environment specific files
const config = require('config');

require('./startup/infra')(app);
require('./startup/routes')(app, db);

const port = process.env.PORT || 3000;

// Refer to config/default.json
const appName = config.get('app_name');

const server = app.listen(port, () => winston.info(`${appName} Listening on port ${port}...`));

module.exports = server;
