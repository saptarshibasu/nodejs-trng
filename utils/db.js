const winston = require('winston');

module.exports = function(connectionObject, options) {
    const pgp = require('pg-promise')(options);
    winston.info('Initializing db pool');
    return pgp(connectionObject);
}