import User from "../models/user.model.js";
import { registerSchema, loginSchema } from "../models/user.model.js";
import ValidateRequest from "../utills/validateRequest.js";
import { generateToken } from "../utills/jwt.js";
import { errorResponse, successResponse } from "../utills/response.js";


/**
 * Register a new user
 * @route POST /api/auth/register
 */

async function register(req,res){
    try{
        // check for the validation
        const validate = await ValidateRequest(registerSchema,req.body)
        if(!validate.success){ return errorResponse(res,validate.message,400)}


        const { name,email,password} = req.body // get params from the request body
        let isExists = await User.findOne({email:email}) 
        if(isExists){ 
            return errorResponse(res,'email already exist',409)
        }
        
        //create new user
        const user =await User.create({name,email,password})
        console.log(user)
        // create json token for the user info
        const token =await generateToken({"userId":user._id,"name":user.name})
        // now save the user info  in the cookies as well
        res.cookie("token",token)
         let data ={
                "user":{
                    "name":user.name,
                    "email":user.email
                },
            "token":token
        } 
         return  successResponse(res,'User register successfully!',data,201)

        
    }catch(err){
        return errorResponse(res,"something went wrong",500,err.message)
    }
}


/**
 * User login 
 * @route POST /api/auth/login
 */

const login = async(req,res)=>{
    try{
        const validate = await ValidateRequest(loginSchema,req.body)
        if(!validate.success){ return errorResponse(res,validate.message,400)}
        
        const {email, password} = req.body
        // check if the user exist or not
        let isExists = await User.findOne({email:email}).select("+password")
        if(!isExists){ return errorResponse(res,'invalid user',401)}

        // now compare password 
        let validPassword = await isExists.comparePassword(password)
        if(!validPassword){return errorResponse(res,'invalid user',401) }

        const token =await generateToken({"userId":isExists._id,"name":isExists.name})
        // now save the user info  in the cookies as well
        res.cookie("token",token)

        let data ={
                "user":{
                    "name":isExists.name,
                    "email":isExists.email
                },
            "token":token
        } 
        return  successResponse(res,'User login successfully!',data,200)


    }catch(err){
        return errorResponse(res,"something went wrong",500,err.message)
    }
}

 export default {
    register,
    login
 }
