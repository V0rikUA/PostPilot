const { celebrate, Joi } = require("celebrate");

const createUserSchema = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8).max(16),
    name: Joi.string().required().min(2).max(30),
  }),
});

module.exports = { createUserSchema };
