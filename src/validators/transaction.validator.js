import Joi from "joi"
import mongoose from "mongoose"


// reusable ObjectId validator
const objectIdValidator = (value, helpers) => {

  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.message("Invalid MongoDB ObjectId")
  }

  return value
}


// reusable UUID validator
const uuidValidator = Joi.string()
  .guid({
    version: [
      "uuidv4",
      "uuidv5"
    ]
  })
  .required()
  .messages({
    "string.guid": "idempotencyKey must be a valid UUID"
  })



/**
 * USER TRANSACTION VALIDATOR
 * POST /transaction
 */
export const createTransactionValidator = {

  body: Joi.object({

    fromAccount: Joi.string()
      .required()
      .custom(objectIdValidator)
      .messages({
        "any.required": "fromAccount is required"
      }),

    toAccount: Joi.string()
      .required()
      .custom(objectIdValidator)
      .messages({
        "any.required": "toAccount is required"
      }),

    amount: Joi.number()
      .positive()
      .precision(2)
      .required()
      .messages({
        "number.base": "Amount must be a number",
        "number.positive": "Amount must be greater than 0"
      }),

    idempotencyKey: uuidValidator

  })
  .custom((value, helpers) => {

    if (value.fromAccount === value.toAccount) {
      return helpers.message("Cannot transfer to same account")
    }

    return value
  })

}



/**
 * SYSTEM INITIAL FUND VALIDATOR
 * POST /transaction/system/init
 */
export const createInitialFundsValidator = {

  body: Joi.object({

    toAccount: Joi.string()
      .required()
      .custom(objectIdValidator),

    amount: Joi.number()
      .positive()
      .precision(2)
      .required(),

    idempotencyKey: uuidValidator

  })

}