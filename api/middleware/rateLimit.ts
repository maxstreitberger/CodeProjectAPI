import redis from 'redis'
import { createRateLimitRule, RedisStore } from 'graphql-rate-limit';
// import { allow, and, shield } from 'graphql-shield';

export const rateLimitRule = createRateLimitRule({ 
  identifyContext: (ctx) => ctx.req.ip, 
  formatError: () => `Hey there, you are doing way too much`,
  store: new RedisStore(redis.createClient(6379, process.env.REDIS_HOST))
});

// const eventsShield = shield({
//   Query: {
//     allEvents: and(allow, rateLimitRule({ window: '60s', max: 5, message: "You want to many events" })),
//     getEvent: rateLimitRule({ window: '60s', max: 5, message: "You want to many events" }),
//   }
// })

// export const rateLimit = [
//   eventsShield
// ]
