import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const currentModuleURL = import.meta.url;
const currentModulePath = fileURLToPath(currentModuleURL);
const envPath = path.join(path.dirname(currentModulePath), '../../', '.env');

dotenv.config({path: envPath});

const envHandler = (envName: string): string => {
    const env = process.env[envName];
    if (!env) throw new Error(`ENV ${envName} is not defined.`);
    return env;
};
 
export default envHandler;
