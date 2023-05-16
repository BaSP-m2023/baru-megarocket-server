const express = require('express');

const router = express.Router();

const trainers = require('./trainer');
const members = require('./members');
const admins = require('./admins');
const activity = require('./activity');
const classes = require('./class');

router.use('/trainer', trainers);
router.use('/member', members);
router.use('/admins', admins);
router.use('/activity', activity);
router.use('/class', classes);

module.exports = router;
