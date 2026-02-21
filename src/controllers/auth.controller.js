import userModel from "../models/User.model.js"
import bcryptjs from "bcryptjs"
import {config} from "../configs/env.config.js"
import jwt from "jsonwebtoken"
import sendRegisterEmailToUser from "../services/email.service.js"
import blackListTokenModel from "../models/BlackListToken.model.js"
export const register = async (req,res) =>{
  try{
    const {name,email,password} = req.body
    
    if(!name || !email || !password){
      return res.status(401).json({
        success:false,
        message:"all fields are required"
      })
    }
    
    const user = await userModel.findOne({email})
    
    if(user){
      return res.status(401).json({
        success:false,
        message:"Email already register"
      })
    }
    
    const newUser = await userModel.create({
      name,
      email,
      password
    })
  
    res.json({
      success:true,
      message:"User register successfully"
    })

    await sendRegisterEmailToUser(
    newUser.name,
  newUser.email
  )
  }catch(err){
    console.log("USER REGISTER ERROR : ",err)
    res.status(500).json({
      success:false,
      message:"Failed to register user"
    })
  }
}


export const login =async (req,res) =>{
  try{
    const {email,password} = req.body
    
    if(!email || !password){
      return res.status(401).json({
        success:false,
        message:"both fields are required"
      })
    }
    
    const user = await userModel.findOne({email}).select("+password")
    
    if(!user){
      return res.status(400).json({
        success:false,
        message:"Email is not registered"
      })
    }
    
    const compare = await bcryptjs.compare(password,user.password)
    
    if(!compare){
      return res.status(400).json({
        success:false,
        message:"Incorrect password"
      })
    }
    
    const token = jwt.sign(
      {userId:user._id},
      config.JWT_SECRET,
      {"expiresIn":"15m"}
      )
      
  res.cookie("token",token)
  
      res.json({
        success:true,
        message:"user login successfully",
        token
      })
  }catch(err){
    console.log("LOGIN ERROR : ",err)
    res.status(500).json({
      success:false,
      message:"Login failed"
    })
  }
}


export const logout= async (req, res) => {
  try {
const token = req.cookies?.token || req.headers.authorization?.split(" ")[1]
    
    if(!token){
     return res.status(200).json({
      success:true,
      message:"Logout successfully!"
     })
    }

res.cookie("token","")

await blackListTokenModel.create({
 token
})

res.status(200).json({
 success:true,
 message:"Logout successfully!"
})
  } catch (error) {
    console.log("LOGOUT ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Logout failed"
    });
  }
};