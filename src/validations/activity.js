const Joi = require('joi');

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
  validateUpdateActivity,
};
