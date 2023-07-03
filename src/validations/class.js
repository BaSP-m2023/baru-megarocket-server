const Joi = require('joi');

const validateCreation = (req, res, next) => {
  const classValidation = Joi.object({
    activity: Joi.string().hex().length(24).required(),
    trainer: Joi.string().hex().length(24).required(),
    day: Joi.string().regex(/^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday)$/).required(),
    time: Joi.string().regex(/^([0-9]|[01]\d|2[0-3]):([00]\d)$/).required(),
    capacity: Joi.number().min(1).max(50).required()
      .integer(),
    available: Joi.number().min(1).max(50).integer(),

  });

  const validation = classValidation.validate(req.body);
  if (!validation.error) return next();
  return res.status(400).json({
    message: `There was an error ${validation.error.details[0].message}`,
    data: undefined,
    error: true,
  });
};

const validateAssignTrainer = (req, res, next) => {
  const trainerValidation = Joi.object({
    trainer: Joi.array().items(Joi.string().hex().length(24)).required(),
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

const validateAssignActivity = (req, res, next) => {
  const trainerValidation = Joi.object({
    activity: Joi.string().hex().length(24).required(),
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

const validateUpdate = (req, res, next) => {
  const classValidation = Joi.object({
    activity: Joi.string().hex().length(24),
    trainer: Joi.string().hex().length(24),
    day: Joi.string().regex(/^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday)$/),
    time: Joi.string().regex(/^([0-9]|[01]\d|2[0-3]):([00]\d)$/),
    capacity: Joi.number().min(1).max(50).integer(),
    available: Joi.number().min(1).max(50).integer(),
  });

  const validation = classValidation.validate(req.body);
  if (!validation.error) return next();
  return res.status(400).json({
    message: `There was an error ${validation.error.details[0].message}`,
    data: undefined,
    error: true,
  });
};

module.exports = {
  validateCreation,
  validateUpdate,
  validateAssignTrainer,
  validateAssignActivity,
};
