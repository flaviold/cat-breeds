export default {
  port: process.env.PORT || 3000,
  catApiKey: process.env.CAT_API_KEY || '',
  catApiUrl: process.env.CAT_API_URL || 'https://api.thecatapi.com/v1',
  redisUrl: process.env.REDIS_URL || 'redis://localhost:6379',
  redisCacheExpiration: process.env.REDIS_CACHE_EXPIRATION || 10
}
