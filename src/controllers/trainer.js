const { default: firebaseApp } = require('../helper/firebase');
const Trainer = require('../models/Trainer');

const createTrainer = async (req, res) => {
  let firebaseUid;
  try {
    const newFirebaseUser = await firebaseApp.auth().createUser({
      email: req.body.email,
      password: req.body.password,
    });
    firebaseUid = newFirebaseUser.uid;

    await firebaseApp.auth().setCustomUserClaims(newFirebaseUser.uid, { role: 'TRAINER' });

    const trainer = new Trainer({
      firebaseUid,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      dni: req.body.dni,
      phone: req.body.phone,
      email: req.body.email,
      salary: req.body.salary,
      isActive: true,
    });

    const trainerSaved = await trainer.save();

    return res.status(201).json({
      message: 'Trainer created',
      data: trainerSaved,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.toString(),
      error: true,
      data: undefined,
    });
  }
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

const updateTrainer = async (req, res) => {
  const toUpdate = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    dni: req.body.dni,
    phone: req.body.phone,
    email: req.body.email,
    salary: req.body.salary,
    isActive: req.body.isActive,
  };
  const existingTrainer = await Trainer.findOne({ email: req.body.email });

  if (existingTrainer) {
    return res.status(400).json({
      message: 'This email is already used by another trainer.',
      data: existingTrainer,
      error: true,
    });
  }
  return Trainer.findById(req.params.id)
    .then((trainer) => {
      if (!trainer) {
        return res.status(404).json({
          message: 'Trainer not found',
          data: undefined,
          error: true,
        });
      }
      Object.keys(toUpdate).forEach((attr) => {
        if (toUpdate[attr] !== undefined) {
          // eslint-disable-next-line no-param-reassign
          trainer[attr] = toUpdate[attr];
        }
      });
      trainer.save();
      return res.status(200).json({
        message: 'Trainer updated',
        data: trainer,
        error: false,
      });
    })
    .catch((error) => res.status(400).json({
      message: 'An error ocurred!',
      error,
      data: undefined,
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
