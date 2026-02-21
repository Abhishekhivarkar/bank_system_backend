import Joi from "joi"

export const registerValidator = {
  body: Joi.object({
    name: Joi.string().trim().min(2).max(50).required(),

    email: Joi.string()
      .trim()
      .lowercase()
      .email()
      .required(),

    password: Joi.string()
      .min(8)
      .max(50)
      .required()
  })
}

export const loginValidator = {
  body: Joi.object({

    email: Joi.string()
      .email()
      .required(),

    password: Joi.string()
      .required()
  })
}