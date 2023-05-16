const express = require('express');

const router = express.Router();

const trainers = require('./trainer');
const members = require('./members');
const admins = require('./admins');
const activity = require('./activity');
const classes = require('./class');
const subscriptions = require('./subscription');

router.use('/trainer', trainers);
router.use('/member', members);
router.use('/admins', admins);
router.use('/activity', activity);
router.use('/class', classes);
router.use('/subscription', subscriptions);

module.exports = router;
