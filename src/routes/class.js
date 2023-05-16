const express = require('express');
const classController = require('../controllers/class');
const validations = require('../validations/class');

const classRouter = express.Router();

classRouter
  .get('/search', classController.getAllClass)
  .get('/:id', classController.getClassById)
  .post('/', validations.validateCreation, classController.createClass)
  .put('/:id', validations.validateUpdate, classController.updateClass)
  .put('/assign/trainer/:id', validations.validateAssignTrainer, classController.assignTrainer)
  .put('/assign/activity/:id', validations.validateAssignActivity, classController.assignActivity)
  .put('/delete/:id', classController.deleteClass);

module.exports = classRouter;
