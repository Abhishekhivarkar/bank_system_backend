import mongoose from "mongoose"

const blackListTokenSceham = new mongoose.Schema({
 token:{
  required:true,
  type:String,
  unique:true
 }
},{timestamps:true})

blackListTokenSceham.index({createdAt:1},{
 expiredAfterSeconds:60*60*24*3
})
export default mongoose.model("BlackListedTokens",blackListTokenSceham)