import mongoose from "mongoose"

export const transactionSchema = new mongoose.Schema({
  fromAccount:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"account",
    required:[true, "Transaction must be associated with from account"],
    index:true
  },
  toAccount:{
    type: mongoose.Schema.Types.ObjectId, 
    ref:"account",
    required:[true, "Transaction must be associated with to account"],
    index:true
  },
  amount:{
    type:Number,
    required:true,
    min:[0, "amount can not be negative"]
  },
  
  status:{
    type:String,
    enum:{
      values:["COMPLETED","PENDING","FAILED","REVERSED"],
      message:"Status can be either PENDING, COMPLETED, FAILED, REVERSED"
    },
    default:"PENDING"
  },
  idempotencyKey:{
    type:String,
    required:true,
    unique:true,
    index:true
  }
},
{timestamps:true}
)

export default mongoose.model("Transaction",transactionSchema)