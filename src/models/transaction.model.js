import mongoose from "mongoose";
import {z} from 'zod'

const TransactionSchema = new mongoose.Schema({
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


//  transaction validation schema 

export const createTransactionValidation=z.object({
    "from":z.string({"required_error":"from account is required"}),
    "to":z.string({"required_error":"to account is required"}),
    "amount":z.string({"required_error":"amount is required"}),
    "idempotencyKey":z.string({"required_error":"idempotencyKey is required"}),


})
const Transaction = mongoose.model("transaction",TransactionSchema)
export default  Transaction
