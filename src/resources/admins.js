const express = require('express');

const fs = require('fs');

const admins = require('../data/admins.json');

const adminRouter = express.Router();

adminRouter.get('/:id', (req, res) => {
  const adminId = req.params.id;
  const foundAdmin = admins.find((admin) => admin.id.toString() === adminId);
  if (foundAdmin) {
    res.send(foundAdmin);
  } else {
    res.send('Admin not found!');
  }
});

adminRouter.delete('/:id', (req, res) => {
  const adminId = req.params.id;
  const filterAdmins = admins.filter((admin) => admin.id.toString() !== adminId);
  fs.writeFile('./src/data/admins.json', JSON.stringify(filterAdmins, null, 2), (err) => {
    if (err) {
      res.send('Error! Admin not be deleted!');
    } else {
      res.send('Admin deleted!');
    }
  });
});

module.exports = adminRouter;
