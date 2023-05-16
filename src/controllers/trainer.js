const Trainer = require('../models/Trainers');

const createTrainer = (req, res) => {
  const {
    firstName,
    lastName,
    dni,
    phone,
    email,
    password,
    salary,
    isActive,
  } = req.body;
  Trainer.create({
    firstName,
    lastName,
    dni,
    phone,
    email,
    password,
    salary,
    isActive,
  })
    .then((result) => res.status(201).json({
      message: 'Trainer created',
      data: result,
      error: false,
    }))
    .catch((error) => res.status(400).json({
      message: 'An error ocurred!',
      error,
    }));
};

const getTrainers = (req, res) => {
  Trainer.find()
    .then((trainers) => res.status(200).json({
      message: 'Complete trainers list',
      data: trainers,
      error: false,
    }))
    .catch((error) => res.status(400).json({
      message: 'An error ocurred!',
      error,
    }));
};

const updateTrainer = (req, res) => {
  const toUpdate = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    dni: req.body.dni,
    phone: req.body.phone,
    email: req.body.email,
    password: req.body.password,
    salary: req.body.salary,
    isActive: req.body.isActive,
  };
  Trainer.findById(req.params.id)
    .then((trainer) => {
      if (!trainer) {
        res.status(404).json({
          message: 'Trainer not found',
          data: undefined,
          error: true,
        });
      } else {
        Object.keys(toUpdate).forEach((attr) => {
          if (toUpdate[attr] !== undefined) {
            // eslint-disable-next-line no-param-reassign
            trainer[attr] = toUpdate[attr];
          }
        });
        trainer.save();
        res.status(200).json({
          message: 'Trainer updated',
          data: trainer,
          error: false,
        });
      }
    })
    .catch((error) => res.status(400).json({
      message: 'An error ocurred!',
      error,
    }));
};

const deleteTrainer = (req, res) => {
  Trainer.findByIdAndDelete(req.params.id)
    .then((trainer) => {
      if (!trainer) {
        res.status(404).json({
          message: 'Trainer not found',
          data: undefined,
          error: true,
        });
      } else {
        res.status(200).json({
          message: 'Trainer deleted',
          data: trainer,
          error: false,
        });
      }
    })
    .catch((error) => res.status(400).json({
      message: 'An error ocurred!',
      error,
    }));
};

const getTrainerById = (req, res) => {
  Trainer.findById(req.params.id)
    .then((trainer) => {
      if (!trainer) {
        res.status(404).json({
          message: 'Trainer not found',
          data: undefined,
          error: true,
        });
      } else {
        res.status(200).json({
          message: 'Trainer found',
          data: trainer,
          error: false,
        });
      }
    })
    .catch((error) => res.status(400).json({
      message: 'An error ocurred!',
      error,
    }));
};

module.exports = {
  createTrainer,
  updateTrainer,
  getTrainers,
  deleteTrainer,
  getTrainerById,
};
