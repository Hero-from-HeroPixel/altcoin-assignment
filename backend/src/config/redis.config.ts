import dotenv from 'dotenv';

dotenv.config();

interface RedisConfig {
    host: string,
    port: number
    user?: string
    password?: string
}
const port = Number(process.env.REDIS_PORT) || 3306;
const host = process.env.REDIS_HOST
const user = process.env.REDIS_USER
const password = process.env.REDIS_PASSWORD

if (!host) throw new Error("Redis host not set.")

const redisConfig: RedisConfig = {
    port,
    host,
    user,
    password,
};

export default redisConfig;