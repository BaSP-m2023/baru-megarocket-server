const Trainer = require('../models/Trainer');

// trainerRouter.get('/', (req, res) => res.json(trainers));

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
    .then((result) => res.status(201).json(result))
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

// const updateTrainer = (req, res) => {

// };

// trainerRouter.put('/:id', (req, res) => {
//   const idTrainer = parseInt(req.params.id, 10);
//   const changeTrainer = req.body;
//   const flag = trainers.some((trainer) => trainer.id === idTrainer);
//   const attributes = ['name', 'last_name', 'phone', 'hourly_wage',
//        'activity', 'email', 'password'];
//   if (flag) {
//     const updateTrainer = trainers.find((trainer) => trainer.id === idTrainer);
//     // iterate each attribute to validate 1) if it field is written on the body in postman
//     // and 2) if the field is empty not change the attr in .json file
//     attributes.forEach((attr) => {
//       if (changeTrainer[attr] !== undefined) {
//         if (changeTrainer[attr].trim().length !== 0) {
//           updateTrainer[attr] = changeTrainer[attr];
//         }
//       }
//     });
//     fs.writeFile('src/data/trainer.json', JSON.stringify(trainers, null, 2), (error) => {
//       if (error) {
//         res.status(400).send('User cannot be updated');
//       } else {
//         res.status(200).send('User updated');
//       }
//     });
//   } else {
//     res.status(400).send(`Trainer with id ${idTrainer} NOT FOUND`);
//   }
// });

// trainerRouter.delete('/:id', (req, res) => {
//   const trainerId = req.params.id;
//   const newArray = trainers.filter((trainer) => trainer.id.toString() !== trainerId);
//   fs.writeFile('src/data/trainer.json', JSON.stringify(newArray, null, 2), (error) => {
//     if (error) {
//       res.status(400).send('User cannot be deleted');
//     } else {
//       res.status(200).send('User deleted');
//     }
//   });
// });

// trainerRouter.get('/:id', (req, res) => {
//   const trainerId = req.params.id;
//   const trainerr = trainers.find((trainer) => trainer.id.toString() === trainerId);
//   if (trainerr) {
//     res.send(trainerr);
//   } else {
//     res.status(404).json({ error: 'Trainer not found' });
//   }
// });

module.exports = {
  createTrainer,
  // updateTrainer,
  getTrainers,
};
