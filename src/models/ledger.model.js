import mongoose from "mongoose";
import { prefault, tuple } from "zod";

const ledgerSchema =new mongoose.Schema({
    account:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"account",
        index:true,
        required:[true,"account for the dedicated person is required for this ledger"],
        immutable:true
    },
    amount:{
        type:Number,
        required:[true,"Amount is required to perform is action"],
        immutable:true
    },
    transactionId:{
        type:mongoose.Schema.Types.ObjectId,
        required:[true,"Transaction id is required to perform the operation"],
        immutable:true
    },
    type:{
        type:String,
        enum:{
            values:["DEBIT","CREDIT"],
            message:"{VALUE} is invalid for this entry"
        },
        immutable:true,
        required:[true,"type is required for this action"]

    }
})


function preventLedgerForModication(){
    throw error("ledger entries are immutabnle and can not be modified!")
}

ledgerSchema.pre("findOneAndUpdate",preventLedgerForModication)
ledgerSchema.pre("findOneAndDelete",preventLedgerForModication)
ledgerSchema.pre("findOneAndReplace",preventLedgerForModication)
ledgerSchema.pre("deleteOne",preventLedgerForModication)
ledgerSchema.pre("updateOne",preventLedgerForModication)
ledgerSchema.pre("remove",preventLedgerForModication)
ledgerSchema.pre("updateMany",preventLedgerForModication)
ledgerSchema.pre("deleteMany",preventLedgerForModication)


const Ledger = mongoose.model("ledger",ledgerSchema)
export default Ledger
