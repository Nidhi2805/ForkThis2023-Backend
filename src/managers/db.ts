import mongoose from 'mongoose';
import envHandler from './envHandler.js';
import logger from '../../logs/logger.js';

const URL: string = envHandler("DATABASE_URL");

const connectToDB = (): Promise<void> => mongoose.connect(URL)
    .then(() => {
        console.log("Connected to Database!");
    })
    .catch (error => {
        console.log(error)
        logger.error(error);
    });

export default connectToDB;