const express = require('express');
const adminsController = require('../controllers/admins');
const validations = require('../validations/admins');

const adminsRouter = express.Router();

adminsRouter
  .get('/', adminsController.getAllAdmins)
  .get('/:id', adminsController.getAdminById)
  .put('/:id', adminsController.updateAdmin)
  .put('/recoverAdmin/:id', adminsController.recoverAdmin)
  .post('/', validations.validateCreation, adminsController.createAdmin)
  .delete('/delete/:id', adminsController.deleteAdmin)
  .delete('/cleanAdmins', adminsController.cleanAdmins);

module.exports = adminsRouter;
