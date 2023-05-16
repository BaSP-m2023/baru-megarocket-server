const Joi = require('joi');

const validateCreation = (req, res, next) => {
  const classValidation = Joi.object({
    activity: Joi.string().min(3).required(),
    trainer: Joi.string().min(3).required(),
    day: Joi.string().regex(/^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)$/).required(),
    time: Joi.string().regex(/^([0-9]|[01]\d|2[0-3]):([0-5]\d)$/).required(),
    capacity: Joi.number().min(1).required(),
  });

  const validation = classValidation.validate(req.body);
  if (!validation.error) return next();
  return res.status(400).json({
    message: `There was an error ${validation.error.details[0].message}`,
    data: undefined,
    error: true,
  });
};

const validateAssignTrainer = (req, res, next) => {
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

module.exports = {
  validateCreation, validateAssignTrainer,
};
