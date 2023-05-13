const express = require('express');
const memberController = require('../controllers/member');

const memberRouter = express.Router();

const middleWare = (req, res, next) => {
  next();
};

memberRouter
  .delete('/:id', middleWare, memberController.deleteMember)
  .put('/:id', memberController.updateMember);

module.exports = memberRouter;
