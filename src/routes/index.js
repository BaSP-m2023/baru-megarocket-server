const express = require('express');

const subscriptions = require('./subscription');
const members = require('./member');
const superAdmins = require('./super-admins');
const trainers = require('./trainer');
const admins = require('./admins');
const activity = require('./activity');
const classes = require('./class');
const auth = require('./auth');
const { default: verifyToken } = require('../middlewares/authMiddleware');

const router = express.Router();

router.use('/subscription', subscriptions);
router.use('/trainer', verifyToken, trainers);
router.use('/admins', verifyToken, admins);
router.use('/activities', activity);
router.use('/class', classes);
router.use('/member', verifyToken, members);
router.use('/super-admins', verifyToken, superAdmins);
router.use('/subscription', subscriptions);
router.use('/auth', verifyToken, auth);

module.exports = router;
