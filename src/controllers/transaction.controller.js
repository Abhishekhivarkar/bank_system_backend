import AccountModel from "../models/Account.model.js"
import TransactionModel from "../models/Transaction.model.js"
import LedgerModel from "../models/Ledger.model.js"
import mongoose from "mongoose"
import {sendTransactionSuccessMail} from "../services/email.service.js"



export const createTransaction = async (req,res) =>{
 try{
  const {fromAccount, toAccount, amount, idempotencyKey} = req.body
  
 
  
  const isExistsFromAccount = await AccountModel.findOne({_id:fromAccount})
  const isExistsToAccount = await AccountModel.findOne({_id:toAccount})
  
  if(!isExistsToAccount || !isExistsFromAccount){
   return res.status(404).json({
    success:false,
    message:"Account not exists!"
   })
  }
  
  const isTransactionExists = await TransactionModel.findOne({idempotencyKey:idempotencyKey})
  
  if(isTransactionExists){
   if(isTransactionExists.status === "COMPLETED"){
    return res.status(200).json({
     success:true,
     message:"Transaction already processed"
    })
   }
   if(isTransactionExists.status === "PENDING"){
    return res.status(409).json({
     success:false,
     message:"Transaction is in pending state"
    })
   }
   if(isTransactionExists.status === "FAILED"){
    return res.status(409).json({
     success:false,
     message:"Transaction is failed please retry"
    })
   }
   if(isTransactionExists.status === "REVERSED"){
    return res.status(409).json({
     success:false,
     message:"Transaction is reversed"
    })
   }
  }
  
  if (isExistsFromAccount.status !== "ACTIVE" || isExistsToAccount.status !== "ACTIVE"){
   return res.status(403).json({
    success:false,
    message:"Your account is Frozen or Closed"
   })
  }
  
  const balance = await isExistsFromAccount.getBalance()
   
  if(balance < amount){
   return res.status(400).json({
    success:false,
    message:`Insufficient balance, total balance is ${balance}, requested amount is ${amount}`
   })
  }
   
  const session = await mongoose.startSession()
  session.startTransaction()
   
  const createTransaction = await TransactionModel.create([{
    fromAccount,
    toAccount,
    idempotencyKey,
    amount,
    status:"PENDING"
  }],{session})
  
  const transaction = createTransaction[0]
   
  await LedgerModel.create([{
    account:fromAccount,
    amount:amount,
    transactionType:"DEBIT",
    transaction:transaction._id
  }],{session})
   
   await (()=>{
    return new Promise((resolve)=>setTimeout(resolve,100*1000))
   })()
   
  await LedgerModel.create([{
    account:toAccount,
    amount:amount,
    transactionType:"CREDIT",
    transaction:transaction._id
  }],{session})
   
  transaction.status = "COMPLETED"
  await transaction.save({session})
   
  await session.commitTransaction()
  session.endSession()
   
  res.status(201).json({
   success:true,
   message:"Transaction created successfully!",
   transaction:transaction
  })
  
  await sendTransactionSuccessMail({
    email:req.user.email,
    name:req.user.name,
    amount:amount,
    account:toAccount
   })
 }catch(err){
  console.log("CREATE TRANSACTION ERROR : ",err)
  res.status(500).json({
   success:false,
   message:"Failed to create transaction"
  })
 }
}



// initial transaction api 

export const createInitialFundsTrnsaction = async (req,res) =>{
 try{
  const {toAccount,amount,idempotencyKey} = req.body
  
  
  const account = await AccountModel.findOne({
   _id:toAccount
  })
  
  if(!account){
   return res.status(404).json({
    success:false,
    message:"Account not found"
   })
  }
  
  const isTransactionExists = await TransactionModel.findOne({
   idempotencyKey:idempotencyKey
  })
  
  if(isTransactionExists){
   if(isTransactionExists.status === "COMPLETED"){
    return res.status(200).json({
     success:true,
     message:"Transaction already processed"
    })
   }
   if(isTransactionExists.status === "PENDING"){
    return res.status(409).json({
     success:false,
     message:"Transaction is in pending state"
    })
   }
   if(isTransactionExists.status === "FAILED"){
    return res.status(409).json({
     success:false,
     message:"Transaction failed! please retry"
    })
   }
   if(isTransactionExists.status === "REVERSED"){
    return res.status(409).json({
     success:false,
     message:"Transaction reversed!"
    })
   }
  }
  
  if(account.status !== "ACTIVE"){
   return res.status(403).json({
    success:false,
    message:"account is frozen or closed"
   })
  }
  
  const fromUserAccount = await AccountModel.findOne({
   user:req.user._id
  })
  
  if(!fromUserAccount){
   return res.status(404).json({
    success:false,
    message:"system account not found"
   })
  }
  
  const session = await mongoose.startSession()
  session.startTransaction()
  
  const createTransaction = await TransactionModel.create([{
   fromAccount:fromUserAccount._id,
   toAccount,
   amount,
   idempotencyKey,
   status:"PENDING"
  }],{session})
  
  const transaction = createTransaction[0]
  
  await LedgerModel.create([{
   account:fromUserAccount._id,
   amount:amount,
   transaction:transaction._id,
   transactionType:"DEBIT"
  }],{session})
  
  await LedgerModel.create([{
   account:toAccount,
   amount:amount,
   transaction:transaction._id,
   transactionType:"CREDIT"
  }],{session})
  
  transaction.status = "COMPLETED"
  await transaction.save({session})
  
  await session.commitTransaction()
  session.endSession()
  
  res.status(201).json({
   success:true,
   message:"Transaction created successfully"
  })
 }catch(err){
  console.log("CREATE TRANSACTION ERROR : ",err)
  res.status(500).json({
   success:false,
   message:"Failed to create transaction"
  })
 }
}