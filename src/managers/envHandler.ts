import 'dotenv/config'; // Ensure environment variables from .env are loaded

const envHandler = (envName: string): string => {
    const env = process.env[envName]; // Access environment variable from process.env
    if (!env) throw new Error(`ENV ${envName} is not defined.`);
    return env;
};

export default envHandler;
