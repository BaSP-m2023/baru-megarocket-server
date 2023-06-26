const express = require('express');
const memberController = require('../controllers/member');
const validator = require('../validations/members');
const { default: verifyToken } = require('../middlewares/authMiddleware');

const memberRouter = express.Router();

memberRouter
  .get('/', verifyToken, memberController.getAllMembers)
  .get('/:id', verifyToken, memberController.getMemberById)
  .post('/', validator.validateMember, memberController.createMember)
  .delete('/:id', verifyToken, memberController.deleteMember)
  .put('/:id', verifyToken, validator.validateMemberUpdate, memberController.updateMember);

module.exports = memberRouter;
