import { register, login, logout } from "../controllers/auth.controller.js"
import express from "express"

import { validate } from "../middlewares/validate.middleware.js"
import { registerValidator, loginValidator } from "../validators/auth.validator.js"

const router = express.Router()

router.post(
  "/auth/register",
  validate(registerValidator),
  register
)

router.post(
  "/auth/login",
  validate(loginValidator),
  login
)

router.post(
  "/auth/logout",
  logout
)

export default router