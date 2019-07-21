const Promise = require('bluebird')
const dbConnectionFactory = require('../utils/db');

const dbConnOptions = {
    promiseLib: Promise
};

const dbConnObject = {
    host: 'localhost',
    port: 5432,
    database: 'postgres',
    user: 'postgres',
    password: 'admin',
    max: 10,
    min: 5
};

module.exports = function() {
    return dbConnectionFactory(dbConnObject, dbConnOptions);
}