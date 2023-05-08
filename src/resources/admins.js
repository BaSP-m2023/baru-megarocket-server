const express = require('express');

const fs = require('fs');

const admins = require('../data/admins.json');

const router = express.Router();

router.get('/:id', (req, res) => {
  const adminId = req.params.id;
  const foundAdmin = admins.find((admin) => admin.id.toString() === adminId);
  if (foundAdmin) {
    res.send(foundAdmin);
  } else {
    res.send('Admin not found!');
  }
});

router.post('/', (req, res) => {
  const newAdmin = req.body;

  if (!newAdmin || !newAdmin.name || !newAdmin.lastName
      || !newAdmin.email || !newAdmin.password) {
    res.status(400).send('Missing parameters in request body');
    return;
  }

  // agregar validacion de id !!!

  admins.push(newAdmin);

  fs.writeFile('src/data/admins.json', JSON.stringify(admins, null, 2), (err) => {
    if (err) {
      res.status(500).send('Admin creation failed');
      return;
    }
    res.status(201).send('Admin created successfully');
  });
});

router.put('/:id', (req, res) => {
  const adminId = req.params.id;
  const updateAdmin = req.body;

  const adminIndex = admins.findIndex((admin) => admin.id.toString() === adminId);

  if (adminIndex === -1) {
    res.status(404).send('Admin not found');
  }
  if (!updateAdmin) {
    res.status(400).send('Can not be Empty!');
    return;
  }
  admins[adminIndex] = {
    id: adminId,
    name: req.body.name || admins[adminIndex].name,
    lastName: req.body.lastName || admins[adminIndex].lastName,
    email: req.body.email || admins[adminIndex].email,
    password: req.body.password || admins[adminIndex].password,
  };

  fs.writeFile('src/data/admins.json', JSON.stringify(admins, null, 2), (err) => {
    if (err) {
      res.send('Admin with I update unsuccessful');
    } else {
      res.send('Admin updated successfully');
    }
  });
});

module.exports = router;
