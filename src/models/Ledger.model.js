import mongoose from "mongoose"

export const ledgerSchema = new mongoose.Schema({
  account:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"account",
    required:true,
    index:true,
    immutable:true
  },
  transaction:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Transaction",
    required:true,
    immutable:true,
    index:true
  },
  transactionType:{
    type:String,
    enum:["CREDIT","DEBIT"],
    required:[true,"Ledger type are required"],
    immutable:true
  },
  amount:{
   type:Number,
   required:[true,"Amount is required for creating a ledger entry"],
   immutable:true
  }
},
{timestamps:true}
)

function preventLedgerModification(){
  throw new Error("Ledger are immutable and can not be modified or deleted")
}

ledgerSchema.pre("findOneAndUpdate",preventLedgerModification)
ledgerSchema.pre("findOneAndDelete",preventLedgerModification)
ledgerSchema.pre("updateOne",preventLedgerModification)
ledgerSchema.pre("deleteOne",preventLedgerModification) 
ledgerSchema.pre("remove",preventLedgerModification) 
ledgerSchema.pre("deleteMany",preventLedgerModification)
ledgerSchema.pre("findByIdAndUpdate",preventLedgerModification)  
ledgerSchema.pre("findByIdAndDelete",preventLedgerModification)  
ledgerSchema.pre("findByIdAndReplace",preventLedgerModification)  
export default mongoose.model("Ledger",ledgerSchema)