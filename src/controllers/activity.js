const activity = require('../models/activity');

const createActivity = (req, res) => {
  const { name, description, isActive } = req.body;

  activity.create({
    name,
    description,
    isActive,
  })
    .then((result) => res.status(201).json(result))
    .catch((error) => res.status(400).json({
      message: error,
      data: undefined,
      error: true,
    }));
};

const deleteActivity = (req, res) => {
  const { id } = req.params;

  activity.findByIdAndDelete(id)
    .then((result) => {
      if (!result) {
        return res.status(400).json({
          msg: `Activity with id ${id} was not found`,
          data: undefined,
          error: true,
        });
      }
      return res.status(200).json({
        message: 'Activity deleted!',
        data: activity,
        error: false,
      });
    })
    .catch((error) => res.status(400).json({
      message: 'An error ocurred!',
      data: undefined,
      error,
    }));
};

module.exports = {
  createActivity,
  deleteActivity,
};
