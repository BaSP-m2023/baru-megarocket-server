const { default: firebaseApp } = require('../helper/firebase');
const Trainer = require('../models/Trainer');

const createTrainer = async (req, res) => {
  let firebaseUid;
  const trainerExists = await Trainer.findOne({ dni: req.body.dni });
  // eslint-disable-next-line no-underscore-dangle
  if (trainerExists) {
    return res.status(400).json({
      message: 'There is another Trainer with that DNI.',
      data: undefined,
      error: true,
    });
  }
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

// eslint-disable-next-line consistent-return
const updateTrainer = async (req, res) => {
  const { id } = req.params;
  const toUpdate = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    dni: req.body.dni,
    phone: req.body.phone,
    salary: req.body.salary,
    isActive: req.body.isActive,
  };
  console.log(toUpdate);
  const trainerExists = await Trainer.findOne({ dni: toUpdate.dni });
  // eslint-disable-next-line no-underscore-dangle
  if (trainerExists && trainerExists._id.toString() !== id) {
    return res.status(400).json({
      message: 'There is another Trainer with that DNI.',
      data: undefined,
      error: true,
    });
  }
  Trainer.findByIdAndUpdate(
    id,
    toUpdate,
    { new: true },
  ).then((updated) => {
    if (!updated) {
      return res.status(404).json({
        message: `Trainer with id: ${id} doesn't exist.`,
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Trainer updated',
      data: updated,
      error: false,
    });
  }).catch((error) => res.status(500).json({
    message: error.toString(),
    data: undefined,
    error: true,
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
        firebaseApp.auth().deleteUser(trainer.firebaseUid);
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
