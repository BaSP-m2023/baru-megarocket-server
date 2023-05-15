const Joi = require('joi');

// eslint-disable-next-line consistent-return
const validateCreation = (req, res, next) => {
  const subsValidation = Joi.object({
    className: Joi.string().pattern(/^[a-zA-Z]+$/).min(3).required(),
    members: Joi.string().pattern(/^[a-zA-Z]+$/).min(3).required(),
    date: Joi.date().default(Date.now),
    id: Joi.number(),
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
};
