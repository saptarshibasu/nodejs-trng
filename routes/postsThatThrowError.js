const P = require('bluebird');
const fs = P.promisifyAll(require('fs'));
const express = require('express');
const router = express.Router();

// Same as posts.js except
// Filename is wrong so that error is thrown and the centralized error handling in middleware is invoked
router.get('/', async (req, res) => {
    let posts = await fs.readFileAsync('resources/posts1.json')
    res.send(JSON.parse(posts));
});

module.exports = router;