const Joi = require('joi');

const validateCreation = (req, res, next) => {
  const superAdminValidation = Joi.object({
    name: Joi.string()
      .alphanum()
      .trim()
      .min(3)
      .required(),
    lastName: Joi.string()
      .alphanum()
      .trim()
      .min(3)
      .required(),
    email: Joi.string()
      .lowercase()
      .email()
      .pattern(/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/)
      .min(3)
      .required(),
    password: Joi.string()
      .alphanum()
      .min(8)
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

module.exports = {
  validateCreation,
};
