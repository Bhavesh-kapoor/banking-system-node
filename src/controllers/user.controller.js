import { json, response } from "express";
import User from "../models/user.model.js";
import jwt from 'jsonwebtoken'
import APP_CONFIG from "../utills/config.js";
import { registerSchema } from "../models/user.model.js";


/**
 * Register a new user
 * @route POST /api/user/register
 */

async function register(req,res){
    try{
        // check for the validation
        const validate = registerSchema.safeParse(req.body)
        if(!validate.success){
            // now check for the invalid code 
            if(validate.error.issues[0].code =='invalid_type'){
                let path = validate.error.issues[0].path[0];
                return res.status(400).json({
                    "status":false,
                    "message":`${path.charAt(0).toUpperCase()+ path.slice(1)} is required`
                })
            }
            return res.status(400).json({
                error:validate.error.issues[0].message
            })

        }

        const { name,email,password} = req.body // get params from the request body
        let isExists = await User.findOne({email:email}) 
        if(isExists){return res.status(409).json({'message':"email already exist","status":false})}
        
        //create new user
        const user =await User.create({name,email,password})
        // create json token for the user info
        const token =await jwt.sign({userId:user._id,name:user.name},APP_CONFIG.JWT_SECREAT,{expiresIn:"3d"})
        // now save the user info  in the cookies as well
        res.cookie("token",token)
        return res.status(201).json(
            {
                "message":"User register successfully!",
                "user":{
                    "name":user.name,
                    "email":user.email
                },
                "token":token
            })
        
    }catch(err){
        return res.status(500).json({
            "status":true,
            "message":"Something went wrong",
            "error":err.message
    })
    }
}

 export default {
    register
 }
