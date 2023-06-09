const express = require('express');
const classController = require('../controllers/class');
const validations = require('../validations/class');

const classRouter = express.Router();

classRouter
  .get('/search', classController.getAllClass)
  .get('/:id', classController.getClassById)
  .post('/', validations.validateCreation, classController.createClass)
  .put('/:id', validations.validateUpdate, classController.updateClass)
  .delete('/delete/:id', classController.deleteClass);

module.exports = classRouter;
