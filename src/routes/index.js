const express = require('express');

const router = express.Router();

const trainers = require('./trainer');
const members = require('./members');
const admins = require('./admins');
const classes = require('./class');

router.use('/trainer', trainers);
router.use('/member', members);
router.use('/admins', admins);
router.use('/class', classes);

module.exports = router;
