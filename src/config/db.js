import mongoose  from "mongoose";
import APP_CONFIG from "../utills/config.js";

function connectDB (){
    mongoose.connect(APP_CONFIG.MONGO_URL).then(()=>{
        console.log("Database connected successfully!")
    }).catch((err)=>{
        console.log("error while connecting with the database",err)
        process.exit(1)
    })
}

export default connectDB