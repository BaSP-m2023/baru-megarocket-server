const Joi = require('joi');

const validateCreation = (req, res, next) => {
  const adminValidation = Joi.object({
    firstName: Joi.string().pattern(/^[a-zA-Z]+( [a-zA-Z]+)*$/).min(3).max(20)
      .required(),
    lastName: Joi.string().pattern(/^[a-zA-Z]+( [a-zA-Z]+)*$/).min(3).max(20)
      .required(),
    dni: Joi.string().min(7).max(10)
      .required(),
    phone: Joi.string().min(10).max(12)
      .required(),
    email: Joi.string().email().pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
      .required(),
    city: Joi.string().pattern(/^[a-zA-Z]+( [a-zA-Z]+)*$/).min(3).max(50)
      .required(),
    password: Joi.string().alphanum().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/).min(8)
      .required(),
  });

  const validation = adminValidation.validate(req.body);

  if (!validation.error) return next();
  return res.status(400).json({
    message: `There was an error: ${validation.error.details[0].message}`,
    data: undefined,
    error: true,
  });
};

const adminValidateUpdate = Joi.object({
  firstName: Joi.string().strict(true).pattern(/^[a-zA-Z]+( [a-zA-Z]+)*$/).min(3)
    .max(20),
  lastName: Joi.string().strict(true).pattern(/^[a-zA-Z]+( [a-zA-Z]+)*$/).min(3)
    .max(20),
  dni: Joi.string().strict(true).min(7).max(10),
  phone: Joi.string().strict(true).min(10).max(12),
  city: Joi.string().strict(true).pattern(/^[a-zA-Z]+( [a-zA-Z]+)*$/).min(3)
    .max(50),
}).options({ abortEarly: false });

const validateUpdate = (req, res, next) => {
  const { error } = adminValidateUpdate.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: 'Validation error',
      errors: error.details.map((err) => err.message),
    });
  }
  return next();
};

module.exports = {
  validateCreation,
  validateUpdate,
};
