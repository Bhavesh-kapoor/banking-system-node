
import jwt from 'jsonwebtoken'
import APP_CONFIG from './config.js';
export const generateToken =async(userInfo)=>{
   const token = await jwt.sign(userInfo,APP_CONFIG.JWT_SECREAT,{expiresIn:"3d"})
    return token;
}
