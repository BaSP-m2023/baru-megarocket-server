const express = require('express');

const router = express.Router();
const members = require('./members');
const classes = require('./class');

router.use('/members', members);
router.use('/class', classes);

module.exports = router;
