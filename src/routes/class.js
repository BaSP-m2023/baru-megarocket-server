const express = require('express');
const classController = require('../controllers/class');

const classRouter = express.Router();

const middleWare = (req, res, next) => {
  next();
};

classRouter
  .get('/search/:filter', classController.getAllClass)
  .get('/:id', classController.getClassById)
  .post('/', middleWare, classController.createClass);

module.exports = classRouter;
