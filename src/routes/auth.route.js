import express from 'express'
import authController from '../controllers/user.controller.js'
const userRouter =express.Router()

/* POST /api/user/register  */
userRouter.post('/register', authController.register)


export default userRouter