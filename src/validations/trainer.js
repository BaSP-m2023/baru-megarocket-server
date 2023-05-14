const Joi = require('joi');

const validateTrainerCreate = (req, res, next) => {
  const trainerValidation = Joi.object({
    firstName: Joi.string().min(3).required(),
    lastName: Joi.string().min(3).required(),
    dni: Joi.string().min(8).required(),
    phone: Joi.string(),
    email: Joi.string().email().regex(/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/).required(),
    password: Joi.string().min(8).required(),
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
    firstName: Joi.string().min(3),
    lastName: Joi.string().min(3),
    dni: Joi.string().min(8),
    phone: Joi.string(),
    email: Joi.string().email().regex(/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/),
    password: Joi.string().min(8),
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
