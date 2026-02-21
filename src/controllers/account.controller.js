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

export const getAllAccounts =async (req,res) =>{
 try{
  const account = await AccountModel.find({user:req.user._id})
  res.status(200).json({
   success:true,
   data:account,
   count:account.length
  })
 }catch(err){
  console.log("GET ALL ACCOUNT ERRO : ",err)
  res.status(500).json({
   success:false,
   message:"Failed to get all accounts"
  })
 }
}

export const getAccountBalance = async (req,res) =>{
 try{
  const {accountId} = req.params
  
  const account = await AccountModel.findOne({
   _id:accountId,
   user:req.user._id
  })
 
  if(!account){
   return res.status(401).json({
    success:false,
    message:"account not exists"
   })
  }
  
  const accountBalance =await account.getBalance()
  
  res.status(200).json({
   success:true,
   account:account._id,
   balance:accountBalance
  })
 }catch(err){
  console.log("GET ACCOUNT BALANCE : ",err)
  res.status(500).json({
   success:false,
   message:"Failed to get account balance"
  })
 }
}