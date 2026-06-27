import accountModel from "../models/account.model.js";
import { errorResponse, successResponse } from "../utills/response.js";

/**
 * - POST api/account/create
 * -  procetected route 
 * @returns 
 */
export const createAccount = async(req,res)=>{
    try{
        const account = await accountModel.create({user:req.user[0]._id})
        return successResponse(res,"user account created successfully",account,201);
    }catch(err){
        return errorResponse(res,'something went wrong',500,err?.message || err)
    }
}