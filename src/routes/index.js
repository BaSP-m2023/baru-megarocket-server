const express = require('express');

const router = express.Router();
const members = require('./members');
const superAdmins = require('./super-admins');

router.use('/members', members);
router.use('/super-admins', superAdmins);

module.exports = router;
