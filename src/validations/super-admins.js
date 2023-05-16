const Joi = require('joi');

const validateCreation = (req, res, next) => {
  const superAdminValidation = Joi.object({
    name: Joi.string()
      .alphanum()
      .trim()
      .min(3)
      .max(50)
      .required(),
    lastName: Joi.string()
      .alphanum()
      .trim()
      .min(3)
      .max(50)
      .required(),
    email: Joi.string()
      .lowercase()
      .email()
      .pattern(/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/)
      .min(3)
      .max(80)
      .required(),
    password: Joi.string()
      .alphanum()
      .min(8)
      .max(50)
      .required(),
  });
  const validation = superAdminValidation.validate(req.body);

  if (!validation.error) return next();
  return res.status(400).json({
    message: `There was an error: ${validation.error.details[0].message}`,
    data: undefined,
    error: true,
  });
};
const validateUpdate = (req, res, next) => {
  const superAdminValidation = Joi.object({
    name: Joi.string()
      .trim()
      .min(3)
      .max(50),
    lastName: Joi.string()
      .trim()
      .min(3)
      .max(50),
    email: Joi.string()
      .lowercase()
      .email()
      .pattern(/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/)
      .min(3)
      .max(80),
    password: Joi.string()
      .alphanum()
      .min(8)
      .max(50),
  });
  const validation = superAdminValidation.validate(req.body);

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
