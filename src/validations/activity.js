/* eslint-disable no-useless-escape */
const Joi = require('joi');

<<<<<<< HEAD
=======
const validateCreation = (req, res, next) => {
  const activityValidation = Joi.object({
    name: Joi.string().min(4).pattern(/^[a-zA-Z]+$/).required(),
    description: Joi.string().min(5).required(),
    isActive: Joi.boolean().required(),
  });

  const validation = activityValidation.validate(req.body);
  if (!validation.error) return next();
  return res.status(400).json({
    message: `There was an error ${validation.error.details[0].message}`,
    data: undefined,
    error: true,
  });
};

>>>>>>> master
const validateUpdateActivity = (req, res, next) => {
  const validationActivity = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    description: Joi.string().min(20).max(50).required(),
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
<<<<<<< HEAD
=======
  validateCreation,
>>>>>>> master
  validateUpdateActivity,
};
