const subscription = require('../models/subscription');

const createSubs = (req, res) => {
  const {
    className, members, date, id,
  } = req.body;
  subscription.create({
    className, members, date, id,
  }).then((result) => res.status(201).json(result))
    .catch((error) => res.status(400).json({ message: 'Invalid request: incorrect parameters provided!', error }));
};

const deleteSubs = (req, res) => {
  const { id } = req.params;
  subscription.findByIdAndDelete(id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          msg: `Member with ${id} not found`,
        });
      }
      return res.status(200).json({
        message: 'User deleted',
      });
    })
    .catch((error) => res.status(400).json({ message: 'Invalid request: incorrect parameters provided!', error }));
};

module.exports = {
  createSubs,
  deleteSubs,
};
