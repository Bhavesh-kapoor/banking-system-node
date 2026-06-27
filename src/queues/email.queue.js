import {Queue} from 'bullmq';
import AppConfig from '../utills/config.js';

export const redisConnection = {
    host: AppConfig.redisHost,
    port: AppConfig.redisPort,
    password: AppConfig.redisPassword || undefined,  
}

export const emailQueue = new Queue('emailQueue', { connection: redisConnection });