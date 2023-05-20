const express = require('express');
const memberController = require('../controllers/member');
const validator = require('../validations/members');

const memberRouter = express.Router();

memberRouter
  .get('/', memberController.getAllMembers)
  .get('/:id', memberController.getMemberById)
  .post('/', validator.validateMember, memberController.createMember)
  .delete('/:id', memberController.deleteMember)
  .put('/:id', validator.validateMemberUpdate, memberController.updateMember);

module.exports = memberRouter;
