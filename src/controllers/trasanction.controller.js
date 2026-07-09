import Transaction from "../models/transaction.model.js";
import { createTransactionValidation } from "../models/transaction.model.js";
import { errorResponse,successResponse} from "../utills/response.js";
import AccountModel from "../models/account.model.js";
import ValidateRequest from "../utills/validateRequest.js";
/**
 * STEPS FOR CREATING TRANSACTIONS ARE
 *  1. validation
 *  2. check whether the accounts exist or not
 *  3. check idempotency key  is already exist or not  for the transaction
 *  4. check the from or to account open or not
 * @param {*} req 
 * @param {*} res 
 */

const createTransaction =async(req,res)=>{
    try{
        // validate the request 
        const validate = await ValidateRequest(Transaction,req.body)
        if(!validate.success) return errorResponse(res,validate.message,400)

        const { from , to , amount,idempotencyKey} = req.body
        // check from and to account exist or  not 
        const checkFromOrToAccountExist = await AccountModel.find({
            _id:{
                $in:[from ,to]
            }
        })
        if(!checkFromOrToAccountExist.length !==2) return errorResponse(res,"Given 'from' or 'to' account does not exist.",400)
        // *  3. check idempotency key  is already exist or not  for the transaction
        const checkIdempotencyKeyExist = await Transaction.findOne({idempotencyKey:idempotencyKey})
        if(checkIdempotencyKeyExist){
            let status =checkFromOrToAccountExist.status;
            let transactionResponse = trsanctionStatusWiseResponse(status,checkIdempotencyKeyExist)
            return errorResponse(res,transactionResponse,400)
        }
        //  *  4. check the from or to account open or not
        for(const  account of checkFromOrToAccountExist){
            if(accout.status !='OPEN'){
                return errorResponse(res,"One of the account is closed",400)
            }
        }
        

    }catch(err){
        return errorResponse(res,"something went wrong",500,err?.message)
    }

}

const trsanctionStatusWiseResponse=(status,transactionInfo)=>{
    if(status == 'COMPLETED'){
        return {
            "message":"Given transaction has already been completed",
            "transactionInfo":transactionInfo
        }
    }
    if(status == 'PENDING'){
        return {
            "message":"Given transaction still in progress please retry later",
        }
    }
     if(status == 'FAILED'){
        return {
            "message":"Given transaction is failed  please retry later",
        }
    }
     if(status == 'REVERSED'){
        return {
            "message":"trsansaction was revered , please retry",
        }
    }

}