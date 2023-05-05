const express = require('express');

const membersRouter = express.Router();

const members = require('../data/member.json');

membersRouter.get('/', (req, res) => res.send(members));

membersRouter.get('/:id', (req, res) => {
  const memberId = req.params.id;
  const foundMember = members.find(member => member.id.toString() === memberId);
  (foundMember) ? res.send(foundMember) : res.send('Member not found');
});



module.exports = membersRouter;