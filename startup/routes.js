// In our code the error handling middleware is in middleware/error.js
require('express-async-errors');
const express = require('express');

const posts = require('../routes/posts');
const postsThatThrowError = require('../routes/postsThatThrowError');
const postsWithDb = require('../routes/postsWithDb');
const error = require('../middleware/error');

module.exports = function(app, db) {
    app.use(express.json());
    // This will make the apis defined in ./routes/posts vailable at /api/posts
    app.use('/api/posts', posts);
    app.use('/api/postsThatThrowError', postsThatThrowError);
    app.use('/api/postsWithDb', postsWithDb(db));
    
    // This has to be the last middleware
    app.use(error);
}