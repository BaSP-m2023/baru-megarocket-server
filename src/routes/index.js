const express = require('express');

const router = express.Router();
const members = require('./members');
const admins = require('./admins');
const classes = require('./class');

router.use('/members', members);
router.use('/admins', admins);
router.use('/class', classes);

module.exports = router;
