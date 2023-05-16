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

<<<<<<< HEAD
  Activity.findById(id, 'name')
    .then((activity) => res.status(200).json({
      message: `Activity found! it was ${activity.name}`,
      data: activity,
      error: false,
    }))
    .catch((error) => res.status(404).json({
      message: 'An error ocurred',
=======
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
>>>>>>> master
      error,
    }));
};

<<<<<<< HEAD
const updateActivity = (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  Activity.findByIdAndUpdate(
    id,
    {
      name,
      description,
    },
    { new: true },
  )
    .then((activity) => {
      if (!activity) {
        return res.status(404).json({
          message: `Activity with id: ${id} was not found`,
        });
      }
      return res.status(201).json(activity);
    })
    .catch((error) => {
      res.status(400).json(error);
    });
};

=======
>>>>>>> master
module.exports = {
  createActivity,
  deleteActivity,
};
