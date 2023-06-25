const express = require('express');

const subscriptions = require('./subscription');
const members = require('./member');
const superAdmins = require('./super-admins');
const trainers = require('./trainer');
const admins = require('./admins');
const activity = require('./activity');
const classes = require('./class');
const auth = require('./auth');

const router = express.Router();

router.use('/subscription', subscriptions);
router.use('/trainer', trainers);
router.use('/admins', admins);
router.use('/activities', activity);
router.use('/class', classes);
router.use('/member', members);
router.use('/super-admins', superAdmins);
router.use('/subscription', subscriptions);
router.use('/auth', auth);

module.exports = router;
