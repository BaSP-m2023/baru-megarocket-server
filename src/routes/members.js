const express = require('express');
const memberController = require('../controllers/member');
const validator = require('../validations/members');

const memberRouter = express.router();

const middleWare = (req, res, next) => {
  next();
};

memberRouter
  .get('/', memberController.getAllMembers)
  .get('/:id', memberController.getMemberById)
  .post('/', validator.validateMember, memberController.createMember)
  .delete('/:id', middleWare, memberController.deleteMember)
  .put('/:id', memberController.updateMember);

module.exports = memberRouter;
