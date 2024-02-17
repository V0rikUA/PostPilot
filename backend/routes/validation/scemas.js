const { celebrate, Joi } = require("celebrate");

const createUserSchema = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8).max(16),
    name: Joi.string().min(2).max(30),
  }),
});

const signInSchema = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

module.exports = { createUserSchema, signInSchema };
