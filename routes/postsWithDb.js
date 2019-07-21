const express = require('express');
const router = express.Router();

// Ideally we should read using require because require will cache the file
// and no read for each call, but the file is read here for every request do do a demo
//
// const posts = require('../resources/posts.json');
module.exports = function(db) {
    return router.get('/', async (req, res) => {
        // for async middleware to handle error, use async await
        data = await db.one('select post from public.posts');
        res.send(JSON.parse(data.post));
    });
}