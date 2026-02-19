import express from "express"
import cookieParser from "cookie-parser"
import authRoutes from "./routes/auth.route.js"
const app = express()

app.use(express.json())
app.use(cookieParser())

app.use("/api",authRoutes)

app.use("/health",(_,res)=>{
  res.status(200).json({
    success:true,
    status:"OK"
  })
})


export default app