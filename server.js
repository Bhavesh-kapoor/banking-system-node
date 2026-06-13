import app from './src/app.js'
import APP_CONFIG from './src/utills/config.js'

import connectDB from './src/config/db.js'
connectDB()
app.listen(APP_CONFIG.SERVER_PORT,(req,res)=>{
    console.log("server is running at this port")
})