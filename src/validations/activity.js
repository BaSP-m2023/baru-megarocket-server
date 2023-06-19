/* eslint-disable no-useless-escape */
const Joi = require('joi');

const validateCreation = (req, res, next) => {
  const activityValidation = Joi.object({
    name: Joi.string().min(3).max(20).pattern(/^[A-Za-z\s]+$/)
      .message({
        'string.pattern.base': 'The name must contains only letters.',
      })
      .required(),
    description: Joi.string().min(20).max(100).pattern(/^[A-Za-z\s]+$/)
      .message({
        'string.pattern.base': 'The description must contains only letters.',
      })
      .required(),
    isActive: Joi.boolean(),
    trainers: Joi.array().min(1).required(),
  });

  const validation = activityValidation.validate(req.body);
  if (!validation.error) return next();
  return res.status(400).json({
    message: `There was an error ${validation.error.details[0].message}`,
    data: undefined,
    error: true,
  });
};

const validateUpdateActivity = (req, res, next) => {
  const validationActivity = Joi.object({
    name: Joi.string().min(3).max(20).pattern(/^[A-Za-z\s]+$/)
      .message({
        'string.pattern.base': 'The name must contains only letters.',
      }),
    description: Joi.string().min(20).max(100).pattern(/^[A-Za-z\s]+$/)
      .message({
        'string.pattern.base': 'The description must contains only letters.',
      }),
    isActive: Joi.boolean(),
    trainers: Joi.array().min(1),
  });

  const validation = validationActivity.validate(req.body);

  if (!validation.error) return next();
  return res.status(400).json({
    message: validation.error.details[0].message,
    data: undefined,
    error: true,
  });
};

module.exports = {
  validateCreation,
  validateUpdateActivity,
};
