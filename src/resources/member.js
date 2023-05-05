const express = require('express');
const members = require('../data/member.json');
const membersRouter = express.Router();
const fs = require('fs');

membersRouter.get('/', (req, res) => res.send(members));

membersRouter.get('/:id', (req, res) => {
  const memberId = req.params.id;
  const foundMember = members.find(
    (member) => member.id.toString() === memberId
  );
  if (foundMember) {
    res.send(foundMember);
  } else {
    res.send('User not found!');
  }
  console.log(foundMember);
});

membersRouter.post('/post', (req, res) => {
  const newMember = req.body;
  members.push(newMember);
  console.log(req.body);
  fs.writeFile(
    'src/data/member.json',
    JSON.stringify(members, null, 2),
    (error) => {
      if (error) {
        res.send('User cant be created, Error!');
      } else {
        res.send('User created!');
      }
    }
  );
  console.log(members);
});

module.exports = membersRouter;
