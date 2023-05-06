const express = require('express');
const fs = require('fs');

const membersRouter = express.Router();

const fs = require('fs');
const members = require('../data/member.json');

membersRouter.get('/', (req, res) => res.send(members));

membersRouter.get('/:id', (req, res) => {
	const memberId = req.params.id;
	const foundMember = members.find((member) => member.id.toString() === memberId);
	return foundMember ? res.send(foundMember) : res.send('Member not found');
});

membersRouter.post('/', (req, res) => {
	const newMember = req.body;
	members.push(newMember);
	fs.writeFile('src/data/member.json', JSON.stringify(members, null, 2), (err) => {
		if (err) {
			res.send('Error!: member cannot be created');
		} else {
			res.send('Member created');
		}
	});
});

membersRouter.delete('/:id', (req, res) => {
	const memberId = req.id;
	const filteredMembers = members.filter((member) => member.id.toString() !== memberId);
	fs.writeFile('./src/data/member.json', JSON.stringify(filteredMembers, null, 2), (err) => {
		if (err) {
			res.send('Error!. Member cannot be deleted');
		} else {
			res.send('Member deleted');
		}
	});
});

module.exports = membersRouter;
