import mongoose from "mongoose"
import bcryptjs from "bcryptjs"
export const userSchema = new mongoose.Schema({
  name:{
    type:String,
    required:[true,"Name is required"],
    trim:true
  },
  email:{
    type:String,
    required:[true,"Email is required"],
    trim:true,
    lowercase:true,
    unique:[true,"Email is already exists"],
    match:[
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    "Please use a valid email address"
  ]
  },
  password:{
    type:String,
    required:[true,"Password is required"],
    trim:true,
    minlength:[8,"Password length must be 8 characters long"],
    select:false
  }
},{timestamps:true})

userSchema.pre("save",async function(){
  if(!this.isModified("password")){
    return
  }
  
  const hash = await bcryptjs.hash(this.password,10)
  this.password = hash
  
  return
})

userSchema.methods.comparePassword = async function(password){
  return await bcryptjs.compare(password,this.password)
}


export default mongoose.model("BankUser",userSchema)