const express = require('express');

const superAdminRouter = express.Router();
const superAdmins = require('../data/super-admins.json');

superAdminRouter.get('/', (req, res) => res.json(superAdmins));

superAdminRouter.get('/:id', (req, res) => {
  const searchId = superAdmins.some((superAdmin) => superAdmin.id.toString() === req.params.id);
  if (searchId) {
    res.json(superAdmins.filter((superAdmin) => superAdmin.id.toString() === req.params.id));
  } else {
    res.status(400).json({ msg: `Super Admin with id of ${req.params.id} not found` });
  }
});

module.exports = superAdminRouter;
