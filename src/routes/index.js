const express = require('express');

const router = express.Router();
const members = require('./members');
const superAdmins = require('./super-admins');
const trainers = require('./trainer');
const admins = require('./admins');
const activity = require('./activity');
const classes = require('./class');
const subscriptions = require('./subscription');

router.use('/trainer', trainers);
router.use('/admins', admins);
router.use('/activity', activity);
router.use('/class', classes);
router.use('/members', members);
router.use('/super-admins', superAdmins);
router.use('/subscription', subscriptions);

module.exports = router;
