import express from "express"

import {
  createTransaction,
  createInitialFundsTrnsaction
} from "../controllers/transaction.controller.js"

import {
  authMiddleware,
  systemUserAuth
} from "../middlewares/auth.middleware.js"

import { validate } from "../middlewares/validate.middleware.js"

import {
  createTransactionValidator,
  createInitialFundsValidator
} from "../validators/transaction.validator.js"


const router = express.Router()


router.post(
  "/transaction",
  authMiddleware,
  validate(createTransactionValidator),
  createTransaction
)


router.post(
  "/transaction/system/init",
  systemUserAuth,
  validate(createInitialFundsValidator),
  createInitialFundsTrnsaction
)


export default router