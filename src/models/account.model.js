import mongoose, { modelNames, Mongoose } from 'mongoose';
const accountSchema = new mongoose.Schema({
    user:{
        type : mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
        index:true
    },
    status:{
        type:String,
        enum:{
            values:['ACTIVE','FROZEN','CLOSED'],
            message:"{VALUE} is not a valid account status"
        },
        default :'ACTIVE'
    },
    currency:{
        type:String,
        default:"INR",
        required:[true,"currency is required for creating an account"]
    }
},{timestamps:true})

accountSchema.index({user:1,status:1})
const AccountModel = mongoose.model('account',accountSchema)

export default AccountModel
