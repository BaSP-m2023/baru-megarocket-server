const express = require('express');

const fs = require('fs');

const admins = require('../data/admins.json');

const adminRouter = express.Router();

adminRouter.get('/', (req, res) => {
  res.send(admins);
});

adminRouter.get('/:id', (req, res) => {
  const adminId = req.params.id;
  const foundAdmin = admins.find((admin) => admin.id.toString() === adminId);
  if (foundAdmin) {
    res.send(foundAdmin);
  } else {
    res.send('Admin not found!');
  }
});

adminRouter.post('/', (req, res) => {
  const ids = admins.map((admin) => admin.id.toString());
  const newId = Math.max(...ids) + 1;
  const newAdmin = {
    id: newId,
    name: req.body.name,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  };

  if (!newAdmin.name || !newAdmin.lastName
      || !newAdmin.email || !newAdmin.password) {
    res.status(400).send('Missing parameters in request body');
  }

  admins.push(newAdmin);

  fs.writeFile('src/data/admins.json', JSON.stringify(admins, null, 2), (err) => {
    if (err) {
      res.status(500).send('Admin creation failed');
      return false;
    }
    res.status(201).send('Admin created successfully');
    return true;
  });
});

adminRouter.put('/:id', (req, res) => {
  const adminId = req.params.id;
  const updateAdmin = {
    name: req.body.name,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  };

  const adminIndex = admins.findIndex((admin) => admin.id.toString() === adminId);

  if (adminIndex === -1) {
    res.status(404).send('Admin not found');
  }
  if (!updateAdmin.name && !updateAdmin.lastName && !updateAdmin.email && !updateAdmin.password) {
    res.status(400).send('At least one value must be modified');
  }
  admins[adminIndex] = {
    id: Math.floor(adminId),
    name: req.body.name || admins[adminIndex].name,
    lastName: req.body.lastName || admins[adminIndex].lastName,
    email: req.body.email || admins[adminIndex].email,
    password: req.body.password || admins[adminIndex].password,
  };

  fs.writeFile('src/data/admins.json', JSON.stringify(admins, null, 2), (err) => {
    if (err) {
      res.status(500).send(`Admin with ID ${adminId} update unsuccessful`);
    } else {
      res.status(200).send(`Admin with ID ${adminId} update successful`);
    }
  });
});

adminRouter.delete('/:id', (req, res) => {
  const adminId = req.params.id;
  const filterAdmins = admins.filter((admin) => admin.id.toString() !== adminId);
  fs.writeFile('src/data/admins.json', JSON.stringify(filterAdmins, null, 2), (err) => {
    if (err) {
      res.send('Error! Admin not be deleted!');
    } else {
      res.send('Admin deleted!');
    }
  });
});

adminRouter.get('/search/:filter', (req, res) => {
  const filterAdmins = req.params.filter;
  if (filterAdmins !== '/') {
    const found = admins.filter((element) => element.name === filterAdmins
      || element.lastName === filterAdmins
      || element.email === filterAdmins);
    if (found.length !== 0) {
      res.status(200).send({
        message: 'Admins found',
        admin: found,
      });
    } else {
      res.status(404).send({
        message: 'Admins not found',
      });
    }
  }
});

module.exports = adminRouter;
