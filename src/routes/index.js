const express = require('express');

const router = express.Router();
const members = require('./members');

router.use('/members', members);

module.exports = router;
