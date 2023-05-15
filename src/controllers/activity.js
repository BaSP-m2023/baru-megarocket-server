const Activity = require('../models/Activity');

const createActivity = (req, res) => {
  const { name, description, isActive } = req.body;

  Activity.create({
    name,
    description,
    isActive,
  })
    .then((result) => res.status(201).json(result))
    .catch((error) => res.status(400).json({
      message: 'Invalid Request: Incorrect parameters provided.',
      error,
    }));
};

const deleteActivity = (req, res) => {
  const { id } = req.params;

  Activity.findByIdAndDelete(id)
    .then((result) => {
      if (!result) {
        return res.status(400).json({
          msg: `Activity with id ${id} was not found`,
        });
      }
      return res.status(200).json({
        message: 'Activity deleted!',
      });
    })
    .catch((error) => res.status(400).json({
      message: 'An error ocurred!',
      error,
    }));
};

module.exports = {
  createActivity,
  deleteActivity,
};
