import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { constants } from './constants.js';
const currentModuleURL = import.meta.url;
const currentModulePath = fileURLToPath(currentModuleURL);
const envPath = path.join(path.dirname(currentModulePath), '../../', '.env');

// dotenv.config({path: envPath});
dotenv.config();

const envHandler = (envName: string): string => {
    const env = constants[envName];
    if (!env) throw new Error(`ENV ${envName} is not defined.`);
    return env;
};
 
export default envHandler;
