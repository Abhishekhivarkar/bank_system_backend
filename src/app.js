import express from "express"

const app = express()

app.use(express.json())


app.use("/health",(_,res)=>{
  res.status(200).json({
    success:true,
    status:"OK"
  })
})


export default app