import redisConnection from '../utills/config.js';
import {Worker} from 'bullmq';
import {registrationWelcomeMail} from '../services/email.service.js';

const emailWorker = new Worker('emailQueue', async (job) => {
    const { name, email } = job.data;
    await registrationWelcomeMail(name, email);             
},{ connection: redisConnection });


emailWorker.on('completed', (job) => {
    console.log(`Job with ID ${job.id} has been completed.`);
});

emailWorker.on('failed', (job, err) => {
    console.error(`Job with ID ${job.id} has failed. Error: ${err.message}`);
});
