const Joi = require('joi');

const validateMember = (req, res, next) => {
  const memberValidation = Joi.object({
    name: Joi.string().pattern(/^[a-zA-Z]+$/).min(4).max(10)
      .required(),
    lastName: Joi.string().pattern(/^[a-zA-Z]+$/).min(4).max(10)
      .required(),
    phone: Joi.string().min(10).required(),
    dni: Joi.string().pattern(/^(?!^0)[0-9]{7,11}$/).required(),
    city: Joi.string().min(3).required(),
    dob: Joi.date().greater('1923-01-01').less('2005-01-01').required(),
    zip: Joi.number().min(1000).max(9999).required(),
    isActive: Joi.boolean().required(),
    membership: Joi.string().valid('classic', 'only_classes', 'black').required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(/^[a-zA-Z0-9]{6,20}$/).required(),
  });
  const validation = memberValidation.validate(req.body);

  if (!validation.error) return next();
  return res.status(400).json({
    message: `Opss error was find: ${validation.error.details[0].message}`,
    data: undefined,
    error: true,
  });
};

const validateMemberUpdate = (req, res, next) => {
  const UpdatememberValidation = Joi.object({
    name: Joi.string().pattern(/^[a-zA-Z]+$/).min(4).max(10),
    lastName: Joi.string().pattern(/^[a-zA-Z]+$/).min(4).max(10),
    phone: Joi.string(),
    dni: Joi.string().pattern(/^(?!^0)[0-9]{7,11}$/),
    city: Joi.string().min(3),
    dob: Joi.date().greater('1923-01-01').less('2005-01-01'),
    zip: Joi.number().min(1000).max(9999),
    isActive: Joi.boolean(),
    membership: Joi.string().valid('classic', 'only_classes', 'black'),
  });
  const UpdateValidation = UpdatememberValidation.validate(req.body);

  if (!UpdateValidation.error) return next();
  return res.status(400).json({
    message: `Oops, an error occurred: ${UpdateValidation.error.details[0].message}`,
    data: undefined,
    error: true,
  });
};
module.exports = {
  validateMember,
  validateMemberUpdate,
};
