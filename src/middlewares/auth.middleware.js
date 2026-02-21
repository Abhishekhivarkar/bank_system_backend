import UserModel from "../models/User.model.js";
import jwt from "jsonwebtoken"
import {config} from "../configs/env.config.js"
import blackListTokenModel from "../models/BlackListToken.model.js" 

export const authMiddleware = async (req,res,next) =>{
    try{
        const token = req.cookies?.token || req.headers.authorization?.split(" ")[1]

        if(!token){
            return res.status(403).json({
                success:false,
                message:"Unauthorized access, Token is missing"
            })
        }
        const blacklistToken = await blackListTokenModel.findOne({token})
if(blacklistToken){
 return res.status(403).json({
  success:false,
  message:"Unauthorized access, Invalid Token"
 })
}
        const verify = jwt.verify(
            token,config.JWT_SECRET
        )

        const user =await UserModel.findById(verify.userId)

        if(!user){
            return res.status(404).json({
                success:false,
                message:"Unauthorized: user not found"
            })
        }

        req.user = user

        next()
    }catch(err){
        console.log("AUTH MIDDLEWARE ERROR : ", err)
        res.status(500).json({
            success:false,
            message:"User not logged in"
        })
    }
}


export const systemUserAuth = async (req,res,next) =>{
    try{
        const token = req.cookies?.token || req.headers.authorization?.split(" ")[1]

        if(!token){
            return res.status(403).json({
                success:false,
                message:"Unauthorized access, Token is missing"
            })
        }
          const blacklistToken = await blackListTokenModel.findOne({token})
          
          if(blacklistToken){
           return res.status(403).json({
            success:false,
            message:"Unauthorized access, Invalid Token"
           })
          }
        const verify = jwt.verify(
            token,config.JWT_SECRET
        )

        const user =await UserModel.findById(verify.userId).select("+systemUser")

        if(user.systemUser !== true){
            return res.status(401).json({
                success:false,
                message:"Unauthorized your are not system user"
            })
        }

        req.user = user

        next()
    }catch(err){
        console.log("AUTH MIDDLEWARE ERROR : ", err)
        res.status(500).json({
            success:false,
            message:"User not logged in"
        })
    }
}


