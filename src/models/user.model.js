import mongoose  from "mongoose";
import bcrypt from "bcryptjs";
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
userSchema.pre('save',async function(next){
    if(!this.isModified("password")){
        return next()
    }
    const hash= await bcrypt.hash(this.password,10)
    this.password =  hash
    return next()
})

userSchema.methods.comparePassword= async function(password){
    return await bcrypt.compare(password,this.password)
}

const User = mongoose.model("user",userSchema)
export default User