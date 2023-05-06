const express = require('express');

const membersRouter = express.Router();

// const fs = require('fs');
const members = require('../data/member.json');

membersRouter.get('/', (req, res) => res.send(members));

membersRouter.get('/:id', (req, res) => {
  const memberId = req.params.id;
  const foundMember = members.find((member) => member.id.toString() === memberId);
  return foundMember ? res.send(foundMember) : res.send('Member not found');
});

module.exports = membersRouter;
// ------------------------------------------------------------------------------

// membersRouter.delete('/:id', (req, res) => {
// const memberId = req.id;
// const filteredMembers = members.filter((member) => member.id.toString() !== memberId);
// fs.writeFile('./src/data/member.json', JSON.stringify(filteredMembers, null, 2), (err) => {
// (err) ? res.send('Error!. Member cannot be deleted') : res.send('Member deleted');
// });
// });
