const Joi = require('joi');

const validateTrainerCreate = (req, res, next) => {
  const trainerValidation = Joi.object({
    firstName: Joi.string().min(3).max(20).regex(/^[a-zA-Z\s]+$/)
      .message({ 'string.pattern.base': 'Name must be only letters' })
      .required(),
    lastName: Joi.string().min(3).max(20).regex(/^[a-zA-Z\s]+$/)
      .message({ 'string.pattern.base': 'Last name must be only letters' })
      .required(),
    dni: Joi.string().min(7).max(10).regex(/^[0-9]+$/)
      .message({ 'string.pattern.base': 'DNI must be only numbers' })
      .required(),
    phone: Joi.string().min(10).max(12).regex(/^[0-9]+$/)
      .message({ 'string.pattern.base': 'Phone must be only numbers' })
      .required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(20).regex(/^[a-zA-Z0-9]+$/)
      .message({ 'string.pattern.base': 'Password must be numbers, letters or both' })
      .required(),
    salary: Joi.string().min(2).max(7).regex(/^[0-9]+$/)
      .message({ 'string.pattern.base': 'Salary must be only numbers' })
      .required(),
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
    firstName: Joi.string().min(3).max(20).regex(/^[a-zA-Z\s]+$/)
      .message({ 'string.pattern.base': 'Name must be only letters' }),
    lastName: Joi.string().min(3).max(20).regex(/^[a-zA-Z\s]+$/)
      .message({ 'string.pattern.base': 'Last name must be only letters' }),
    dni: Joi.string().min(7).max(10).regex(/^[0-9]+$/)
      .message({ 'string.pattern.base': 'DNI must be only numbers' }),
    phone: Joi.string().min(10).max(12).regex(/^[0-9]+$/)
      .message({ 'string.pattern.base': 'Phone must be only numbers' }),
    salary: Joi.string().min(2).max(7).regex(/^[0-9]+$/)
      .message({ 'string.pattern.base': 'Salary must be only numbers' }),
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
