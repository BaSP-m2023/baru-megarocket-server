const express = require('express');
const fs = require('fs');

const superAdminRouter = express.Router();
const superAdmins = require('../data/super-admins.json');

superAdminRouter.get('/', (req, res) => res.json(superAdmins));

superAdminRouter.get('/find/:id', (req, res) => {
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
        res.status(400).json({ msg: 'Error the Super Admin cannot be deleted' });
      } else {
        res.status(200).json({ msg: 'Super Admin Deleted', newSuperAdmins });
      }
    });
  } else {
    res.status(400).json({ msg: `Super Admin with id of ${req.params.id} not found` });
  }
});

superAdminRouter.post('/', (req, res) => {
  const reqSuperAdmin = req.body;
  const maxId = superAdmins.reduce((prev, act) => {
    if (prev.id > act.id) {
      return prev.id;
    }
    return act.id;
  });
  const newSuperAdmin = {
    id: maxId + 1,
    first_name: reqSuperAdmin.first_name,
    last_name: reqSuperAdmin.last_name,
    email: reqSuperAdmin.email,
    password: reqSuperAdmin.password,
  };
  const errorMsg = [];
  Object.keys(newSuperAdmin).map((x) => {
    if (!newSuperAdmin[x]) {
      errorMsg.push({ msg: 'This field is required', param: `${x}` });
    }
    return x;
  });
  if (errorMsg.length === 0) {
    superAdmins.push(newSuperAdmin);
    fs.writeFile('src/data/super-admins.json', JSON.stringify(superAdmins, null, 2), (error) => {
      if (error) {
        res.status(400).json({ msg: 'Error the Super Admin can not be created' });
      } else {
        res.status(200).json({ msg: 'New Super Admin created', superAdmins });
      }
    });
  } else {
    res.status(400).json(errorMsg);
  }
});

superAdminRouter.put('/:id', (req, res) => {
  const searchId = superAdmins.some((superAdmin) => superAdmin.id.toString() === req.params.id);
  const reqSuperAdmin = req.body;
  if (searchId) {
    const editList = [...superAdmins];
    const iObj = editList.findIndex((obj) => obj.id.toString() === req.params.id);
    editList[iObj] = {
      id: editList[iObj].id,
      first_name: reqSuperAdmin.first_name ? reqSuperAdmin.first_name : editList[iObj].first_name,
      last_name: reqSuperAdmin.last_name ? reqSuperAdmin.last_name : editList[iObj].last_name,
      email: reqSuperAdmin.email ? reqSuperAdmin.email : editList[iObj].email,
      password: reqSuperAdmin.password ? reqSuperAdmin.password : editList[iObj].password,
    };
    const editedSupAd = editList[iObj];
    fs.writeFile('src/data/super-admins.json', JSON.stringify(editList, null, 2), (error) => {
      if (error) {
        res.status(400).json({ msg: 'Error the Super Admin can not be created' });
      } else {
        res.status(200).json({ msg: 'Super Admin updated', editedSupAd, editList });
      }
    });
  } else {
    res.status(400).json({ msg: `Super Admin with id of ${req.params.id} not found` });
  }
});

superAdminRouter.get('/search', (req, res) => {
  const searchParams = req.query;
  const errorSearch = [];
  if (Object.keys(searchParams).length > 1) {
    errorSearch.push({ msg: 'You can only search one param' });
  }
  if (Object.values(searchParams).length === 1 && !Object.values(searchParams)[0]) {
    errorSearch.push({ msg: 'You must provide a value to search' });
  }
  if (searchParams.password) {
    errorSearch.push({ msg: 'You cannot search by password' });
  }
  const searchValue = Object.values(searchParams)[0].toString().toLowerCase();
  const searchKey = Object.keys(searchParams)[0];
  const superAdminFound = superAdmins.filter(
    (superAdmin) => superAdmin[searchKey].toString().toLowerCase().indexOf(searchValue) !== -1,
  );
  if (superAdminFound.length === 0) {
    errorSearch.push({ msg: 'Super Admin Not found' });
  }
  if (errorSearch.length === 0) {
    res.json(superAdminFound);
  } else {
    res.status(400).json(errorSearch);
  }
});
module.exports = superAdminRouter;
