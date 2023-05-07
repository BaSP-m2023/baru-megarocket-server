const express = require('express');
const fs = require('fs');

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

superAdminRouter.delete('/:id', (req, res) => {
  const searchId = superAdmins.some((superAdmin) => superAdmin.id.toString() === req.params.id);
  if (searchId) {
    const newSuperAdmins = superAdmins.filter(
      (superAdmin) => superAdmin.id.toString() !== req.params.id,
    );
    fs.writeFile('src/data/super-admins.json', JSON.stringify(newSuperAdmins, null, 2), (error) => {
      if (error) {
        res.status(400).json({ msg: 'Error the Super Admin can not be deleted' });
      } else {
        res.status(200).json({ msg: 'Super Admin Deleted', newSuperAdmins });
      }
    });
  } else {
    res.status(400).json({ msg: `Super Admin with id of ${req.params.id} not found` });
  }
});

module.exports = superAdminRouter;
