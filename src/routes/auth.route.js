import express from 'express'
import authController from '../controllers/user.controller.js'
const userRouter =express.Router()

/* POST /api/user/register  */
userRouter.post('/register', authController.register)

/* POST /api/auth/login */
userRouter.post('/login',authController.login)

export default userRouter