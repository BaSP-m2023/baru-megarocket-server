const Joi = require('joi');

const validateTrainerCreate = (req, res, next) => {
  const trainerValidation = Joi.object({
    firstName: Joi.string().pattern(/^[a-zA-Z\s]+$/).min(3).required(),
    lastName: Joi.string().pattern(/^[a-zA-Z\s]+$/).min(3).required(),
    dni: Joi.string().pattern(/^\d+$/).min(8).required(),
    phone: Joi.string().min(10),
    email: Joi.string().email().required(),
    password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/).min(8).required(),
    salary: Joi.string(),
    isActive: Joi.boolean(),
  });

  const validation = trainerValidation.validate(req.body);

  if (!validation.error) {
    return next();
  }
  return res.status(400).json({
    message: `There was an error: ${validation.error.details[0].message}`,
    data: undefined,
    error: true,
  });
};

const validateTrainerUpdate = (req, res, next) => {
  const trainerValidation = Joi.object({
    firstName: Joi.string().pattern(/^[a-zA-Z\s]+$/).min(3),
    lastName: Joi.string().pattern(/^[a-zA-Z\s]+$/).min(3),
    dni: Joi.string().pattern(/^\d+$/).min(8),
    phone: Joi.string().pattern(/^\d+$/),
    email: Joi.string().email(),
    password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/).min(8),
    salary: Joi.string(),
    isActive: Joi.boolean(),
  });
  const validation = trainerValidation.validate(req.body);

  if (!validation.error) {
    return next();
  }
  return res.status(400).json({
    message: `There was an error: ${validation.error.details[0].message}`,
    data: undefined,
    error: true,
  });
};

module.exports = {
  validateTrainerCreate,
  validateTrainerUpdate,
};
