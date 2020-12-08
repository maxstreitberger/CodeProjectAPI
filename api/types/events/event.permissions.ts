import { rules } from '../../middleware/permissions/rules'
import { createRateLimitRule, RedisStore } from 'graphql-rate-limit';
import * as redis from 'redis'
import { allow, and } from 'graphql-shield';

const createLocalEventRateLimitRule = createRateLimitRule({ 
  identifyContext: (ctx) => ctx.req.ip, 
  formatError: () => `Hey there, you are doing way too much`,
  store: new RedisStore(redis.createClient(6379, process.env.REDIS_HOST))
});

const createOnlineEventRateLimitRule = createRateLimitRule({ 
  identifyContext: (ctx) => ctx.req.ip, 
  formatError: () => `Hey there, you are doing way too much`,
  store: new RedisStore(redis.createClient(6379, process.env.REDIS_HOST))
});

export const EventQueryPermissions = {
  allPublicEvents: allow,
  getEvent: rules.isAuthenticated,
} 

export const EventMutationPermissions = {
  createLocalEvent: and(rules.isAuthenticated, createLocalEventRateLimitRule({ window: "3m", max: 10 })),
  createOnlineEvent: and(rules.isAuthenticated, createOnlineEventRateLimitRule({ window: "3m", max: 10 })),
  updateLocalEvent: rules.isAuthenticated,
  updateOnlineEvent: rules.isAuthenticated,
  deleteEvent: rules.isAuthenticated,
}