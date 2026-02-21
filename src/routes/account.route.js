import {
  createAccount,
  getAllAccounts,
  getAccountBalance
} from "../controllers/account.controller.js"

import { authMiddleware } from "../middlewares/auth.middleware.js"
import { validate } from "../middlewares/validate.middleware.js"

import {
  createAccountValidator,
  getAccountBalanceValidator,
  getAllAccountsValidator
} from "../validators/account.validator.js"

import express from "express"

const router = express.Router()

router.get(
  "/account",
  authMiddleware,
  validate(getAllAccountsValidator),
  getAllAccounts
)

router.get(
  "/account/:accountId",
  authMiddleware,
  validate(getAccountBalanceValidator),
  getAccountBalance
)

router.post(
  "/account",
  authMiddleware,
  validate(createAccountValidator),
  createAccount
)

export default router