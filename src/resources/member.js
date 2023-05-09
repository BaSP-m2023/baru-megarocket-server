const express = require('express');
const fs = require('fs');

const membersRouter = express.Router();

const members = require('../data/member.json');

membersRouter.get('/', (req, res) => res.send(members));

membersRouter.get('/search/:filter', (req, res) => {
  const filterParam = req.params.filter;

  if (filterParam !== '/') {
    const found = members.filter((element) => element.name === filterParam
        || element.last_name === filterParam
        || element.phone === filterParam
        || element.subscription === filterParam
        || element.email === filterParam);

    if (found.length !== 0) {
      res.send({
        msg: `Getting all Members with ${filterParam}`,
        member: found,
      });
    } else {
      res.status(404).send({
        msg: `Member with ${filterParam} doesn't exists`,
      });
    }
  } else {
    res.send({
      msg: 'Getting all members',
      member: members,
    });
  }
});

membersRouter.get('/:id', (req, res) => {
  const memberId = req.params.id;
  const foundMember = members.find((member) => member.id.toString() === memberId);
  return foundMember ? res.send(foundMember) : res.status(400).send('Member not found');
});

membersRouter.post('/', (req, res) => {
  const newMember = req.body;
  if (newMember.id) {
    const lastmember = members.slice(-1)[0];
    if (newMember.id === lastmember.id) {
      res.status(400).send('Error!: member all ready created');
    } else {
      members.push(newMember);
      fs.writeFile('src/data/member.json', JSON.stringify(members, null, 2), (err) => {
        if (err) {
          res.status(400).send('Error!: member cannot be created');
        } else {
          res.send('Member created');
        }
      });
    }
  } else {
    res.status(400).send('Error!: member must have an Id');
  }
});

membersRouter.delete('/:id', (req, res) => {
  const memberId = req.params.id;
  const filteredMembers = members.filter((member) => member.id.toString() !== memberId);
  fs.writeFile('./src/data/member.json', JSON.stringify(filteredMembers, null, 2), (err) => {
    if (err) {
      res.status(400).send('Error!. Member cannot be deleted');
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
        res.status(400).send('Error');
      } else {
        res.send('Successfully edited!');
      }
    });
  } else {
    res.status(404).send('Member not found');
  }
});

module.exports = membersRouter;
