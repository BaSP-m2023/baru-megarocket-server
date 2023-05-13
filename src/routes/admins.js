const express = require('express');
const adminsController = require('../controllers/admins');
const validations = require('../validations/admins');

const adminsRouter = express.Router();

adminsRouter
  .post('/', validations.validateCreation, adminsController.createAdmin)
  .delete('/:id', adminsController.deleteAdmin);

module.exports = adminsRouter;
