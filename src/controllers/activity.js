const Activity = require('../models/Activity');

const getAllActivity = (req, res) => {
  Activity.find()
    .then((activity) => res.status(200).json(
      activity,
    ))
    .catch((error) => {
      res.status(500).json({
        message: 'An error ocurred!',
        error,
      });
    });
};

const getActivityById = (req, res) => {
  const { id } = req.params;

  Activity.findById(id, 'name')
    .then((activity) => res.status(200).json({
      message: `Activity found! it was ${activity.name}`,
      data: activity,
      error: false,
    }))
    .catch((error) => res.json({
      message: 'An error ocurred',
      error,
    }));
};

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
        return res.status(400).json({
          message: `Activity with id: ${id} was not found`,
        });
      }
      return res.status(200).json(activity);
    })
    .catch((error) => {
      res.status(400).json(error);
    });
};

module.exports = {
  getAllActivity,
  getActivityById,
  updateActivity,
};
