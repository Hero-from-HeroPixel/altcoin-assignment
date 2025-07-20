import { createClient } from 'redis';
import redisConfig from '../config/redis.config.ts';


const url = `redis://${redisConfig.user ?? ''}${redisConfig.user ? `:${redisConfig.password}@` : ''}${redisConfig.host}:${redisConfig.port}`;
const redis = createClient({ url });
redis.on('error', err => console.log('Redis Client Error', err));


/**
 * @description Attempts to connect to redis. 
 */
async function redisConnect() {
    if (redis.isOpen) {
        return redis;
    }
    try {
        await redis.connect();
        await redis.ping();
        console.log("Connected to Redis");
        return redis;
    } catch (error) {
        console.debug('Redis connection failed.');
        console.error(error)
    }
}

export const redisClient = await redisConnect()
