const express = require('express');
const adminsController = require('../controllers/admins');
const validations = require('../validations/admins');

const adminsRouter = express.Router();

adminsRouter
  .get('/', adminsController.getAllAdmins)
  .get('/:id', adminsController.getAdminById)
  .put('/:id', adminsController.updateAdmin)
  .post('/', validations.validateCreation, adminsController.createAdmin)
  .delete('/:id', adminsController.deleteAdmin);

module.exports = adminsRouter;
