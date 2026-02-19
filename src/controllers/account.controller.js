import UserModel  from "../models/User.model.js";
import AccountModel from "../models/Account.model.js";

export const createAccount =async (req,res) =>{
    try{
        const userInfo = req.user
        

        const user =await UserModel.findById(userInfo._id)

        if(!user){
            return res.status(401).json({
                status:false,
                message:"User not found"
            })
        }
        
        const account =await AccountModel.create({
            user:userInfo._id
        })

        res.json({
            success:true,
            message:"Account created successfully",
            account
        })
    }catch(err){
        console.log("CREATE ACCOUNT ERROR : ", err)
        res.status(500).json({
            success:false,
            message:"Failed to create account"
        })
    }
}