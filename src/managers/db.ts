import mongoose from 'mongoose';
import envHandler from './envHandler';

const URL: string = envHandler("DATABASE_URL");

const connectToDB = (): Promise<void> => mongoose.connect(URL)
    .then(() => {
        console.log(URL)
        console.log("Connected to Database!");
    });

export default connectToDB;