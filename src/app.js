import express from 'express'
import userRouter from './routes/auth.route.js'
import accountRouter from './routes/account.route.js'
import cookieParser from 'cookie-parser'
import { authMiddleware } from './middleware/auth.middleware.js'
const app =express()
app.use(express.json())
app.use(cookieParser())


// for auth routes
app.use('/api/auth/',userRouter)
export default app

/**
 *  use routes 
 */
app.use('/api/account',authMiddleware , accountRouter)