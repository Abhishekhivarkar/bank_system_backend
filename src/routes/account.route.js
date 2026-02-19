import { createAccount } from "../controllers/account.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import express from "express"

const router = express.Router()

router.post("/account",authMiddleware,createAccount)

export default router