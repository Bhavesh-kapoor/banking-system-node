import User from "../models/user.model.js"
import APP_CONFIG from "../utills/config.js"
import { errorResponse } from "../utills/response.js"
import jwt from 'jsonwebtoken'

export const authMiddleware = async(req,res,next)=>{
    try{
        // check if the token is comming from header or cookie 
        const token = req.cookies.token || req.header['authorization'].split(' ')[0]
        if(!token){
            return errorResponse(res,'token missing!',401)
        }
        // if token comming then decode it
        const inforamtion = await jwt.verify(token,APP_CONFIG.JWT_SECREAT)
        const user=await User.find({_id:inforamtion.userId})
        req.user  = user
        return next()
        
    }catch(err){
            return errorResponse(res,'Invalid token or may be token has been expired',401,err?.message)
    }
}