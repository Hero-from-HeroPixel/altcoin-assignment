import { createClient } from 'redis';
import redisConfig from '../config/redis.config.ts';


const url = `redis://${redisConfig.user ?? ''}${redisConfig.user ? `:${redisConfig.password}@` : ''}${redisConfig.host}:${redisConfig.port}`;
const redis = createClient({ url });
redis.on('error', err => console.log('Redis Client Error', err));


/**
 * @description Attempts to connect to redis. 
 * Always returns an instance even if connection fails. 
 * Instance can still be used to debug connection issues.
 * @returns redis client instance. 
 */
async function redisConnect() {
    if (redis.isOpen) {
        return redis;
    }
    try {
        await redis.connect();
        await redis.ping();
        console.log("Connected to Redis");
    } catch (error) {
        console.debug('Redis connection failed.');
        console.error(error)
    } finally {
        return redis;
    }
}

export const redisClient = await redisConnect()
