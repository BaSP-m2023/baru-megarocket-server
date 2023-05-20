const Joi = require('joi');

const validateTrainerCreate = (req, res, next) => {
  const trainerValidation = Joi.object({
    firstName: Joi.string().pattern(/^[a-zA-Z\s]+$/).min(3).max(20)
      .required(),
    lastName: Joi.string().pattern(/^[a-zA-Z\s]+$/).min(3).max(20)
      .required(),
    dni: Joi.string().pattern(/^\d+$/).min(8).required()
      .max(10),
    phone: Joi.string().pattern(/^\d+$/).min(10).max(12),
    email: Joi.string().email().required(),
    password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/).min(8).max(20)
      .required(),
    salary: Joi.string().regex(/^\$[1-9]\d{0,6}(?:\.\d{1,2})?$/),
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
    firstName: Joi.string().pattern(/^[a-zA-Z\s]+$/).min(3).max(20),
    lastName: Joi.string().pattern(/^[a-zA-Z\s]+$/).min(3).max(20),
    dni: Joi.string().pattern(/^\d+$/).min(8).max(10),
    phone: Joi.string().pattern(/^\d+$/).min(10).max(12),
    email: Joi.string().email(),
    password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/).min(8).max(20),
    salary: Joi.string().regex(/^\$[1-9]\d{0,6}(?:\.\d{1,2})?$/),
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
