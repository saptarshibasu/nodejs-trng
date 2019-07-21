const Promise = require('bluebird')
const dbConnectionFactory = require('../utils/db');
const config = require('config');

const dbConnOptions = {
    promiseLib: Promise
};

const dbConnObject = {
    host: config.get('db_host'),
    port: config.get('db_port'),
    database: config.get('database'),
    user: config.get('db_user'),
    password: config.get('db_password'),
    max: config.get('max_connection'),
    min: config.get('min_connection')
};

module.exports = function() {
    return dbConnectionFactory(dbConnObject, dbConnOptions);
}