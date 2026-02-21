import Joi from "joi"

export const validate = (schema) => {

  return (req, res, next) => {

    const validationData = {}

    if (schema.body) validationData.body = req.body
    if (schema.params) validationData.params = req.params
    if (schema.query) validationData.query = req.query

    const { error, value } = Joi.object(schema).validate(validationData, {
      abortEarly: false,
      allowUnknown: false,
      stripUnknown: true
    })

    if (error) {

      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: error.details.map(err => ({
          field: err.path.join("."),
          message: err.message
        }))
      })
    }

    if (value.body) req.body = value.body

    next()
  }
}