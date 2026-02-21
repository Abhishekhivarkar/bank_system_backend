import Joi from "joi"
import mongoose from "mongoose"

// reusable ObjectId validator
const objectIdValidator = (value, helpers) => {

  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.message("Invalid MongoDB ObjectId")
  }

  return value
}


// CREATE ACCOUNT VALIDATOR
export const createAccountValidator = {
  body: Joi.object({

    // optional because controller auto assigns user
    currency: Joi.string()
      .valid("INR", "USD", "EUR")
      .optional(),

    status: Joi.string()
      .valid("ACTIVE", "FROZEN", "CLOSED")
      .optional()

  })
}


// GET ACCOUNT BALANCE VALIDATOR
export const getAccountBalanceValidator = {
  params: Joi.object({

    accountId: Joi.string()
      .required()
      .custom(objectIdValidator)
      .messages({
        "any.required": "Account ID is required"
      })

  })
}
export const getAllAccountsValidator = {
  query: Joi.object({

    page: Joi.number()
      .integer()
      .min(1)
      .optional(),

    limit: Joi.number()
      .integer()
      .min(1)
      .max(100)
      .optional()

  })
}