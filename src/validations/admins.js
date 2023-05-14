const Joi = require('joi');

const validateCreation = (req, res, next) => {
  const adminValidation = Joi.object({
    firstName: Joi.string().min(3).max(50).required(),
    lastName: Joi.string().min(3).max(50).required(),
    dni: Joi.number().min(8).required(),
    phone: Joi.number().min(10).required(),
    email: Joi.string().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/).required(),
    city: Joi.string().min(3).max(50).required(),
    password: Joi.string().min(8).required(),
  });

  const validation = adminValidation.validate(req.body);

  if (!validation.error) return next();
  return res.status(400).json({
    message: `There was an error: ${validation.error.details[0].message}`,
    data: undefined,
    error: true,
  });
};

const validateUpdate = (req, res, next) => {
  const adminValidation = Joi.object({
    firstName: Joi.string().min(3).max(50),
    lastName: Joi.string().min(3).max(50),
    dni: Joi.number().min(8),
    phone: Joi.number().min(10),
    email: Joi.string().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
    city: Joi.string().min(3).max(50),
    password: Joi.string().min(8),
  }).min(1);

  const validation = adminValidation.validate(req.body);

  if (!validation.error) return next();
  return res.status(400).json({
    message: `There was an error: ${validation.error.details[0].message}`,
    data: undefined,
    error: true,
  });
};

module.exports = {
  validateCreation,
  validateUpdate,
};
