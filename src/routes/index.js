const express = require('express');

const router = express.Router();
const members = require('./members');
const admins = require('./admins');

router.use('/member', members);
router.use('/admins', admins);

module.exports = router;
