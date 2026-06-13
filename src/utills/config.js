import env from 'dotenv'
env.config()

const APP_CONFIG={
    SERVER_PORT :  process.env.PORT || 3000,
    MONGO_URL :  process.env.MONGO_URL 
}


export default APP_CONFIG