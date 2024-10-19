const redis = require('redis');

export const client = redis.createClient({
    host: "localhost",
    port: 6379,
}).on('error', err => console.log('Redis Client Error', err))