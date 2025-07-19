import dotenv from 'dotenv';

dotenv.config();

interface AppConfig {
    port: number;
    nodeEnv: string;
}

const appConfig: AppConfig = {
    port: Number(process.env.PORT) || 3000,
    nodeEnv: process.env.NODE_ENV || 'development',
};

export default appConfig;