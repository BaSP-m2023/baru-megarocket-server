const express = require('express');

const router = express.Router();
const members = require('./members');

router.use('/member', members);

module.exports = router;
