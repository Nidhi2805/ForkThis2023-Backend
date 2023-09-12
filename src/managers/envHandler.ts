import dotenv from 'dotenv';
import path from 'path';

const envPath = path.join(__dirname, '../../', '.env'); // Goes up one level from envHandler.ts and then specifies the .env file

dotenv.config({path: envPath});

const envHandler = (envName: string): string => {
    const env = process.env[envName];
    if (!env) throw new Error(`ENV ${envName} is not defined.`);
    return env;
};
 
export default envHandler;
