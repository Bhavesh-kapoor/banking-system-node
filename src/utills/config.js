import env from 'dotenv'
env.config()

const APP_CONFIG={
    SERVER_PORT : process.env.PORT || 3000,
    MONGO_URL :  process.env.MONGO_URL ,
    JWT_SECREAT : process.env.JWT_SECREAT,
    CLIENT_ID:process.env.ClientId,
    SECREAT_ID:process.env.ClientSecreat,
    REFRESH_TOKEN :process.env.refreshToken,
    SENDERMAIL:process.env.senderMail,
    redisHost:process.env.redisHost,
    redisPort:process.env.redisPort,
    redisPassword:process.env.redisPassword ,
    SENDER_PASSWORD:process.env.SENDER_PASSWORD,
    APP_NAME:process.env.app_name
}


export default APP_CONFIG