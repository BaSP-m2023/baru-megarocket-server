const express = require('express');
const fs = require('fs');

const membersRouter = express.Router();

const members = require('../data/member.json');

membersRouter.get('/', (req, res) => res.send(members));

membersRouter.get('/:id', (req, res) => {
  const memberId = req.params.id;
  const foundMember = members.find((member) => member.id.toString() === memberId);
  return foundMember ? res.send(foundMember) : res.send('Member not found');
});

membersRouter.post('/', (req, res) => {
  const newMember = req.body;
  if (newMember.id) {
    const lastmember = members.slice(-1)[0];
    if (newMember.id === lastmember.id) {
      res.send('Error!: member all ready created');
    } else {
      members.push(newMember);
      fs.writeFile('src/data/member.json', JSON.stringify(members, null, 2), (err) => {
        if (err) {
          res.send('Error!: member cannot be created');
        } else {
          res.send('Member created');
        }
      });
    }
  } else {
    res.send('Error!: member must have an Id');
  }
});

membersRouter.delete('/:id', (req, res) => {
  const memberId = req.params.id;
  const filteredMembers = members.filter((member) => member.id.toString() !== memberId);
  fs.writeFile('./src/data/member.json', JSON.stringify(filteredMembers, null, 2), (err) => {
    if (err) {
      res.send('Error!. Member cannot be deleted');
    } else {
      res.send('Member deleted');
    }
  });
});

membersRouter.put('/:id', (req, res) => {
  const memberId = req.params.id;
  const foundMember = members.find((member) => member.id.toString() === memberId);
  if (foundMember) {
    const newMemb = req.body;
    members.forEach((member, index) => {
      if (member.id.toString() === memberId) {
        members[index] = {
          ...member,
          email: newMemb.email ? newMemb.email : member.email,
          last_name: newMemb.last_name ? newMemb.last_name : member.last_name,
          name: newMemb.name ? newMemb.name : member.name,
          password: newMemb.password ? newMemb.password : member.password,
          phone: newMemb.phone ? newMemb.phone : member.phone,
          subscription: newMemb.subscription ? newMemb.subscription : member.subscription,
        };
      }
    });
    fs.writeFile('./src/data/member.json', JSON.stringify(members, null, 2), (err) => {
      if (err) {
        res.send('Error');
      } else {
        res.send('Successfully edited!');
      }
    });
  } else {
    res.send('Member not found');
  }
});

module.exports = membersRouter;
