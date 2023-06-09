const Joi = require('joi');

const validateUpdate = (req, res, next) => {
  const subValidation = Joi.object({
    classes: Joi.string(),
    members: Joi.string(),
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

// eslint-disable-next-line consistent-return
const validateCreation = (req, res, next) => {
  const subsValidation = Joi.object({
    classes: Joi.string().required(),
    members: Joi.string().required(),
    date: Joi.string().isoDate().required(),
  });

  const validation = subsValidation.validate(req.body);

  if (validation.error) {
    return res.status(400).json({
      message: `There was an error: ${validation.error.details[0].message}`,
      data: undefined,
      error: true,
    });
  }

  req.body = validation.value;
  next();
};

module.exports = {
  validateCreation,
  validateUpdate,
};
