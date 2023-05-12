const express = require('express');

const router = express.router();
const members = require('./members');

router.use('/members', members);

module.exports = router;
