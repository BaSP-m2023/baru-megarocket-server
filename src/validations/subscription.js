const Joi = require('joi');

const validateUpdate = (req, res, next) => {
  const subValidation = Joi.object({
    classes: Joi.string(),
    members: Joi.array().unique(),
    date: Joi.date(),
  });

  const validation = subValidation.validate(req.body);

  if (!validation.error) return next();
  return res.status(400).json({
    message: `There was an error: ${validation.error.details[0].message}`,
    data: undefined,
    error: true,
  });
};

module.exports = {
  validateUpdate,
};
