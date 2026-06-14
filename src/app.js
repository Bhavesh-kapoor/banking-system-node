import express from 'express'
import userRouter from './routes/auth.route.js'
import cookieParser from 'cookie-parser'
const app =express()
app.use(express.json())
app.use(cookieParser())


// for auth routes
app.use('/api/auth/',userRouter)
export default app