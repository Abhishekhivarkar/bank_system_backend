import express from "express"
import {connectDB} from "./src/configs/db.config.js"
import {config} from "./src/configs/env.config.js"
import dotenv from "dotenv"
import app from "./src/app.js"
dotenv.config()
const PORT = config.PORT || 5000

const startServer = async (_,res) =>{
  try{
    await connectDB()
    
    app.listen(PORT,()=>{
      console.log(`server is running on ${PORT}`)
    })
  }catch(err){
    console.log("SERVER START ERROR : ",err)
  }
}


startServer()