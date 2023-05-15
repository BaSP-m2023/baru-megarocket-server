const express = require('express');

const router = express.Router();
const members = require('./members');
const superAdmins = require('./super-admins');
const trainers = require('./trainer');
const admins = require('./admins');
const classes = require('./class');

router.use('/trainer', trainers);
router.use('/member', members);
router.use('/admins', admins);
router.use('/class', classes);
router.use('/members', members);
router.use('/super-admins', superAdmins);
module.exports = router;
