//imports

import express from "express"
import cookieParser from "cookie-parser"
import authRoutes from "./routes/auth.route.js"
import accountRoutes from "./routes/account.route.js"
import transactionRoutes from "./routes/transaction.route.js" 
const app = express()

app.use(express.json())
app.use(cookieParser())

// endpoints
app.use("/api", authRoutes)
app.use("/api", accountRoutes)
app.use("/api", transactionRoutes)

app.use("/health",(_,res)=>{
  res.status(200).json({
    success:true,
    status:"OK"
  })
})


export default app