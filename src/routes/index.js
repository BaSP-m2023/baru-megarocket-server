const express = require('express');
const subscriptions = require('./subscription');
const trainers = require('./trainer');
const members = require('./members');
const admins = require('./admins');
const activity = require('./activity');
const classes = require('./class');

const router = express.Router();

router.use('/subscription', subscriptions);
router.use('/trainer', trainers);
router.use('/member', members);
router.use('/admins', admins);
router.use('/activity', activity);
router.use('/class', classes);
router.use('/subscription', subscriptions);

router.use('/members', members);
router.use('/activity', activity);

module.exports = router;
