const express = require('express');

const admins = require('../data/admins.json');

const router = express.Router();

router.get('/:id', (req, res) => {
  const adminId = req.params.id;
  const foundAdmin = admins.find((admin) => admin.id.toString() === adminId);
  if (foundAdmin) {
    res.send(foundAdmin);
  } else {
    res.send('Admin not found!');
  }
});

module.exports = router;
