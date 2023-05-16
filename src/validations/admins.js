const Joi = require('joi');

const validateCreation = (req, res, next) => {
  const adminValidation = Joi.object({
    firstName: Joi.string().pattern(/^[a-zA-Z]+$/).min(3).max(20)
      .required(),
    lastName: Joi.string().pattern(/^[a-zA-Z]+$/).min(3).max(20)
      .required(),
    dni: Joi.number().min(10000000).max(100000000).integer()
      .positive()
      .required(),
    phone: Joi.number().min(1000000000).max(10000000000).integer()
      .positive()
      .required(),
    email: Joi.string().email().pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
      .required(),
    city: Joi.string().pattern(/^[a-zA-Z]+$/).min(3).max(50)
      .required(),
    password: Joi.string().alphanum().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/).min(8)
      .required(),
    deleted: Joi.boolean(),
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
    firstName: Joi.string().pattern(/^[a-zA-Z]+$/).min(3).max(20)
      .required(),
    lastName: Joi.string().pattern(/^[a-zA-Z]+$/).min(3).max(20)
      .required(),
    dni: Joi.number().min(10000000).max(100000000).integer()
      .positive(),
    phone: Joi.number().min(1000000000).max(10000000000).integer()
      .positive(),
    email: Joi.string().email().pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
    city: Joi.string().pattern(/^[a-zA-Z]+$/).min(3).max(50),
    password: Joi.string().alphanum().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/).min(8),
    deleted: Joi.boolean(),
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
