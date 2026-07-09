import mongoose from "mongoose";

const TransactionModel = new mongoose.Schema({
    from:{
        type :  mongoose.Schema.Types.ObjectId,
        ref:"account",
        required:true
    },
    to:{
        type:mongoose.Schema.ObjectId,
        ref:"account",
        required:true
    },
    status:{
        type:String,
        enum:{
            values:["PENDING","COMPLETED","FAILED","REVERSED"],
            message:"{VALUE}  is not a valid status "  
        },
        default:"PENDING"
    },
    amount:{
        type:Number,
        required:[true,"Amount is required to complete the transaction"]
    },
    idempotencyKey:{
        type:String,
        unique:true,
        required:true,
        index:true
    }
},{timestamps:true})

const Transaction = mongoose.model("transaction",TransactionModel)
export default  Transaction
