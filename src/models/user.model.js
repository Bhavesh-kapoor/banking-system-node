import mongoose  from "mongoose";
import bcrypt from "bcryptjs";
import {z} from 'zod';
// creating  user schema
const userSchema = new mongoose.Schema({

    name:{
        type:String,
        required:[true,"Name is required to create the account"],
        trim:true,
    },
    email:{
        type:String,
        required:[true,"Email is required to create the account!"],
        lowercase:true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:[6,"Minimum length of the password should atleast 6 or more"],
        select:false // this will do whenever we perform any kind of select query it will not fetch the password in the result
    }
},{
    timestamps:true
})

// pre save password 
userSchema.pre('save',async function(){
    if(!this.isModified("password")){
        return true
    }
    const hash= await bcrypt.hash(this.password,10)
    this.password =  hash
    return true
})

userSchema.methods.comparePassword= async function(password){
    return await bcrypt.compare(password,this.password)
}

const User = mongoose.model("user",userSchema)


// registerSchema
export const registerSchema = z.object({
    "name":z.string({"required_error":"Name is required!"}),
    "email":z.string({
        'required_error':"email is required"
    }).email(),
    "password":z.string({
        'required_error':"Password is required"
    }).min(8)
})

export const loginSchema = z.object({
    "email":z.string().email(),
    "password":z.string()
})
export default User