const express = require('express');
const adminsController = require('../controllers/admins');

const adminsRouter = express.Router();

adminsRouter
  .get('/', adminsController.getAllAdmins)
  .get('/:id', adminsController.getAdminById)
  .put('/:id', adminsController.updateAdmin);

module.exports = adminsRouter;
