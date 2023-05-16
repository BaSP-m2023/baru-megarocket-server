const Subscription = require('../models/Subscription');

const createSubs = (req, res) => {
  Subscription.create(
    req.body,
  ).then((result) => res.status(201).json(result))
    .catch((error) => res.status(400).json({ message: 'Invalid request: incorrect parameters provided!', error }));
};

const deleteSubs = (req, res) => {
  const { id } = req.params;
  Subscription.findByIdAndDelete(id)
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
