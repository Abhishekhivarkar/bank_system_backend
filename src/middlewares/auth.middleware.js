import UserModel from "../models/User.model.js";
import jwt from "jsonwebtoken"
import {config} from "../configs/env.config.js"


export const authMiddleware = async (req,res,next) =>{
    try{
        const token = req.cookies?.token || req.headers.autherization?.split(" ")[1]

        if(!token){
            return res.status(401).json({
                success:false,
                message:"Unauthorized access, Token is missing"
            })
        }

        const verify = jwt.verify(
            token,config.JWT_SECRET
        )

        const user =await UserModel.findById(verify.userId)

        if(!user){
            return res.status(401).json({
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