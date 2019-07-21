const P = require('bluebird');
const fs = P.promisifyAll(require('fs'));
const express = require('express');
const router = express.Router();

// Ideally we should read using require because require will cache the file
// and no read for each call, but the file is read here for every request do do a demo
//
// const posts = require('../resources/posts.json');

router.get('/', async (req, res) => {
    let posts = await fs.readFileAsync('resources/posts.json')
    res.send(JSON.parse(posts));
});

module.exports = router;