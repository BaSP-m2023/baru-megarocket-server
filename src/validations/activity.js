const Joi = require('joi');

const validateCreation = (req, res, next) => {
  const activityValidation = Joi.object({
    name: Joi.string().min(4).required(),
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
module.exports = {
  validateCreation,
};
