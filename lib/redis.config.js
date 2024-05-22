require('dotenv').config();
const { createClient } = require("redis");

const initializeRedis = async () => {
    const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
    if (!redisUrl) {
        throw new Error("UPSTASH_REDIS_REST_URL is not defined");
    }

    try {
        const redisClient = createClient({ url: redisUrl })
            .on('error', err => console.log('Redis Client Error', err));
        console.log("Redis client created");
        return redisClient;
    } catch (error) {
        console.error('Error initializing Redis client:', error);
        throw error;
    }
};

let redisClient;

const connectRedis = async () => {
    try {
        redisClient = await initializeRedis();
        await redisClient.connect();
        console.log("Connected to Redis Database");
        return redisClient;
    } catch (error) {
        console.error('Error connecting to Redis:', error);
        throw error;
    }
};

const getRedisClient = () => {
    if (!redisClient) {
        throw new Error("Redis client not initialized. Call connectRedis first.");
    }
    return redisClient;
};

module.exports = { getRedisClient, connectRedis, initializeRedis };
